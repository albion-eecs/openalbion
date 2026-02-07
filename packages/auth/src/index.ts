import type { Database } from "@oa/db";
import * as schema from "@oa/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";

interface AuthEnv {
	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL: string;
	CORS_ORIGIN: string;
}

export function createAuth(db: Database, env: AuthEnv) {
	return betterAuth({
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
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
}
