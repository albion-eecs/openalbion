import { db } from "@oa/db";
import * as schema from "@oa/db/schema/auth";
import { env } from "@oa/env/server";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: schema,
	}),
	trustedOrigins: [env.CORS_ORIGIN],
	emailAndPassword: {
		enabled: true,
	},
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
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
	plugins: [nextCookies()],
});
