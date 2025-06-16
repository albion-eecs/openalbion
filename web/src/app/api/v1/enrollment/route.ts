import { NextResponse, NextRequest } from "next/server";
import {
  getEnrollment,
  enrollmentQuerySchema,
} from "@/services/enrollment.service";
import { requireApiKey } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const authResponse = await requireApiKey(request);
  if (authResponse) return authResponse;

  try {
    const searchParams = request.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const validatedQuery = enrollmentQuerySchema.safeParse(query);

    if (!validatedQuery.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: validatedQuery.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = await getEnrollment(validatedQuery.data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching enrollment data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
