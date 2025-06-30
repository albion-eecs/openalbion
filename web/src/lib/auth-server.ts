"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/services/apiKey.service";

export async function getUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireUserSession() {
  try {
    await requireUser();
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function requireApiKey(request: NextRequest) {
  const xApiKey = request.headers.get("X-API-Key");
  const authHeader = request.headers.get("Authorization");
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;
  const queryApiKey = request.nextUrl.searchParams.get("apiKey");
  const apiKey = xApiKey || bearerToken || queryApiKey;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 401 });
  }

  const keyData = await validateApiKey(apiKey);

  if (!keyData) {
    return NextResponse.json(
      { error: "Invalid or expired API key" },
      { status: 401 }
    );
  }

  return null;
}
