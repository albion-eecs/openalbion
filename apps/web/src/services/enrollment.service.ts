import { db } from "@oa/db";
import { enrollment, academicYears } from "@oa/db/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import { unstable_cache as cache } from "next/cache";

export const enrollmentQuerySchema = z.object({
	dimension: z.string().optional(),
});

export type EnrollmentQuery = z.infer<typeof enrollmentQuerySchema>;

export const getEnrollment = cache(
	async (query: EnrollmentQuery) => {
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
