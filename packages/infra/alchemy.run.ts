import alchemy from "alchemy";
import { D1Database, DurableObjectNamespace, Nextjs } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("openalbion", {
	stage: "prod",
	stateStore: (scope) => new CloudflareStateStore(scope, { scriptName: "state" }),
});

const database = await D1Database("openalbion-db", { name: "openalbion-db" });

export const web = await Nextjs("openalbion", {
	name: "openalbion",
	cwd: "../../apps/web",
	domains: ["openalbion.org"],
	bindings: {
		DB: database,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
		NEXT_CACHE_DO_QUEUE: DurableObjectNamespace("do-queue", {
			className: "DOQueueHandler",
			sqlite: true,
		}),
		NEXT_TAG_CACHE_DO_SHARDED: DurableObjectNamespace("do-sharded-tag-cache", {
			className: "DOShardedTagCache",
			sqlite: true,
		}),
		NEXT_CACHE_DO_PURGE: DurableObjectNamespace("do-cache-purge", {
			className: "BucketCachePurge",
			sqlite: true,
		}),
	},
});

export const docs = await Nextjs("openalbion-docs", {
	cwd: "../../apps/docs",
	domains: ["docs.openalbion.org"],
	bindings: {
		NEXT_CACHE_DO_QUEUE: DurableObjectNamespace("docs-do-queue", {
			className: "DOQueueHandler",
			sqlite: true,
		}),
		NEXT_TAG_CACHE_DO_SHARDED: DurableObjectNamespace("docs-do-sharded-tag-cache", {
			className: "DOShardedTagCache",
			sqlite: true,
		}),
		NEXT_CACHE_DO_PURGE: DurableObjectNamespace("docs-do-cache-purge", {
			className: "BucketCachePurge",
			sqlite: true,
		}),
	},
});

await app.finalize();
