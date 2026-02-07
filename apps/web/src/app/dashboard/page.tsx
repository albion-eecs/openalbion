import { createAuth } from "@oa/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getDb } from "@/lib/db";

import Dashboard from "./dashboard";

export default async function DashboardPage() {
	const db = await getDb();
	const auth = createAuth(db);
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/");
	}

	return <Dashboard session={session} />;
}
