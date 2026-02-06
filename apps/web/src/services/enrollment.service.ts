import { academicYears, enrollment } from "@oa/db/schema";
import { asc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { z } from "zod";
import { getDb } from "@/lib/db";

export const enrollmentQuerySchema = z.object({
	dimension: z.string().optional(),
});

export type EnrollmentQuery = z.infer<typeof enrollmentQuerySchema>;

export const getEnrollment = cache(
	async (query: EnrollmentQuery) => {
		const db = await getDb();
		const where = query.dimension
			? eq(enrollment.dimension, query.dimension)
			: undefined;

		const data = await db
			.select({
				year: academicYears.year,
				dimension: enrollment.dimension,
				primaryCategory: enrollment.primaryCategory,
				secondaryCategory: enrollment.secondaryCategory,
				value: enrollment.value,
			})
			.from(enrollment)
			.leftJoin(academicYears, eq(enrollment.academicYearId, academicYears.id))
			.where(where)
			.orderBy(
				asc(academicYears.year),
				asc(enrollment.primaryCategory),
				asc(enrollment.secondaryCategory),
			);

		return data;
	},
	["enrollment"],
	{ revalidate: 3600 },
);
