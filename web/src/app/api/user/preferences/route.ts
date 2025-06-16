import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth-server";
import { userPreferenceService } from "@/lib/db-service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to access this endpoint",
        },
        { status: 401 }
      );
    }

    const preferences = await userPreferenceService.getPreferences(user.id);

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching user preferences:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to fetch user preferences",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to update preferences",
        },
        { status: 401 }
      );
    }

    const data = await request.json();

    const validPreferences = [
      "apiUsageAlerts",
      "securityAlerts",
      "dataUpdateAlerts",
    ];
    const preferences: Record<string, boolean> = {};
    let hasValidPreference = false;

    for (const key of validPreferences) {
      if (typeof data[key] === "boolean") {
        preferences[key] = data[key];
        hasValidPreference = true;
      }
    }

    if (!hasValidPreference) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "At least one valid preference must be provided",
        },
        { status: 400 }
      );
    }

    const updatedPreferences = await userPreferenceService.updatePreferences(
      user.id,
      preferences
    );

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error("Error updating user preferences:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to update user preferences",
      },
      { status: 500 }
    );
  }
}
