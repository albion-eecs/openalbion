import { NextResponse, NextRequest } from "next/server";
import { getHeadcounts } from "@/services/headcounts.service";
import { requireApiKey } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const authResponse = await requireApiKey(request);
  if (authResponse) return authResponse;

  try {
    const data = await getHeadcounts();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching headcounts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
