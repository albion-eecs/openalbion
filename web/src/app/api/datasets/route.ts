import { NextResponse } from "next/server";
import { datasetService } from "@/lib/db-service";
import { getUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const datasetInfo = datasetService.getDatasetInfo();

    return NextResponse.json({
      success: true,
      data: datasetInfo,
    });
  } catch (error) {
    console.error("Error fetching dataset information:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dataset information" },
      { status: 500 }
    );
  }
}
