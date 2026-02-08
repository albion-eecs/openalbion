import * as fs from "node:fs";
import * as path from "node:path";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as XLSX from "xlsx";

import * as schema from "./schema";

dotenv.config({ path: "../../.env" });

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID!;
const apiToken = process.env.CLOUDFLARE_API_TOKEN!;

if (!accountId || !databaseId || !apiToken) {
	console.error(
		"Missing CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, or CLOUDFLARE_API_TOKEN",
	);
	process.exit(1);
}

const d1Http = {
	async prepare(queryStr: string) {
		let bindings: unknown[] = [];
		return {
			bind(...args: unknown[]) {
				bindings = args;
				return this;
			},
			async all() {
				return d1Query(queryStr, bindings);
			},
			async run() {
				return d1Query(queryStr, bindings);
			},
			async first() {
				const result = await d1Query(queryStr, bindings);
				return result.results?.[0] ?? null;
			},
			async raw() {
				const result = await d1Query(queryStr, bindings);
				return result.results ?? [];
			},
		};
	},
	async batch(statements: { query: string; bindings: unknown[] }[]) {
		const results = [];
		for (const stmt of statements) {
			results.push(await d1Query(stmt.query, stmt.bindings));
		}
		return results;
	},
	async exec(queryStr: string) {
		return d1Query(queryStr, []);
	},
} as unknown as D1Database;

async function d1Query(queryStr: string, params: unknown[]) {
	const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ sql: queryStr, params }),
	});
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`D1 HTTP API error ${res.status}: ${body}`);
	}
	const json = (await res.json()) as {
		result: { results: Record<string, unknown>[] }[];
	};
	return json.result[0] ?? { results: [] };
}

const db = drizzle(d1Http, { schema });

const DATASETS_DIR = path.resolve("../../apps/web/public/datasets/uncleaned");
const availableYears = fs
	.readdirSync(DATASETS_DIR)
	.filter(
		(d) =>
			d.startsWith("-") &&
			fs.statSync(path.join(DATASETS_DIR, d)).isDirectory(),
	)
	.map((d) => d.slice(1))
	.sort();

const year = process.argv[2];
if (!year) {
	console.error(
		`Usage: tsx src/seed.ts <year>\nAvailable years: ${availableYears.join(", ") || "(none found)"}`,
	);
	process.exit(1);
}

const DATA_DIR = path.join(DATASETS_DIR, `-${year}`);

if (!fs.existsSync(DATA_DIR)) {
	console.error(
		`Data directory not found: ${DATA_DIR}\nAvailable years: ${availableYears.join(", ") || "(none found)"}`,
	);
	process.exit(1);
}

const BATCH_SIZE = 50;

type SheetRow = (string | number | null)[];

function clean(value: unknown): string | null {
	if (value === null || value === undefined) return null;
	return String(value).trim();
}

function parseHeadcounts(filePath: string) {
	const workbook = XLSX.readFile(filePath);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]!]!;
	const data = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as SheetRow[];

	const headerIndex = data.findIndex((row) =>
		row.some(
			(cell) => typeof cell === "string" && cell.toUpperCase() === "YEAR",
		),
	);
	if (headerIndex === -1) {
		throw new Error("Could not find 'YEAR' header in headcounts file.");
	}

	return data
		.slice(headerIndex + 1)
		.map((row) => ({
			year: Number(row[0]),
			count: Number(String(row[1]).replace(/,/g, "")),
		}))
		.filter((r) => r.year && r.count);
}

interface EnrollmentRecord {
	academicYear: string;
	dimension: string;
	primaryCategory: string;
	secondaryCategory: string;
	value: number;
}

function parseEnrollmentSheet(
	worksheet: XLSX.WorkSheet,
	dimension: string,
): EnrollmentRecord[] {
	const data = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as SheetRow[];

	const yearRowIndex = data.findIndex((row) =>
		row.some(
			(cell) => typeof cell === "string" && cell.includes("ACADEMIC YEAR"),
		),
	);
	if (yearRowIndex === -1) return [];

	const yearHeaders = data[yearRowIndex]!;
	const subHeaders = data[yearRowIndex + 1]!;

	const combinedHeaders: {
		year: string;
		subCategory: string;
		colIndex: number;
	}[] = [];
	let currentYear = "";
	for (let i = 1; i < yearHeaders.length; i++) {
		const y = clean(yearHeaders[i]);
		if (y?.match(/\d{4}/)) {
			currentYear = y;
		}
		const subCategory = clean(subHeaders[i]);
		if (currentYear && subCategory) {
			combinedHeaders.push({
				year: currentYear,
				subCategory,
				colIndex: i,
			});
		}
	}

	const results: EnrollmentRecord[] = [];
	for (let i = yearRowIndex + 2; i < data.length; i++) {
		const row = data[i]!;
		const primaryCategory = clean(row[0]);
		if (!primaryCategory || primaryCategory.toLowerCase().includes("total")) {
			continue;
		}
		for (const header of combinedHeaders) {
			const value = row[header.colIndex];
			if (value !== null && value !== undefined && value !== "-") {
				results.push({
					academicYear: header.year,
					dimension,
					primaryCategory,
					secondaryCategory: header.subCategory,
					value: Number(String(value).replace(/,/g, "")) || 0,
				});
			}
		}
	}
	return results;
}

function parseAllEnrollment(): EnrollmentRecord[] {
	const sheetDimensions = ["BY GENDER", "BY ETHNICITY", "BY STATE-COUNTRY"];
	const dimensionLabels = ["Gender", "Ethnicity", "State/Country"];
	const files = ["enrollment-fall.xlsx", "enrollment-spring.xlsx"];

	const allData: EnrollmentRecord[] = [];
	for (const file of files) {
		const filePath = path.join(DATA_DIR, file);
		if (!fs.existsSync(filePath)) {
			console.warn(`Skipping missing file: ${file}`);
			continue;
		}
		const workbook = XLSX.readFile(filePath);
		for (const [i, sheetName] of sheetDimensions.entries()) {
			if (workbook.Sheets[sheetName]) {
				allData.push(
					...parseEnrollmentSheet(
						workbook.Sheets[sheetName],
						dimensionLabels[i]!,
					),
				);
			}
		}
	}
	return allData;
}

async function seedHeadcounts() {
	const filePath = path.join(DATA_DIR, "headcounts.xlsx");
	if (!fs.existsSync(filePath)) {
		console.warn("Skipping headcounts (file not found).");
		return;
	}

	const data = parseHeadcounts(filePath);
	console.log(`Parsed ${data.length} headcount records.`);

	for (let i = 0; i < data.length; i += BATCH_SIZE) {
		const batch = data.slice(i, i + BATCH_SIZE);
		await db
			.insert(schema.headcounts)
			.values(batch)
			.onConflictDoUpdate({
				target: schema.headcounts.year,
				set: { count: sql`excluded.count` },
			});
	}
	console.log("Headcounts seeded.");
}

async function seedEnrollment() {
	const data = parseAllEnrollment();
	if (data.length === 0) {
		console.warn("No enrollment data found.");
		return;
	}
	console.log(`Parsed ${data.length} enrollment records.`);

	const uniqueYears = [...new Set(data.map((r) => r.academicYear))];

	await db
		.insert(schema.academicYears)
		.values(uniqueYears.map((y) => ({ year: y })))
		.onConflictDoNothing();
	console.log(`Upserted ${uniqueYears.length} academic years.`);

	const academicYears = await db.select().from(schema.academicYears);
	const yearMap = new Map(academicYears.map((y) => [y.year, y.id]));

	await db.delete(schema.enrollment);

	const values = data.map((r) => ({
		academicYearId: yearMap.get(r.academicYear)!,
		dimension: r.dimension,
		primaryCategory: r.primaryCategory,
		secondaryCategory: r.secondaryCategory,
		value: r.value,
	}));

	for (let i = 0; i < values.length; i += BATCH_SIZE) {
		const batch = values.slice(i, i + BATCH_SIZE);
		await db.insert(schema.enrollment).values(batch);
		console.log(
			`  Enrollment batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(values.length / BATCH_SIZE)}`,
		);
	}
	console.log("Enrollment seeded.");
}

async function main() {
	console.log(`Seeding from: ${DATA_DIR}\n`);

	await seedHeadcounts();
	console.log();
	await seedEnrollment();

	console.log("\nSeed complete.");
}

main().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
