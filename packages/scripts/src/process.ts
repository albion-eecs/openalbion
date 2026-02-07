import * as fs from "node:fs";
import * as path from "node:path";
import { stringify as csvStringify } from "csv-stringify";
import * as XLSX from "xlsx";
import { js2xml } from "xml-js";

const UNCLEANED_DATA_DIR = path.resolve(
	process.cwd(),
	"public/datasets/uncleaned/-2024",
);
const CLEANED_DATA_DIR = path.resolve(process.cwd(), "public/datasets/cleaned");

async function writeCsv(data: unknown[], filePath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		csvStringify(data, { header: true }, (err, output) => {
			if (err) {
				return reject(err);
			}
			fs.writeFile(filePath, output, (err) => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

async function writeJson(data: unknown[], filePath: string): Promise<void> {
	const jsonContent = JSON.stringify(data, null, 2);
	await fs.promises.writeFile(filePath, jsonContent);
}

async function writeXml(
	data: unknown[],
	filePath: string,
	rootName: string,
): Promise<void> {
	const xmlContent = js2xml(
		{
			_declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
			[rootName]: {
				record: data,
			},
		},
		{ compact: true, spaces: 2 },
	);
	await fs.promises.writeFile(filePath, xmlContent);
}

async function processHeadcounts() {
	const filePath = path.join(UNCLEANED_DATA_DIR, "headcounts.xlsx");
	const workbook = XLSX.readFile(filePath);
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];
	const data = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as (string | number | null)[][];

	const headerIndex = data.findIndex((row) =>
		row.some(
			(cell) => typeof cell === "string" && cell.toUpperCase() === "YEAR",
		),
	);
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

	const outputCsv = path.join(CLEANED_DATA_DIR, "csv", "headcounts.csv");
	await writeCsv(results, outputCsv);
	console.log(`Successfully created ${outputCsv}`);

	const outputJson = path.join(CLEANED_DATA_DIR, "json", "headcounts.json");
	await writeJson(results, outputJson);
	console.log(`Successfully created ${outputJson}`);

	const outputXml = path.join(CLEANED_DATA_DIR, "xml", "headcounts.xml");
	await writeXml(results, outputXml, "headcounts");
	console.log(`Successfully created ${outputXml}`);
}

function clean(value: unknown): string | null {
	if (value === null || value === undefined) return null;
	return String(value).trim();
}

function findRowIndex(
	marker: string,
	data: (string | number | null)[][],
): number {
	return data.findIndex((row) =>
		row.some((cell) => typeof cell === "string" && cell.includes(marker)),
	);
}

interface ParsedResult {
	academicYear: string;
	primaryCategory: string;
	secondaryCategory: string;
	value: number;
	dimension: string;
	semester: string;
}

function parseEnrollmentSheet(
	worksheet: XLSX.WorkSheet,
	dimension: string,
	semester: "Fall" | "Spring",
): ParsedResult[] {
	const data = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as (string | number | null)[][];

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
					semester: semester,
				});
			}
		});
	}
	return results;
}

async function processEnrollment() {
	const fallFilePath = path.join(UNCLEANED_DATA_DIR, "enrollment-fall.xlsx");
	const springFilePath = path.join(
		UNCLEANED_DATA_DIR,
		"enrollment-spring.xlsx",
	);

	const fallWorkbook = XLSX.readFile(fallFilePath);
	const springWorkbook = XLSX.readFile(springFilePath);

	const allData: ParsedResult[] = [];

	const fallGender = parseEnrollmentSheet(
		fallWorkbook.Sheets["BY GENDER"],
		"Gender",
		"Fall",
	);
	allData.push(...fallGender);
	const fallEthnicity = parseEnrollmentSheet(
		fallWorkbook.Sheets["BY ETHNICITY"],
		"Ethnicity",
		"Fall",
	);
	allData.push(...fallEthnicity);
	const fallStateCountry = parseEnrollmentSheet(
		fallWorkbook.Sheets["BY STATE-COUNTRY"],
		"State/Country",
		"Fall",
	);
	allData.push(...fallStateCountry);

	const springGender = parseEnrollmentSheet(
		springWorkbook.Sheets["BY GENDER"],
		"Gender",
		"Spring",
	);
	allData.push(...springGender);
	const springEthnicity = parseEnrollmentSheet(
		springWorkbook.Sheets["BY ETHNICITY"],
		"Ethnicity",
		"Spring",
	);
	allData.push(...springEthnicity);
	const springStateCountry = parseEnrollmentSheet(
		springWorkbook.Sheets["BY STATE-COUNTRY"],
		"State/Country",
		"Spring",
	);
	allData.push(...springStateCountry);

	const outputCsv = path.join(CLEANED_DATA_DIR, "csv", "enrollment.csv");
	await writeCsv(allData, outputCsv);
	console.log(`Successfully created ${outputCsv}`);

	const outputJson = path.join(CLEANED_DATA_DIR, "json", "enrollment.json");
	await writeJson(allData, outputJson);
	console.log(`Successfully created ${outputJson}`);

	const outputXml = path.join(CLEANED_DATA_DIR, "xml", "enrollment.xml");
	await writeXml(allData, outputXml, "enrollment");
	console.log(`Successfully created ${outputXml}`);
}

async function main() {
	try {
		for (const format of ["csv", "json", "xml"]) {
			const dirPath = path.join(CLEANED_DATA_DIR, format);
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true });
			}
		}
		await processHeadcounts();
		await processEnrollment();
	} catch (error) {
		console.error("Error generating datasets:", error);
		process.exit(1);
	}
}

main();
