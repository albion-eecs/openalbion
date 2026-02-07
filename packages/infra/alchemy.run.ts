import alchemy from "alchemy";
import { D1Database, DurableObjectNamespace, Nextjs } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("openalbion", {
	stage: "prod",
	stateStore: (scope) =>
		new CloudflareStateStore(scope, { scriptName: "state" }),
});

const database = await D1Database("openalbion-db", {
	name: "openalbion-db",
	adopt: true,
});

const webDoQueue = await DurableObjectNamespace("web-do-queue", {
	className: "DOQueueHandler",
	sqlite: true,
});

const webDoTagCache = await DurableObjectNamespace("web-do-tag-cache", {
	className: "DOShardedTagCache",
	sqlite: true,
});

const webDoCachePurge = await DurableObjectNamespace("web-do-cache-purge", {
	className: "BucketCachePurge",
	sqlite: true,
});

export const web = await Nextjs("openalbion", {
	name: "openalbion",
	adopt: true,
	cwd: "../../apps/web",
	domains: ["openalbion.org"],
	bindings: {
		DB: database,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
		NEXT_CACHE_DO_QUEUE: webDoQueue,
		NEXT_TAG_CACHE_DO_SHARDED: webDoTagCache,
		NEXT_CACHE_DO_PURGE: webDoCachePurge,
	},
});

const docsDoQueue = await DurableObjectNamespace("docs-do-queue", {
	className: "DOQueueHandler",
	sqlite: true,
});

const docsDoTagCache = await DurableObjectNamespace("docs-do-tag-cache", {
	className: "DOShardedTagCache",
	sqlite: true,
});

const docsDoCachePurge = await DurableObjectNamespace("docs-do-cache-purge", {
	className: "BucketCachePurge",
	sqlite: true,
});

export const docs = await Nextjs("openalbion-docs", {
	name: "openalbion-docs",
	adopt: true,
	cwd: "../../apps/docs",
	domains: ["docs.openalbion.org"],
	bindings: {
		NEXT_CACHE_DO_QUEUE: docsDoQueue,
		NEXT_TAG_CACHE_DO_SHARDED: docsDoTagCache,
		NEXT_CACHE_DO_PURGE: docsDoCachePurge,
	},
});

await app.finalize();
