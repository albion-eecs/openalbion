const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

// Directory paths
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'cleaned');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Main function to process all CSV files
 */
async function cleanAllCSVFiles() {
  try {
    // Get all CSV files from public directory
    const files = fs.readdirSync(PUBLIC_DIR)
      .filter(file => file.endsWith('.csv'));
    
    console.log(`Found ${files.length} CSV files to process`);
    
    // Process each file
    for (const file of files) {
      console.log(`Processing: ${file}`);
      await cleanCSVFile(file);
    }
    
    console.log('All files processed successfully');
  } catch (error) {
    console.error('Error processing CSV files:', error);
  }
}

/**
 * Clean a single CSV file
 */
async function cleanCSVFile(fileName) {
  try {
    const filePath = path.join(PUBLIC_DIR, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Clean up potential Excel/CSV formatting issues
    // Remove BOM if present
    let cleanedContent = fileContent.replace(/^\uFEFF/, '');
    
    // Parse CSV content
    const records = parse(cleanedContent, {
      columns: false,
      skip_empty_lines: true,
      relax_quotes: true,
      relax_column_count: true,
    });
    
    // Apply specific cleaning based on file type
    let processedData;
    
    if (fileName.includes('HEADCOUNTS_SINCE')) {
      processedData = cleanHeadcountsData(records);
    } else if (fileName.includes('Faculty_Characteristics')) {
      processedData = cleanFacultyData(records);
    } else if (fileName.includes('ENROLLMENTS')) {
      processedData = cleanEnrollmentData(records);
    } else if (fileName.includes('Class_Sizes')) {
      processedData = cleanClassSizeData(records);
    } else {
      processedData = cleanGenericData(records);
    }
    
    // Write cleaned data to output file
    const outputPath = path.join(OUTPUT_DIR, `CLEAN_${fileName}`);
    
    fs.writeFileSync(outputPath, stringify(processedData, {
      header: false,
    }));
    
    console.log(`✅ Successfully cleaned: ${fileName}`);
  } catch (error) {
    console.error(`Error cleaning ${fileName}:`, error);
  }
}

/**
 * Clean headcount data (year/count format)
 */
function cleanHeadcountsData(data) {
  // Find the header row
  const headerIndex = data.findIndex(row => row[0] === 'YEAR');
  
  if (headerIndex === -1) {
    // If we can't find the header, just return a best-effort cleaned version
    return data.filter(row => row.some(Boolean));
  }
  
  // Extract and clean the data
  const headerRow = ['Year', 'Headcount'];
  const cleanedData = [headerRow];
  
  data.slice(headerIndex + 1)
    .filter(row => row.length >= 2 && row[0] && !isNaN(parseInt(row[0], 10)))
    .forEach(row => {
      cleanedData.push([
        row[0].trim(), // Year
        row[1] ? row[1].trim() : '' // Headcount
      ]);
    });
  
  return cleanedData;
}

/**
 * Clean faculty data
 */
function cleanFacultyData(data) {
  // Find the header row with years
  const headerIndex = data.findIndex(row => row[0] === 'DEPT' && row[1] === 'APPT');
  
  if (headerIndex === -1) {
    return data.filter(row => row.some(Boolean));
  }
  
  // Clean the year headers (replace newlines)
  const headerRow = data[headerIndex].map(col => 
    col ? col.replace(/\n/g, ' ').trim() : ''
  );
  
  // Create a clean data structure
  const cleanedData = [['Department', 'Appointment Type', 'Year', 'Count']];
  let currentDept = '';
  
  data.slice(headerIndex + 1)
    .filter(row => row.length >= 3)
    .forEach(row => {
      // Update department if available
      if (row[0] && row[0].trim()) {
        currentDept = row[0].trim();
      }
      
      const appointmentType = row[1] ? row[1].trim() : '';
      if (!appointmentType) return; // Skip rows without appointment type
      
      // For each year/value pair
      for (let i = 2; i < headerRow.length; i++) {
        if (headerRow[i] && row[i]) {
          cleanedData.push([
            currentDept,
            appointmentType,
            headerRow[i],
            row[i].toString().trim()
          ]);
        }
      }
    });
  
  return cleanedData;
}

/**
 * Clean enrollment data
 */
function cleanEnrollmentData(data) {
  // Find the academic year row
  const yearRowIndex = data.findIndex(row => row[0] === 'ACADEMIC YEAR');
  
  if (yearRowIndex === -1) {
    return data.filter(row => row.some(Boolean));
  }
  
  // Extract years and clean the header
  const yearRow = data[yearRowIndex];
  const years = yearRow.slice(1).filter(Boolean).map(year => year.trim());
  
  // Create new headers for the cleaned data
  const cleanedData = [['Academic Year', 'Category', 'Subcategory', 'Full Time', 'Part Time']];
  let currentCategory = '';
  
  // Extract data, starting from the row after the headers (which is Full-Time, Part-Time)
  data.slice(yearRowIndex + 2)
    .filter(row => row[0])
    .forEach(row => {
      // Check if this is a main category
      if (row[0].trim().endsWith(':')) {
        currentCategory = row[0].trim().replace(':', '');
        return;
      }
      
      const subcategory = row[0].trim();
      
      // Extract data for each year
      for (let yearIdx = 0; yearIdx < years.length; yearIdx++) {
        const dataStartIdx = 1 + (yearIdx * 2); // Adjusted for Full-Time, Part-Time columns
        
        if (dataStartIdx < row.length && (row[dataStartIdx] || row[dataStartIdx + 1])) {
          cleanedData.push([
            years[yearIdx],
            currentCategory,
            subcategory,
            row[dataStartIdx] ? row[dataStartIdx].toString().trim() : '0',
            row[dataStartIdx + 1] ? row[dataStartIdx + 1].toString().trim() : '0'
          ]);
        }
      }
    });
  
  return cleanedData;
}

/**
 * Clean class size data
 */
function cleanClassSizeData(data) {
  // Find the header row with semester codes
  const headerRowIndex = data.findIndex(row => row[0] === 'DEPT');
  
  if (headerRowIndex === -1) {
    return data.filter(row => row.some(Boolean));
  }
  
  const headerRow = data[headerRowIndex];
  const terms = headerRow.slice(1, -1); // Skip the 'DEPT' and 'Average' columns
  
  // Create new headers for the cleaned data
  const cleanedData = [['Department', 'Term', 'Average Class Size']];
  
  // Process department data
  data.slice(headerRowIndex + 1)
    .filter(row => row.length >= 2 && row[0] && row[0] !== 'Average')
    .forEach(row => {
      const dept = row[0];
      // Skip summary or header rows
      if (!dept || dept.includes('*') || dept.trim() === '') return;
      
      // Add each term's data
      for (let i = 0; i < terms.length; i++) {
        if (terms[i] && row[i + 1]) {
          cleanedData.push([
            dept.trim(),
            terms[i].toString().trim(),
            row[i + 1].toString().trim()
          ]);
        }
      }
    });
  
  return cleanedData;
}

/**
 * Generic data cleaning for other CSV files
 */
function cleanGenericData(data) {
  // Remove completely empty rows
  const nonEmptyRows = data.filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== ''));
  
  if (nonEmptyRows.length === 0) {
    return []; // No data to process
  }
  
  // Attempt to find header row (usually first or second row)
  let headerRowIndex = 0;
  
  // If second row has more non-empty cells, it's probably the header
  if (nonEmptyRows.length > 1 && 
      nonEmptyRows[1].filter(Boolean).length > nonEmptyRows[0].filter(Boolean).length) {
    headerRowIndex = 1;
  }
  
  // Clean header row (remove newlines, trailing/leading whitespace)
  const headerRow = nonEmptyRows[headerRowIndex].map(header => 
    header ? header.replace(/\n/g, ' ').trim() : ''
  );
  
  // Get maximum number of columns in any row to ensure consistent column count
  const maxColumns = Math.max(...nonEmptyRows.map(row => row.length));
  
  // Ensure header has enough columns
  while (headerRow.length < maxColumns) {
    headerRow.push(`Column_${headerRow.length + 1}`);
  }
  
  // Clean data rows (skip header row)
  const cleanedData = [headerRow];
  
  nonEmptyRows.slice(headerRowIndex + 1).forEach(row => {
    // Clean each cell in the row
    const cleanedRow = row.map(cell => 
      cell !== null && cell !== undefined ? String(cell).trim() : ''
    );
    
    // Ensure each row has the same number of columns as the header
    while (cleanedRow.length < headerRow.length) {
      cleanedRow.push('');
    }
    
    cleanedData.push(cleanedRow);
  });
  
  return cleanedData;
}

// Run the script
cleanAllCSVFiles().catch(console.error); 