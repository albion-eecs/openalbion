import { db } from "@/lib/db";
import { apiKeys } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function validateApiKey(key: string) {
  const [keyData] = await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.apiKey, key))
    .limit(1);

  if (!keyData || !keyData.isActive) {
    return null;
  }

  db.update(apiKeys)
    .set({ lastUsedAt: new Date().getTime() })
    .where(eq(apiKeys.id, keyData.id))
    .then()
    .catch(console.error);

  return keyData;
}

export async function getApiKeysByUserId(userId: string) {
  return db.select().from(apiKeys).where(eq(apiKeys.userId, userId));
}

export async function createApiKey(
  userId: string,
  name: string,
  expiresInDays?: number
) {
  const key = `oa_${randomBytes(16).toString("hex")}`;
  const now = new Date();
  let expiresAt: Date | null = null;
  if (expiresInDays) {
    expiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
  }

  const [newKey] = await db
    .insert(apiKeys)
    .values({
      userId,
      name,
      apiKey: key,
      createdAt: now.getTime(),
      expiresAt: expiresAt ? expiresAt.getTime() : null,
    })
    .returning();

  return newKey;
}

export async function deleteApiKey(keyId: number, userId: string) {
  const result = await db
    .delete(apiKeys)
    .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
  return result.changes > 0;
}

export async function revokeApiKey(keyId: number, userId: string) {
  const result = await db
    .update(apiKeys)
    .set({ isActive: false })
    .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
  return result.changes > 0;
}

export async function unrevokeApiKey(keyId: number, userId: string) {
  const result = await db
    .update(apiKeys)
    .set({ isActive: true })
    .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
  return result.changes > 0;
}
