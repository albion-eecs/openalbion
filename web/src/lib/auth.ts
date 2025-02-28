import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import apiKeyPlugin from "./plugins/apiKeyPlugin";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
    validateEmail: (email: string) => {
      if (email.endsWith('@albion.edu')) {
        return { valid: true };
      }
      return { valid: false, error: 'Only @albion.edu emails are allowed' };
    }
  },
  plugins: [
    apiKeyPlugin()
  ]
}); 