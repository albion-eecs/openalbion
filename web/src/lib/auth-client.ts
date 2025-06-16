import { createAuthClient } from "better-auth/react";

export const baseURL = process.env.BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL,
});
