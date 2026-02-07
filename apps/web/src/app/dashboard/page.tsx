import { createAuth } from "@oa/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCloudflareEnv, getDb } from "@/lib/db";

import Dashboard from "./dashboard";

export default async function DashboardPage() {
	const env = await getCloudflareEnv();
	const db = await getDb();
	const auth = createAuth(db, env);
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/");
	}

	return <Dashboard session={session} />;
}
