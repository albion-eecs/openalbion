import { createAuth } from "@oa/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { getCloudflareEnv, getDb } from "@/lib/db";

async function getHandler() {
	const env = await getCloudflareEnv();
	const db = await getDb();
	const auth = createAuth(db, env);
	return toNextJsHandler(auth.handler);
}

export async function GET(request: Request) {
	const { GET: handler } = await getHandler();
	return handler(request);
}

export async function POST(request: Request) {
	const { POST: handler } = await getHandler();
	return handler(request);
}
