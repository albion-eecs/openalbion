import { type NextRequest, NextResponse } from "next/server";
import { requireUser, requireUserSession } from "@/lib/auth-server";
import { ValidationError, validate } from "@/lib/validation";
import * as userPreferenceService from "@/services/userPreference.service";

export async function GET() {
	const unauthorized = await requireUserSession();
	if (unauthorized) return unauthorized;

	try {
		const user = await requireUser();
		const preferences = await userPreferenceService.getPreferences(user.id);

		return NextResponse.json(preferences);
	} catch (error) {
		console.error("Error fetching user preferences:", error);

		return NextResponse.json(
			{
				error: "Internal Server Error",
				message: "Failed to fetch user preferences",
			},
			{ status: 500 },
		);
	}
}

export async function PUT(request: NextRequest) {
	const unauthorized = await requireUserSession();
	if (unauthorized) return unauthorized;

	try {
		const user = await requireUser();
		const body = await request.json();
		const validatedBody = validate(
			userPreferenceService.preferenceSchema,
			body,
		);

		const updatedPreferences = await userPreferenceService.updatePreferences(
			user.id,
			validatedBody,
		);

		return NextResponse.json(updatedPreferences);
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{
					error: "Bad Request",
					message: "Invalid request body",
					details: error.details.flatten(),
				},
				{ status: 400 },
			);
		}
		console.error("Error updating user preferences:", error);

		return NextResponse.json(
			{
				error: "Internal Server Error",
				message: "Failed to update user preferences",
			},
			{ status: 500 },
		);
	}
}
