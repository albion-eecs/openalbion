import { userLogs } from "@oa/db/schema";
import { getDb } from "@/lib/db";
import type { UserLog } from "@/lib/types";

export async function createLog(log: UserLog) {
	const db = await getDb();
	return db.insert(userLogs).values(log);
}
