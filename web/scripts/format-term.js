const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");

// Path to the file
const filePath = path.join(
  process.cwd(),
  "public",
  "cleaned",
  "class_sizes.csv"
);
const outputPath = path.join(
  process.cwd(),
  "public",
  "cleaned",
  "class_sizes.csv"
);

// Function to convert term code to human-readable format
function convertTermCode(code) {
  if (!code || code === "-") return code;

  // Check if it's already in the desired format
  if (code.includes("-")) return code;

  // Extract year and term
  const year = code.substring(0, 4);
  const term = code.substring(4, 6);

  // Convert term code to semester name
  let semester;
  if (term === "10") {
    semester = "Spring";
  } else if (term === "30") {
    semester = "Fall";
  } else {
    semester = `Term-${term}`; // For any unusual term codes
  }

  return `${year}-${semester}`;
}

// Read and process the file
try {
  console.log(`Reading file: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Parse CSV
  const records = parse(fileContent, {
    columns: false,
    skip_empty_lines: true,
  });

  // Convert all term codes in the second column (index 1)
  const updatedRecords = records.map((row, index) => {
    // Skip the header row
    if (index === 0) return row;

    // Create a new row with converted term code
    const newRow = [...row];
    newRow[1] = convertTermCode(row[1]);
    return newRow;
  });

  // Write back to file
  const csvContent = stringify(updatedRecords);
  fs.writeFileSync(outputPath, csvContent);

  console.log(`Successfully updated term codes in: ${outputPath}`);
} catch (error) {
  console.error("Error converting term codes:", error);
}
