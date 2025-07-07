import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db/index";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "placeholder",
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
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
  advanced: {
    cookiePrefix: "openalbion",
  },
});
