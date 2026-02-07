import { createDb } from "@oa/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDb() {
	const { env } = await getCloudflareContext();
	return createDb(env.DB);
}
