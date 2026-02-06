import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as path from "path";
import * as XLSX from "xlsx";
import * as schema from "../../db/schema";

const dbPath = path.resolve(process.cwd(), "db/sqlite.db");
const sqlite = new Database(dbPath);
const db = drizzle(sqlite, { schema });

type HeadcountRow = (string | number | null)[];

function parseHeadcounts(filePath: string) {
	const workbook = XLSX.readFile(filePath);
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];
	const data = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as HeadcountRow[];

	const headerIndex = data.findIndex((row) => row.includes("YEAR"));
	if (headerIndex === -1) {
		throw new Error("Could not find 'YEAR' header in headcounts file.");
	}

	const dataRows = data.slice(headerIndex + 1);

	const results = dataRows
		.map((row) => ({
			year: Number(row[0]),
			count: Number(String(row[1]).replace(/,/g, "")),
		}))
		.filter((r) => r.year && r.count);

	return results;
}

async function seedHeadcounts(filePath: string) {
	if (!filePath) {
		throw new Error("File path must be provided.");
	}
	console.log(`Parsing headcounts data from ${filePath}...`);
	const headcountsData = parseHeadcounts(filePath);
	console.log(`Found ${headcountsData.length} headcount records.`);

	if (headcountsData.length > 0) {
		console.log("Seeding headcounts into the database...");
		await db
			.insert(schema.headcounts)
			.values(headcountsData)
			.onConflictDoUpdate({
				target: schema.headcounts.year,
				set: {
					count: sql`excluded.count`,
				},
			});
		console.log("Seeding complete.");
	}
}

const filePath = process.argv[2];
seedHeadcounts(filePath).catch((error) => {
	console.error("Error seeding headcounts:", error);
	process.exit(1);
});
