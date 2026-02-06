import alchemy from "alchemy";
import { D1Database, Nextjs } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("openalbion");

const database = await D1Database("openalbion");

export const web = await Nextjs("openalbion", {
	cwd: "../../apps/web",
	bindings: {
		DB: database,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
	},
});

export const docs = await Nextjs("openalbion-docs", {
	cwd: "../../apps/docs",
	bindings: {},
});

console.log(`Web  -> ${web.url}`);
console.log(`Docs -> ${docs.url}`);

await app.finalize();
