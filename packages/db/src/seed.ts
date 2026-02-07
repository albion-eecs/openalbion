import * as path from "node:path";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1-http";
import * as XLSX from "xlsx";

import * as schema from "./schema";

dotenv.config({ path: "../../.env" });

const db = drizzle({
	accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
	databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
	token: process.env.CLOUDFLARE_API_TOKEN!,
	schema,
});

const DATA_DIR = path.resolve("../../apps/web/public/datasets/uncleaned/-2024");

type SheetRow = (string | number | null)[];

function clean(value: unknown): string | null {
	if (value === null || value === undefined) return null;
	return String(value).trim();
}

function findRowIndex(marker: string, data: SheetRow[]): number {
	return data.findIndex((row) =>
		row.some((cell) => typeof cell === "string" && cell.includes(marker)),
	);
}

function parseHeadcounts(filePath: string) {
	const workbook = XLSX.readFile(filePath);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
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

	const yearRowIndex = findRowIndex("ACADEMIC YEAR", data);
	if (yearRowIndex === -1) return [];

	const yearHeaders = data[yearRowIndex];
	const subHeaders = data[yearRowIndex + 1];

	const combinedHeaders: {
		year: string;
		subCategory: string;
		colIndex: number;
	}[] = [];
	let currentYear = "";
	for (let i = 1; i < yearHeaders.length; i++) {
		const year = clean(yearHeaders[i]);
		if (year?.match(/\d{4}/)) {
			currentYear = year;
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
		const row = data[i];
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
	const fallWorkbook = XLSX.readFile(
		path.join(DATA_DIR, "enrollment-fall.xlsx"),
	);
	const springWorkbook = XLSX.readFile(
		path.join(DATA_DIR, "enrollment-spring.xlsx"),
	);

	const sheetDimensions = ["BY GENDER", "BY ETHNICITY", "BY STATE-COUNTRY"];
	const dimensionLabels = ["Gender", "Ethnicity", "State/Country"];

	const allData: EnrollmentRecord[] = [];
	for (const [i, sheetName] of sheetDimensions.entries()) {
		const dimension = dimensionLabels[i];
		if (fallWorkbook.Sheets[sheetName]) {
			allData.push(
				...parseEnrollmentSheet(fallWorkbook.Sheets[sheetName], dimension),
			);
		}
		if (springWorkbook.Sheets[sheetName]) {
			allData.push(
				...parseEnrollmentSheet(springWorkbook.Sheets[sheetName], dimension),
			);
		}
	}
	return allData;
}

async function seedHeadcounts() {
	const filePath = path.join(DATA_DIR, "headcounts.xlsx");
	const data = parseHeadcounts(filePath);
	console.log(`Parsed ${data.length} headcount records.`);

	for (const record of data) {
		await db
			.insert(schema.headcounts)
			.values(record)
			.onConflictDoUpdate({
				target: schema.headcounts.year,
				set: { count: sql`excluded.count` },
			});
	}
	console.log("Headcounts seeded.");
}

async function seedEnrollment() {
	const data = parseAllEnrollment();
	console.log(`Parsed ${data.length} enrollment records.`);

	await db.delete(schema.enrollment);
	await db.delete(schema.academicYears);

	const uniqueYears = [...new Set(data.map((r) => r.academicYear))];
	for (const year of uniqueYears) {
		await db
			.insert(schema.academicYears)
			.values({ year })
			.onConflictDoNothing();
	}
	console.log(`Seeded ${uniqueYears.length} academic years.`);

	const academicYears = await db.select().from(schema.academicYears);
	const yearMap = new Map(academicYears.map((y) => [y.year, y.id]));

	const BATCH_SIZE = 50;
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
			`Inserted enrollment batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(values.length / BATCH_SIZE)}`,
		);
	}
	console.log("Enrollment seeded.");
}

async function main() {
	console.log("Starting D1 seed...\n");

	await seedHeadcounts();
	console.log();
	await seedEnrollment();

	console.log("\nSeed complete.");
}

main().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
