import { db } from "../lib/db";
import { headcounts } from "../../db/schema";
import { asc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getHeadcounts = cache(
  async () => {
    const data = await db
      .select()
      .from(headcounts)
      .orderBy(asc(headcounts.year));
    return data;
  },
  ["headcounts"],
  { revalidate: 3600 }
);
