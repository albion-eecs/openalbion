import { type NextRequest, NextResponse } from "next/server";
import { requireApiKey } from "@/lib/auth-server";
import { checkRateLimit } from "@/lib/limit";
import { ValidationError, validate } from "@/lib/validation";
import {
	enrollmentQuerySchema,
	getEnrollment,
} from "@/services/enrollment.service";

export async function GET(request: NextRequest) {
	const rateLimitResponse = await checkRateLimit(request);
	if (rateLimitResponse) return rateLimitResponse;

	const authResponse = await requireApiKey(request);
	if (authResponse) return authResponse;

	try {
		const searchParams = request.nextUrl.searchParams;
		const query = Object.fromEntries(searchParams.entries());

		const validatedQuery = validate(enrollmentQuerySchema, query);

		const data = await getEnrollment(validatedQuery);
		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{
					error: "Invalid query parameters",
					details: error.details.flatten(),
				},
				{ status: 400 },
			);
		}
		console.error("Error fetching enrollment data:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
