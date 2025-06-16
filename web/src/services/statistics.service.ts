import { db } from "@/lib/db";
import { apiKeys, userLogs } from "../../db/schema";
import { and, count, eq, gte } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getDashboardStats = cache(
  async (userId: string) => {
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
        and(
          eq(userLogs.userId, userId),
          gte(userLogs.createdAt, thirtyDaysAgo.getTime())
        )
      );

    return {
      totalKeys: totalKeys.value,
      activeKeys: activeKeys.value,
      totalRequests: totalRequests.value,
      requestsLast30Days: requestsLast30Days.value,
    };
  },
  ["statistics"],
  { revalidate: 300 }
);
