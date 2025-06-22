import { db } from "@/lib/db";
import { userPreferences } from "../../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const preferenceSchema = z.object({
  apiUsageAlerts: z.boolean().optional(),
  securityAlerts: z.boolean().optional(),
  dataUpdateAlerts: z.boolean().optional(),
});

export type Preferences = z.infer<typeof preferenceSchema>;

export async function getPreferences(userId: string) {
  const [preferences] = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);

  if (!preferences) {
    const [newPreferences] = await db
      .insert(userPreferences)
      .values({ userId })
      .returning();
    return newPreferences;
  }

  return preferences;
}

export async function updatePreferences(userId: string, data: Preferences) {
  const [updatedPreferences] = await db
    .update(userPreferences)
    .set(data)
    .where(eq(userPreferences.userId, userId))
    .returning();

  return updatedPreferences;
}
