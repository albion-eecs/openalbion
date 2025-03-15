import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const dbPath = process.env.SQLITE_DB_PATH || 
  (process.env.NODE_ENV === 'production' ? '/app/data/sqlite.db' : path.join(process.cwd(), 'sqlite.db'));

let dbInstance: Database.Database | null = null;

function initializeDb() {
  if (dbInstance) return dbInstance;
  
  try {
    if (process.env.NODE_ENV === 'production') {
      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
    }
    
    dbInstance = new Database(dbPath);
    dbInstance.pragma('foreign_keys = ON');
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return null;
  }
}

function withDb<T>(operation: (db: Database.Database) => T): T | null {
  const db = initializeDb();
  if (!db) return null;
  try {
    return operation(db);
  } catch (error) {
    console.error('Database operation failed:', error);
    return null;
  }
}

export function setupDatabase() {
  console.log('Setting up database...');

  try {
    const db = initializeDb();
    if (!db) {
      throw new Error('Failed to initialize database');
    }
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      )
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS headcounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER NOT NULL,
        headcount INTEGER,
        UNIQUE(year)
      )
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS class_sizes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        department_id INTEGER NOT NULL,
        term TEXT NOT NULL,
        average_class_size REAL NOT NULL,
        FOREIGN KEY (department_id) REFERENCES departments(id),
        UNIQUE(department_id, term)
      )
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS faculty (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        department_id INTEGER NOT NULL,
        appointment_type TEXT NOT NULL,
        year TEXT NOT NULL,
        count REAL NOT NULL,
        FOREIGN KEY (department_id) REFERENCES departments(id),
        UNIQUE(department_id, appointment_type, year)
      )
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS enrollment_report (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        academic_year TEXT NOT NULL,
        category TEXT,
        subcategory TEXT,
        full_time INTEGER NOT NULL,
        part_time INTEGER NOT NULL,
        UNIQUE(academic_year, category, subcategory)
      )
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS api_keys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        api_key TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        expires_at INTEGER,
        last_used_at INTEGER,
        is_active BOOLEAN NOT NULL DEFAULT 1
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS user_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        resource_type TEXT,
        resource_id TEXT,
        details TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at INTEGER NOT NULL
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS api_calls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        api_key_id INTEGER,
        endpoint TEXT NOT NULL,
        method TEXT NOT NULL,
        status_code INTEGER,
        response_time INTEGER,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE SET NULL
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id TEXT PRIMARY KEY,
        api_usage_alerts BOOLEAN NOT NULL DEFAULT 1,
        security_alerts BOOLEAN NOT NULL DEFAULT 1,
        data_update_alerts BOOLEAN NOT NULL DEFAULT 1,
        updated_at INTEGER NOT NULL
      )
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_headcounts_year ON headcounts(year);
      CREATE INDEX IF NOT EXISTS idx_class_sizes_department ON class_sizes(department_id);
      CREATE INDEX IF NOT EXISTS idx_class_sizes_term ON class_sizes(term);
      CREATE INDEX IF NOT EXISTS idx_faculty_dept_year ON faculty(department_id, year);
      CREATE INDEX IF NOT EXISTS idx_enrollment_academic_year ON enrollment_report(academic_year);
      CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);
      CREATE INDEX IF NOT EXISTS idx_api_keys_api_key ON api_keys(api_key);
      CREATE INDEX IF NOT EXISTS idx_user_logs_user_id ON user_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_logs_created_at ON user_logs(created_at);
      CREATE INDEX IF NOT EXISTS idx_api_calls_user_id ON api_calls(user_id);
      CREATE INDEX IF NOT EXISTS idx_api_calls_api_key_id ON api_calls(api_key_id);
      CREATE INDEX IF NOT EXISTS idx_api_calls_created_at ON api_calls(created_at);
    `);
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}
function parseCSV(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
}

export function importDepartments(dataDir: string) {
  console.log('Importing departments...');
  
  const departments = new Set<string>();
  
  const classSizes = parseCSV(path.join(dataDir, 'class_sizes.csv'));
  classSizes.forEach((row: any) => {
    if (row.Department) departments.add(row.Department);
  });
  
  const faculty = parseCSV(path.join(dataDir, 'faculty_characteristics.csv'));
  faculty.forEach((row: any) => {
    if (row.Department) departments.add(row.Department);
  });
  
  withDb(db => {
    const stmt = db.prepare('INSERT OR IGNORE INTO departments (name) VALUES (?)');
    const insertMany = db.transaction((items: string[]) => {
      for (const item of items) {
        stmt.run(item);
      }
    });
    
    insertMany(Array.from(departments));
    console.log(`Imported ${departments.size} departments`);
  });
}

export function importHeadcounts(dataDir: string) {
  console.log('Importing headcounts...');
  
  const headcounts = parseCSV(path.join(dataDir, 'headcounts.csv'));
  withDb(db => {
    const stmt = db.prepare('INSERT OR REPLACE INTO headcounts (year, headcount) VALUES (?, ?)');
    
    let count = 0;
    for (const row of headcounts) {
      const year = parseInt(row.Year, 10);
      const headcount = row.Headcount !== '-' ? parseInt(row.Headcount, 10) : null;
      
      if (!isNaN(year)) {
        stmt.run(year, headcount);
        count++;
      }
    }
    
    console.log(`Imported ${count} headcount records`);
  });
}

export function importClassSizes(dataDir: string) {
  console.log('Importing class sizes...');
  
  const classSizes = parseCSV(path.join(dataDir, 'class_sizes.csv'));
  
  withDb(db => {
    const getDeptId = db.prepare('SELECT id FROM departments WHERE name = ?');
    const stmt = db.prepare('INSERT OR REPLACE INTO class_sizes (department_id, term, average_class_size) VALUES (?, ?, ?)');
    
    let count = 0;
    for (const row of classSizes) {
      const deptResult = getDeptId.get(row.Department);
      const deptId = deptResult ? (deptResult as { id: number }).id : null;
      
      if (deptId && row.Term && row['Average Class Size']) {
        const avgClassSize = parseFloat(row['Average Class Size']);
        if (!isNaN(avgClassSize)) {
          stmt.run(deptId, row.Term, avgClassSize);
          count++;
        }
      }
    }
    
    console.log(`Imported ${count} class size records`);
  });
}

export function importFaculty(dataDir: string) {
  console.log('Importing faculty data...');
  
  const faculty = parseCSV(path.join(dataDir, 'faculty_characteristics.csv'));
  
  withDb(db => {
    const getDeptId = db.prepare('SELECT id FROM departments WHERE name = ?');
    const stmt = db.prepare(
      'INSERT OR REPLACE INTO faculty (department_id, appointment_type, year, count) VALUES (?, ?, ?, ?)'
    );
    
    let count = 0;
    for (const row of faculty) {
      const deptResult = getDeptId.get(row.Department);
      const deptId = deptResult ? (deptResult as { id: number }).id : null;
      
      if (deptId && row['Appointment Type'] && row.Year && row.Count) {
        const facultyCount = parseFloat(row.Count);
        if (!isNaN(facultyCount)) {
          stmt.run(deptId, row['Appointment Type'], row.Year, facultyCount);
          count++;
        }
      }
    }
    
    console.log(`Imported ${count} faculty records`);
  });
}

export function importEnrollmentReport(dataDir: string) {
  console.log('Importing enrollment report...');
  
  const enrollments = parseCSV(path.join(dataDir, 'enrollment_report.csv'));
  
  withDb(db => {
    const stmt = db.prepare(
      'INSERT OR REPLACE INTO enrollment_report (academic_year, category, subcategory, full_time, part_time) VALUES (?, ?, ?, ?, ?)'
    );
    
    let count = 0;
    for (const row of enrollments) {
      if (row['Academic Year']) {
        const fullTime = parseInt(row['Full Time'] || '0', 10) || 0;
        const partTime = parseInt(row['Part Time'] || '0', 10) || 0;
        
        stmt.run(
          row['Academic Year'], 
          row.Category || null, 
          row.Subcategory || null, 
          fullTime, 
          partTime
        );
        count++;
      }
    }
    
    console.log(`Imported ${count} enrollment report records`);
  });
}

export async function importAllData(dataDir: string) {
  console.log('Starting data import process...');
  
  try {
    importDepartments(dataDir);
    importHeadcounts(dataDir);
    importClassSizes(dataDir);
    importFaculty(dataDir);
    importEnrollmentReport(dataDir);
    
    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
}

const isDirectlyExecuted = () => {
  try {
    return process.argv[1] === fileURLToPath(import.meta.url);
  } catch (e) {
    return require.main === module;
  }
};

if (isDirectlyExecuted()) {
  const command = process.argv[2]?.toLowerCase();
  
  if (command === 'setup') {
    setupDatabase();
    console.log('Database schema has been set up successfully');
  } else if (command === 'import') {
    const dataDir = path.join(process.cwd(), 'public', 'cleaned');
    
    if (!fs.existsSync(dataDir)) {
      console.error(`Data directory not found: ${dataDir}`);
      process.exit(1);
    }
    
    setupDatabase();
    importAllData(dataDir);
  } else {
    console.error(`Command required: 'setup' or 'import'`);
    process.exit(1);
  }
}

process.on('exit', () => {
  if (dbInstance) {
    dbInstance.close();
  }
});

const db = {
  prepare: (sql: string) => {
    return withDb(db => db.prepare(sql)) || {
      get: () => null,
      all: () => [],
      run: () => null
    };
  },
  exec: (sql: string) => {
    return withDb(db => db.exec(sql));
  },
  transaction: (fn: (db: Database.Database) => void) => {
    return withDb(db => db.transaction(fn));
  }
};

export default db;