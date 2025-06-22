import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import * as statisticsService from "@/services/statistics.service";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    const url = new URL(request.url);
    const searchParams = await url.searchParams;
    const requestedUserId = searchParams.get("userId");

    if (requestedUserId && requestedUserId !== user.id) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: "You do not have permission to access this data",
        },
        { status: 403 }
      );
    }

    const userId = requestedUserId || user.id;
    const stats = await statisticsService.getDashboardStats(userId);

    return NextResponse.json(stats);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to access this endpoint",
        },
        { status: 401 }
      );
    }
    console.error("Error fetching dashboard stats:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to fetch dashboard statistics",
      },
      { status: 500 }
    );
  }
}
