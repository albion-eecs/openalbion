import { createDb } from "@oa/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getCloudflareEnv() {
	const { env } = await getCloudflareContext({ async: true });
	return env;
}

export async function getDb() {
	const env = await getCloudflareEnv();
	return createDb(env.DB);
}
