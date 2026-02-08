import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareEnv } from "@/lib/db";

export async function checkRateLimit(request: NextRequest) {
	const env = await getCloudflareEnv();
	const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
	const { success } = await env.API_RATE_LIMIT.limit({ key: ip });

	if (!success) {
		return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
	}

	return null;
}
