import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { headers } from "next/headers";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const dbPath = "./db/sqlite.db";

export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    before: createAuthMiddleware(async ctx => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      if (!ctx.body?.email?.endsWith("@albion.edu")) {
        throw new APIError("BAD_REQUEST", {
          message: "Only @albion.edu email addresses are allowed to register",
        });
      }
    }),
  },
});

export async function getUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}
