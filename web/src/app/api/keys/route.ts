import { NextRequest, NextResponse } from "next/server";
import { apiKeyService, userLogService } from "@/lib/db-service";
import { getUser } from "@/lib/auth";

type ApiKey = {
  id: number;
  userId: string;
  apiKey: string;
  name: string;
  createdAt: number;
  expiresAt: number | null;
  lastUsedAt: number | null;
  isActive: boolean;
};

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

    const apiKeys = apiKeyService.getApiKeysByUserId(user.id) as ApiKey[];

    return NextResponse.json({
      success: true,
      data: apiKeys,
    });
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, expiresInDays } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "API key name is required" },
        { status: 400 }
      );
    }

    const apiKey = apiKeyService.createApiKey(
      user.id,
      name,
      expiresInDays ? parseInt(expiresInDays, 10) : undefined
    );

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Failed to create API key" },
        { status: 500 }
      );
    }

    userLogService.createLog({
      userId: user.id,
      action: "create_api_key",
      resourceType: "api_key",
      resourceId: apiKey.id.toString(),
      details: ` Created API key: ${name}`,
    });

    return NextResponse.json({
      success: true,
      data: apiKey,
    });
  } catch (error) {
    console.error("Error creating API key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = await req.nextUrl.searchParams;
    const keyId = searchParams.get("id");

    if (!keyId) {
      return NextResponse.json(
        { success: false, error: "API key ID is required" },
        { status: 400 }
      );
    }

    const action = searchParams.get("action") || "revoke";
    let success: boolean = false;

    const apiKeys = apiKeyService.getApiKeysByUserId(user.id) as ApiKey[];
    const apiKey = apiKeys.find(k => k.id === parseInt(keyId, 10));
    const keyName = apiKey ? apiKey.name : "Unknown";

    if (action === "delete") {
      const result = apiKeyService.deleteApiKey(parseInt(keyId, 10), user.id);
      success = result === true;

      if (success) {
        userLogService.createLog({
          userId: user.id,
          action: "delete_api_key",
          resourceType: "api_key",
          resourceId: keyId,
          details: ` Deleted API key: ${keyName}`,
        });
      }
    } else {
      const result = apiKeyService.revokeApiKey(parseInt(keyId, 10), user.id);
      success = result === true;

      if (success) {
        userLogService.createLog({
          userId: user.id,
          action: "revoke_api_key",
          resourceType: "api_key",
          resourceId: keyId,
          details: ` Revoked API key: ${keyName}`,
        });
      }
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
    console.error("Error managing API key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to manage API key" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = await req.nextUrl.searchParams;
    const keyId = searchParams.get("id");

    if (!keyId) {
      return NextResponse.json(
        { success: false, error: "API key ID is required" },
        { status: 400 }
      );
    }

    const action = searchParams.get("action");

    if (action !== "unrevoke") {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    const apiKeys = apiKeyService.getApiKeysByUserId(user.id) as ApiKey[];
    const apiKey = apiKeys.find(k => k.id === parseInt(keyId, 10));
    const keyName = apiKey ? apiKey.name : "Unknown";

    const success = apiKeyService.unrevokeApiKey(parseInt(keyId, 10), user.id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to unrevoke API key" },
        { status: 404 }
      );
    }

    userLogService.createLog({
      userId: user.id,
      action: "unrevoke_api_key",
      resourceType: "api_key",
      resourceId: keyId,
      details: ` Unrevoked API key: ${keyName}`,
    });

    return NextResponse.json({
      success: true,
      message: "API key unrevoked successfully",
    });
  } catch (error) {
    console.error("Error unrevoking API key:", error);
    return NextResponse.json(
      { success: false, error: "Failed to unrevoke API key" },
      { status: 500 }
    );
  }
}
