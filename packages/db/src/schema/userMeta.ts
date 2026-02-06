import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const userLogs = sqliteTable(
	"user_logs",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		action: text("action").notNull(),
		resourceType: text("resource_type"),
		resourceId: text("resource_id"),
		details: text("details"),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
	},
	(table) => [
		index("userLogs_userId_idx").on(table.userId),
		index("userLogs_action_idx").on(table.action),
	],
);

export const userPreferences = sqliteTable("user_preferences", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" })
		.unique(),
	apiUsageAlerts: integer("api_usage_alerts", { mode: "boolean" })
		.notNull()
		.default(true),
	securityAlerts: integer("security_alerts", { mode: "boolean" })
		.notNull()
		.default(true),
	dataUpdateAlerts: integer("data_update_alerts", { mode: "boolean" })
		.notNull()
		.default(true),
});

export const userLogsRelations = relations(userLogs, ({ one }) => ({
	user: one(user, {
		fields: [userLogs.userId],
		references: [user.id],
	}),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
	user: one(user, {
		fields: [userPreferences.userId],
		references: [user.id],
	}),
}));
