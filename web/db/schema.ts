import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const academicYears = sqliteTable("academic_years", {
  id: integer("id").primaryKey(),
  year: text("year").notNull().unique(),
});

export const enrollment = sqliteTable("enrollment", {
  id: integer("id").primaryKey(),
  academicYearId: integer("academic_year_id")
    .notNull()
    .references(() => academicYears.id),

  dimension: text("dimension").notNull(),
  primaryCategory: text("primary_category").notNull(),
  secondaryCategory: text("secondary_category").notNull(),
  value: integer("value").notNull(),
});

export const headcounts = sqliteTable("headcounts", {
  year: integer("year").primaryKey(),
  count: integer("count").notNull(),
});

export const apiKeys = sqliteTable("api_keys", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  apiKey: text("api_key").notNull().unique(),
  name: text("name").notNull(),
  createdAt: integer("created_at").notNull(),
  expiresAt: integer("expires_at"),
  lastUsedAt: integer("last_used_at"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

export const userLogs = sqliteTable("user_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  resourceType: text("resource_type"),
  resourceId: text("resource_id"),
  details: text("details"),
  createdAt: integer("created_at")
    .$defaultFn(() => new Date().getTime())
    .notNull(),
});

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
