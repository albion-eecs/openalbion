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

export const auth = betterAuth({
  database: new Database(path.join(process.cwd(), "sqlite.db")),
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