import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

type GoogleProfile = {
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
  [key: string]: any;
};

type User = {
  id?: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

function getDatabase() {
  const dbPath = process.env.SQLITE_DB_PATH || 
    (process.env.NODE_ENV === 'production' ? '/app/data/sqlite.db' : path.join(process.cwd(), "sqlite.db"));
  return new Database(dbPath);
}

function validateAlbionEmail(email: string): void {
  if (!email || !email.endsWith('@albion.edu')) {
    throw new APIError("UNAUTHORIZED", { 
      message: "Only @albion.edu email addresses are allowed",
      code: "invalid_email_domain"
    });
  }
}

export const auth = betterAuth({
  database: getDatabase(),
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: false,
  },
  onBeforeCreateUser: async (user: User) => {
    validateAlbionEmail(user.email);
    return user;
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      validateProfile: async (profile: GoogleProfile) => {
        if (!profile.email_verified) {
          return {
            success: false,
            error: {
              message: 'Email not verified',
              code: 'email_not_verified'
            }
          };
        }

        if (!profile.email || !profile.email.endsWith('@albion.edu')) {
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