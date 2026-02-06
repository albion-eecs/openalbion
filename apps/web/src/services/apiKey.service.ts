import { db } from "@oa/db";
import { apiKeys } from "@oa/db/schema";
import { eq, and } from "drizzle-orm";

function generateApiKey(): string {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 32; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return `oa_${result}`;
}

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
		.set({ lastUsedAt: new Date() })
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
	expiresInDays?: number,
) {
	const key = generateApiKey();
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
			createdAt: now,
			expiresAt: expiresAt,
		})
		.returning();

	return newKey;
}

export async function deleteApiKey(keyId: number, userId: string) {
	const result = await db
		.delete(apiKeys)
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
	return result.rowsAffected > 0;
}

export async function revokeApiKey(keyId: number, userId: string) {
	const result = await db
		.update(apiKeys)
		.set({ isActive: false })
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
	return result.rowsAffected > 0;
}

export async function unrevokeApiKey(keyId: number, userId: string) {
	const result = await db
		.update(apiKeys)
		.set({ isActive: true })
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
	return result.rowsAffected > 0;
}
