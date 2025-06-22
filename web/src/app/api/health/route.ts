import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await db.run("SELECT 1");
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
