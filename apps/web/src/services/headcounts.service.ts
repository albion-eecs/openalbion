import { headcounts } from "@oa/db/schema";
import { asc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { getDb } from "@/lib/db";

export const getHeadcounts = cache(
	async () => {
		const db = await getDb();
		const data = await db
			.select()
			.from(headcounts)
			.orderBy(asc(headcounts.year));
		return data;
	},
	["headcounts"],
	{ revalidate: 3600 },
);
