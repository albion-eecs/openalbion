import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const apiKeys = sqliteTable(
	"api_keys",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		apiKey: text("api_key").notNull().unique(),
		name: text("name").notNull(),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
		lastUsedAt: integer("last_used_at", { mode: "timestamp_ms" }),
		isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	},
	(table) => [
		index("apiKeys_userId_idx").on(table.userId),
		index("apiKeys_apiKey_idx").on(table.apiKey),
	],
);
