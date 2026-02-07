import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, requireUserSession } from "@/lib/auth-server";
import { ValidationError, validate } from "@/lib/validation";
import * as apiKeyService from "@/services/apiKey.service";

const createApiKeySchema = z.object({
	name: z.string().min(1, "API key name is required"),
	expiresInDays: z.number().int().positive().nullable().optional(),
});

const manageApiKeySchema = z.object({
	id: z.string().min(1, "API key ID is required"),
	action: z.enum(["revoke", "unrevoke", "delete"]).optional(),
});

export async function GET() {
	const unauthorized = await requireUserSession();
	if (unauthorized) return unauthorized;

	try {
		const user = await requireUser();
		const apiKeys = await apiKeyService.getApiKeysByUserId(user.id);

		return NextResponse.json({
			success: true,
			data: apiKeys,
		});
	} catch (error) {
		console.error("Error fetching API keys:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch API keys" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	const unauthorized = await requireUserSession();
	if (unauthorized) return unauthorized;

	try {
		const user = await requireUser();

		const body = await req.json();
		const validatedBody = validate(createApiKeySchema, body);

		const { name, expiresInDays } = validatedBody;

		const apiKey = await apiKeyService.createApiKey(
			user.id,
			name,
			expiresInDays ?? undefined,
		);

		if (!apiKey) {
			return NextResponse.json(
				{ success: false, error: "Failed to create API key" },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			success: true,
			data: apiKey,
		});
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid request body",
					details: error.details.flatten(),
				},
				{ status: 400 },
			);
		}
		console.error("Error creating API key:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create API key" },
			{ status: 500 },
		);
	}
}

export async function DELETE(req: NextRequest) {
	const unauthorized = await requireUserSession();
	if (unauthorized) return unauthorized;

	try {
		const user = await requireUser();
		const searchParams = req.nextUrl.searchParams;
		const query = Object.fromEntries(searchParams.entries());
		const validatedQuery = validate(manageApiKeySchema, query);

		const { id: keyId, action = "revoke" } = validatedQuery;
		let success = false;

		if (action === "delete") {
			success = await apiKeyService.deleteApiKey(
				Number.parseInt(keyId, 10),
				user.id,
			);
		} else {
			success = await apiKeyService.revokeApiKey(
				Number.parseInt(keyId, 10),
				user.id,
			);
		}

		if (!success) {
			return NextResponse.json(
				{ success: false, error: "Failed to perform action on API key" },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			success: true,
			message:
				action === "delete"
					? "API key deleted successfully"
					: "API key revoked successfully",
		});
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid query parameters",
					details: error.details.flatten(),
				},
				{ status: 400 },
			);
		}
		console.error("Error managing API key:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to manage API key" },
			{ status: 500 },
		);
	}
}

export async function PUT(req: NextRequest) {
	const unauthorized = await requireUserSession();
	if (unauthorized) return unauthorized;

	try {
		const user = await requireUser();
		const searchParams = req.nextUrl.searchParams;
		const query = Object.fromEntries(searchParams.entries());
		const validatedQuery = validate(manageApiKeySchema, query);

		const { id: keyId, action } = validatedQuery;

		if (action !== "unrevoke") {
			return NextResponse.json(
				{ success: false, error: "Invalid action" },
				{ status: 400 },
			);
		}

		const success = await apiKeyService.unrevokeApiKey(
			Number.parseInt(keyId, 10),
			user.id,
		);

		if (!success) {
			return NextResponse.json(
				{ success: false, error: "Failed to unrevoke API key" },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			success: true,
			message: "API key unrevoked successfully",
		});
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid query parameters",
					details: error.details.flatten(),
				},
				{ status: 400 },
			);
		}
		console.error("Error unrevoking API key:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to unrevoke API key" },
			{ status: 500 },
		);
	}
}
