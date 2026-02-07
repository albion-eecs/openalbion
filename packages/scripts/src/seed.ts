import { execSync } from "node:child_process";
import * as path from "node:path";

const seedConfigs = [
	{
		script: "parsers/headcounts.ts",
		dataFile: "uncleaned/-2024/headcounts.xlsx",
	},
	{
		script: "parsers/enrollment-fall.ts",
		dataFile: "uncleaned/-2024/enrollment-fall.xlsx",
	},
	{
		script: "parsers/enrollment-spring.ts",
		dataFile: "uncleaned/-2024/enrollment-spring.xlsx",
	},
];

function runScript(scriptPath: string, dataFilePath: string) {
	const absoluteDataPath = path.resolve(
		process.cwd(),
		"public/datasets",
		dataFilePath,
	);
	try {
		console.log(
			`\n--- Running seeder: ${scriptPath} for file: ${dataFilePath} ---\n`,
		);
		execSync(`pnpm tsx ./scripts/${scriptPath} "${absoluteDataPath}"`, {
			stdio: "inherit",
		});
		console.log(`\n--- Finished seeder: ${scriptPath} ---\n`);
	} catch (error) {
		console.error(`\n--- Error running ${scriptPath} ---`);
		console.error(error);
		process.exit(1);
	}
}

function main() {
	console.log("\n--- Starting Master Seeding Process ---\n");
	for (const config of seedConfigs) {
		runScript(config.script, config.dataFile);
	}
	console.log("\n--- Master Seeding Process Completed Successfully ---\n");
}

main();
