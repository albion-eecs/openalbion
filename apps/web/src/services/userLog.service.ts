import { db } from "@oa/db";
import { userLogs } from "@oa/db/schema";
import type { UserLog } from "@/lib/types";

export async function createLog(log: UserLog) {
	return db.insert(userLogs).values(log);
}
