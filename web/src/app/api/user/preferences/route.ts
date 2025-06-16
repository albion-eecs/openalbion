import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import * as userPreferenceService from "@/services/userPreference.service";

export async function GET() {
  try {
    const user = await requireUser();
    const preferences = await userPreferenceService.getPreferences(user.id);

    return NextResponse.json(preferences);
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
    const user = await requireUser();
    const body = await request.json();
    const validatedBody =
      userPreferenceService.preferenceSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Invalid request body",
          details: validatedBody.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updatedPreferences = await userPreferenceService.updatePreferences(
      user.id,
      validatedBody.data
    );

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to update preferences",
        },
        { status: 401 }
      );
    }
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
