import { NextRequest, NextResponse } from "next/server";
import * as apiKeyService from "@/services/apiKey.service";
import { requireUser } from "@/lib/auth-server";
import { z } from "zod";

const createApiKeySchema = z.object({
  name: z.string().min(1, "API key name is required"),
  expiresInDays: z.number().optional(),
});

const manageApiKeySchema = z.object({
  id: z.string().min(1, "API key ID is required"),
  action: z.enum(["revoke", "unrevoke", "delete"]).optional(),
});

export async function GET() {
  try {
    const user = await requireUser();
    const apiKeys = await apiKeyService.getApiKeysByUserId(user.id);

    return NextResponse.json({
      success: true,
      data: apiKeys,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    const body = await req.json();
    const validatedBody = createApiKeySchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          details: validatedBody.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, expiresInDays } = validatedBody.data;

    const apiKey = await apiKeyService.createApiKey(
      user.id,
      name,
      expiresInDays
    );

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Failed to create API key" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: apiKey,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error creating API key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());
    const validatedQuery = manageApiKeySchema.safeParse(query);

    if (!validatedQuery.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: validatedQuery.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { id: keyId, action = "revoke" } = validatedQuery.data;
    let success: boolean = false;

    if (action === "delete") {
      success = await apiKeyService.deleteApiKey(parseInt(keyId, 10), user.id);
    } else {
      success = await apiKeyService.revokeApiKey(parseInt(keyId, 10), user.id);
    }

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to perform action on API key" },
        { status: 404 }
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
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error managing API key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to manage API key" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());
    const validatedQuery = manageApiKeySchema.safeParse(query);

    if (!validatedQuery.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: validatedQuery.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { id: keyId, action } = validatedQuery.data;

    if (action !== "unrevoke") {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    const success = await apiKeyService.unrevokeApiKey(
      parseInt(keyId, 10),
      user.id
    );

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to unrevoke API key" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "API key unrevoked successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error unrevoking API key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to unrevoke API key" },
      { status: 500 }
    );
  }
}
