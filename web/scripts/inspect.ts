import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

function inspectExcelFile(filePath: string) {
  try {
    console.log(`\nInspecting file: ${path.basename(filePath)}\n`);

    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`Error: File not found at ${absolutePath}`);
      return;
    }

    const workbook = XLSX.readFile(absolutePath);
    const sheetNames = workbook.SheetNames;

    console.log(
      `Found ${sheetNames.length} sheets: [${sheetNames.join(", ")}]\n`
    );

    sheetNames.forEach(sheetName => {
      console.log(`--- Sheet: "${sheetName}" ---`);
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as unknown[][];

      if (jsonData.length === 0) {
        console.log("Sheet is empty.\n");
        return;
      }

      const headers = jsonData[0] as string[];
      const dataRows = jsonData.slice(1, 6);

      console.log(`Headers: [${headers.join(", ")}]`);
      console.log("First 5 rows of data:");

      const dataAsObjects = dataRows.map(row => {
        const obj: { [key: string]: unknown } = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] !== undefined ? row[index] : null;
        });
        return obj;
      });

      console.log(JSON.stringify(dataAsObjects, null, 2));
      console.log("\n");
    });
  } catch (error) {
    console.error("An error occurred during file inspection:", error);
  }
}

const filePath = process.argv[2];

if (!filePath) {
  console.error("Please provide the path to the Excel file to inspect.");
  console.error("Usage: pnpm tsx web/scripts/inspect-data.ts <path-to-file>");
  process.exit(1);
}

inspectExcelFile(filePath);
