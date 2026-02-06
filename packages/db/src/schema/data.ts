import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const academicYears = sqliteTable("academic_years", {
	id: integer("id").primaryKey(),
	year: text("year").notNull().unique(),
});

export const enrollment = sqliteTable(
	"enrollment",
	{
		id: integer("id").primaryKey(),
		academicYearId: integer("academic_year_id")
			.notNull()
			.references(() => academicYears.id),
		dimension: text("dimension").notNull(),
		primaryCategory: text("primary_category").notNull(),
		secondaryCategory: text("secondary_category").notNull(),
		value: integer("value").notNull(),
	},
	(table) => [
		index("enrollment_academicYearId_idx").on(table.academicYearId),
		index("enrollment_dimension_idx").on(table.dimension),
	],
);

export const headcounts = sqliteTable("headcounts", {
	year: integer("year").primaryKey(),
	count: integer("count").notNull(),
});

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
	enrollments: many(enrollment),
}));

export const enrollmentRelations = relations(enrollment, ({ one }) => ({
	academicYear: one(academicYears, {
		fields: [enrollment.academicYearId],
		references: [academicYears.id],
	}),
}));
