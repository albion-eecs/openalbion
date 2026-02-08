import { type NextRequest, NextResponse } from "next/server";
import { requireApiKey } from "@/lib/auth-server";
import { checkRateLimit } from "@/lib/limit";
import { getHeadcounts } from "@/services/headcounts.service";

export async function GET(request: NextRequest) {
	const rateLimitResponse = await checkRateLimit(request);
	if (rateLimitResponse) return rateLimitResponse;

	const authResponse = await requireApiKey(request);
	if (authResponse) return authResponse;

	try {
		const data = await getHeadcounts();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching headcounts:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
