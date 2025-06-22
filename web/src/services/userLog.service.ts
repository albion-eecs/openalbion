import { db } from "@/lib/db";
import { userLogs } from "../../db/schema";
import { UserLog } from "@/lib/types";

export async function createLog(log: UserLog) {
  return db.insert(userLogs).values(log);
}
