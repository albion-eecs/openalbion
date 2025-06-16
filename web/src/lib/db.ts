import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../../db/schema";
import * as path from "path";

const dbPath = path.resolve(process.cwd(), "db/sqlite.db");
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
