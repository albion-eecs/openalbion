import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { headers } from "next/headers";
import path from "path";

export const dbPath = process.env.SQLITE_DB_PATH || 
  (process.env.NODE_ENV === 'production' ? '/app/data/sqlite.db' : path.join(process.cwd(), 'sqlite.db'));

export const auth = betterAuth({
    database: new Database(dbPath),
    emailAndPassword: {  
      enabled: true
  }
})

export async function getUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
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