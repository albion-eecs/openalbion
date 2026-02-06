import { apiKeys, userLogs } from "@oa/db/schema";
import { and, count, eq, gte } from "drizzle-orm";
import { getDb } from "@/lib/db";

export async function getDashboardStats(userId: string) {
	const db = await getDb();
	const now = new Date();
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

	const [totalKeys] = await db
		.select({ value: count() })
		.from(apiKeys)
		.where(eq(apiKeys.userId, userId));

	const [activeKeys] = await db
		.select({ value: count() })
		.from(apiKeys)
		.where(and(eq(apiKeys.userId, userId), eq(apiKeys.isActive, true)));

	const [totalRequests] = await db
		.select({ value: count() })
		.from(userLogs)
		.where(eq(userLogs.userId, userId));

	const [requestsLast30Days] = await db
		.select({ value: count() })
		.from(userLogs)
		.where(
			and(eq(userLogs.userId, userId), gte(userLogs.createdAt, thirtyDaysAgo)),
		);

	return {
		totalKeys: Number(totalKeys?.value ?? 0),
		activeKeys: Number(activeKeys?.value ?? 0),
		totalRequests: Number(totalRequests?.value ?? 0),
		requestsLast30Days: Number(requestsLast30Days?.value ?? 0),
	};
}
