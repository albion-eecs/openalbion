import * as path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as XLSX from "xlsx";
import * as schema from "../../db/schema";

type SheetRow = (string | number | null)[];
type SheetData = SheetRow[];

function clean(value: unknown): string | null {
	if (value === null || value === undefined) return null;
	return String(value).trim();
}

function findRowIndex(marker: string, data: SheetData): number {
	return data.findIndex((row) =>
		row.some((cell) => typeof cell === "string" && cell.includes(marker)),
	);
}

interface CombinedHeader {
	year: string;
	subCategory: string;
	colIndex: number;
}

interface ParsedResult {
	academicYear: string;
	primaryCategory: string;
	secondaryCategory: string;
	value: number;
	dimension: string;
}

function parseComplexSheet(
	worksheet: XLSX.WorkSheet,
	dimension: string,
): ParsedResult[] {
	const data = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as SheetData;

	const yearRowIndex = findRowIndex("ACADEMIC YEAR", data);
	if (yearRowIndex === -1) return [];
	const yearHeaders = data[yearRowIndex];

	const subHeaders = data[yearRowIndex + 1];

	const combinedHeaders: CombinedHeader[] = [];
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
				subCategory: subCategory,
				colIndex: i,
			});
		}
	}

	const dataStartRow = yearRowIndex + 2;

	const results: ParsedResult[] = [];
	for (let i = dataStartRow; i < data.length; i++) {
		const row = data[i];
		const primaryCategory = clean(row[0]);

		if (!primaryCategory || primaryCategory.toLowerCase().includes("total")) {
			continue;
		}

		combinedHeaders.forEach((header) => {
			const value = row[header.colIndex];
			if (value !== null && value !== undefined && value !== "-") {
				results.push({
					academicYear: header.year,
					primaryCategory: primaryCategory,
					secondaryCategory: header.subCategory,
					value: Number(String(value).replace(/,/g, "")) || 0,
					dimension: dimension,
				});
			}
		});
	}
	return results;
}

async function seedSpringEnrollment(filePath: string) {
	if (!filePath) {
		throw new Error("File path must be provided.");
	}
	const dbPath = path.resolve(process.cwd(), "db/sqlite.db");
	const sqlite = new Database(dbPath);
	const db = drizzle(sqlite, { schema });

	const workbook = XLSX.readFile(filePath);
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];

	const sheetJson = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as string[][];
	const sheetContent = JSON.stringify(sheetJson);
	let dimension = "Unknown";
	if (sheetContent.includes("BY GENDER")) {
		dimension = "Gender";
	} else if (sheetContent.includes("BY ETHNICITY")) {
		dimension = "Ethnicity";
	} else if (sheetContent.includes("BY STATE-COUNTRY")) {
		dimension = "State/Country";
	}

	console.log(
		`Parsing spring enrollment data (detected dimension: ${dimension})...`,
	);
	const parsedData = parseComplexSheet(worksheet, dimension);
	console.log(`Found ${parsedData.length} records.`);

	if (parsedData.length > 0) {
		const years = [...new Set(parsedData.map((p) => p.academicYear))];
		for (const year of years) {
			await db
				.insert(schema.academicYears)
				.values({ year })
				.onConflictDoNothing();
		}

		const academicYearsFromDb = await db.select().from(schema.academicYears);
		const yearMap = new Map(academicYearsFromDb.map((y) => [y.year, y.id]));

		const valuesToInsert = parsedData.map((p) => ({
			academicYearId: yearMap.get(p.academicYear)!,
			dimension: p.dimension,
			primaryCategory: p.primaryCategory,
			secondaryCategory: p.secondaryCategory,
			value: p.value,
		}));

		console.log("Seeding spring enrollment data into the database...");

		const batchSize = 100;
		for (let i = 0; i < valuesToInsert.length; i += batchSize) {
			const batch = valuesToInsert.slice(i, i + batchSize);
			await db.insert(schema.enrollment).values(batch);
			console.log(`Inserted batch ${i / batchSize + 1}`);
		}

		console.log("Seeding complete.");
	}
}

const filePath = process.argv[2];
seedSpringEnrollment(filePath).catch((error) => {
	console.error("Error seeding spring enrollment:", error);
	process.exit(1);
});
