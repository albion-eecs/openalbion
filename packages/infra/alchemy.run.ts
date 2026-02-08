import alchemy from "alchemy";
import {
	D1Database,
	DurableObjectNamespace,
	Nextjs,
	RateLimit,
} from "alchemy/cloudflare";
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
	migrationsDir: "../../packages/db/src/migrations",
	readReplication: { mode: "auto" },
});

const apiRateLimit = RateLimit({
	namespace_id: 1001,
	simple: { limit: 100, period: 60 },
});

const [webDoQueue, webDoTagCache, webDoCachePurge] = await Promise.all([
	DurableObjectNamespace("web-do-queue", {
		className: "DOQueueHandler",
		sqlite: true,
	}),
	DurableObjectNamespace("web-do-tag-cache", {
		className: "DOShardedTagCache",
		sqlite: true,
	}),
	DurableObjectNamespace("web-do-cache-purge", {
		className: "BucketCachePurge",
		sqlite: true,
	}),
]);

export const web = await Nextjs("openalbion", {
	name: "openalbion",
	adopt: true,
	cwd: "../../apps/web",
	domains: ["openalbion.org"],
	observability: {
		enabled: true,
		headSamplingRate: 1,
		logs: {
			enabled: true,
			headSamplingRate: 1,
			persist: true,
			invocationLogs: true,
		},
		traces: {
			enabled: true,
			persist: true,
			headSamplingRate: 1,
		},
	},
	placement: { mode: "smart" },
	previewSubdomains: false,
	url: false,
	bindings: {
		DB: database,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
		API_RATE_LIMIT: apiRateLimit,
		NEXT_CACHE_DO_QUEUE: webDoQueue,
		NEXT_TAG_CACHE_DO_SHARDED: webDoTagCache,
		NEXT_CACHE_DO_PURGE: webDoCachePurge,
	},
});

const [docsDoQueue, docsDoTagCache, docsDoCachePurge] = await Promise.all([
	DurableObjectNamespace("docs-do-queue", {
		className: "DOQueueHandler",
		sqlite: true,
	}),
	DurableObjectNamespace("docs-do-tag-cache", {
		className: "DOShardedTagCache",
		sqlite: true,
	}),
	DurableObjectNamespace("docs-do-cache-purge", {
		className: "BucketCachePurge",
		sqlite: true,
	}),
]);

export const docs = await Nextjs("openalbion-docs", {
	name: "openalbion-docs",
	adopt: true,
	cwd: "../../apps/docs",
	domains: ["docs.openalbion.org"],
	observability: {
		enabled: true,
		headSamplingRate: 1,
		logs: {
			enabled: true,
			headSamplingRate: 1,
			persist: true,
			invocationLogs: true,
		},
		traces: {
			enabled: true,
			persist: true,
			headSamplingRate: 1,
		},
	},
	placement: { mode: "smart" },
	previewSubdomains: false,
	url: false,
	bindings: {
		NEXT_CACHE_DO_QUEUE: docsDoQueue,
		NEXT_TAG_CACHE_DO_SHARDED: docsDoTagCache,
		NEXT_CACHE_DO_PURGE: docsDoCachePurge,
	},
});

await app.finalize();
