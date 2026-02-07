import { apiKeys } from "@oa/db/schema";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";

function generateApiKey(): string {
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);
	const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
		"",
	);
	return `oa_${hex}`;
}

export async function validateApiKey(key: string) {
	const db = await getDb();
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
	const db = await getDb();
	return db.select().from(apiKeys).where(eq(apiKeys.userId, userId));
}

export async function createApiKey(
	userId: string,
	name: string,
	expiresInDays?: number,
) {
	const db = await getDb();
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
	const db = await getDb();
	const result = await db
		.delete(apiKeys)
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)))
		.returning({ id: apiKeys.id });
	return result.length > 0;
}

export async function revokeApiKey(keyId: number, userId: string) {
	const db = await getDb();
	const result = await db
		.update(apiKeys)
		.set({ isActive: false })
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)))
		.returning({ id: apiKeys.id });
	return result.length > 0;
}

export async function unrevokeApiKey(keyId: number, userId: string) {
	const db = await getDb();
	const result = await db
		.update(apiKeys)
		.set({ isActive: true })
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)))
		.returning({ id: apiKeys.id });
	return result.length > 0;
}
