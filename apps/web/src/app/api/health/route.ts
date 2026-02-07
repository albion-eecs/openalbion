import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
	try {
		const db = await getDb();
		await db.run("SELECT 1");
		return NextResponse.json({ status: "ok" }, { status: 200 });
	} catch (error) {
		console.error("Health check failed", error);
		return NextResponse.json({ status: "error" }, { status: 500 });
	}
}
