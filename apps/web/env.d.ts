declare global {
	interface CloudflareEnv {
		DB: D1Database;
		CORS_ORIGIN: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
		API_RATE_LIMIT: RateLimit;
	}
}

export {};
