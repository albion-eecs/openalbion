import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";

export default defineCloudflareConfig({
	queue: doQueue,
	tagCache: doShardedTagCache,
});
