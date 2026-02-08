export {};

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const message = process.env.DEPLOY_MESSAGE;

if (!accountId || !apiToken) {
	console.log("Skipping annotation (missing credentials)");
	process.exit(0);
}

const scripts = ["openalbion", "openalbion-docs"];

for (const script of scripts) {
	const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${script}/deployments`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			annotations: { "workers/message": message },
		}),
	});

	if (res.ok) {
		console.log(`Annotation for ${script}`);
	} else {
		const body = await res.text();
		console.warn(`Failed to annotate ${script}: ${res.status} ${body}`);
	}
}
