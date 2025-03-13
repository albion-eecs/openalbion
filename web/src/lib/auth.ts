import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";
import { cookies, headers } from "next/headers";

type GoogleProfile = {
  email: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  picture?: string;
  [key: string]: any;
};

const mockDb = {
  prepare: () => ({
    get: () => null,
    all: () => [],
    run: () => ({ changes: 0, lastInsertRowid: 0 })
  }),
  exec: () => {},
  transaction: (fn: any) => fn(mockDb)
};

function getDatabase() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return mockDb as any;
  }

  try {
    const dbPath = process.env.SQLITE_DB_PATH || 
      (process.env.NODE_ENV === 'production' ? '/data/sqlite.db' : path.join(process.cwd(), "sqlite.db"));
    return new Database(dbPath);
  } catch (error) {
    console.error('Failed to initialize auth database:', error);
    return mockDb as any;
  }
}

export const auth = betterAuth({
  database: getDatabase(),
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      validateProfile: async (profile: GoogleProfile) => {
        const email = profile.email;
        
        if (!email || !email.endsWith('@albion.edu')) {
          return {
            success: false,
            error: {
              message: 'Only @albion.edu email addresses are allowed',
              code: 'invalid_email_domain'
            }
          };
        }
        
        return { success: true };
      }
    },
  },
});

export async function getUser() {
  try {
    const session = await auth.api.getSession({
      headers: headers()
    });
    
    if (!session) {
      return null;
    }
    
    return session.user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}