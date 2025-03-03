import db from './db';
import { randomBytes } from 'crypto';

export type PaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export const departmentService = {
  getAll: () => {
    return db.prepare('SELECT id, name FROM departments ORDER BY name').all();
  },
  
  getById: (id: number) => {
    return db.prepare('SELECT id, name FROM departments WHERE id = ?').get(id);
  }
};

export const headcountService = {
  getAll: (options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT id, year, headcount 
      FROM headcounts 
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(limit, offset);
    
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM headcounts').get() as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByYear: (year: number) => {
    return db.prepare('SELECT id, year, headcount FROM headcounts WHERE year = ?').get(year);
  },
  
  getByYearRange: (startYear: number, endYear: number, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT id, year, headcount 
      FROM headcounts 
      WHERE year BETWEEN ? AND ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(startYear, endYear, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM headcounts WHERE year BETWEEN ? AND ?';
    const totalCount = db.prepare(countQuery).get(startYear, endYear) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  }
};

export const classSizeService = {
  getAll: (options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'term', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT cs.id, d.name as department, cs.term, cs.average_class_size 
      FROM class_sizes cs
      JOIN departments d ON cs.department_id = d.id
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(limit, offset);
    
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM class_sizes').get() as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByDepartment: (departmentId: number, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'term', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT cs.id, d.name as department, cs.term, cs.average_class_size 
      FROM class_sizes cs
      JOIN departments d ON cs.department_id = d.id
      WHERE cs.department_id = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(departmentId, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM class_sizes WHERE department_id = ?';
    const totalCount = db.prepare(countQuery).get(departmentId) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByTerm: (term: string, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'department', 
      sortOrder = 'asc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT cs.id, d.name as department, cs.term, cs.average_class_size 
      FROM class_sizes cs
      JOIN departments d ON cs.department_id = d.id
      WHERE cs.term = ?
      ORDER BY ${sortBy === 'department' ? 'd.name' : sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(term, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM class_sizes WHERE term = ?';
    const totalCount = db.prepare(countQuery).get(term) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  }
};

export const facultyService = {
  getAll: (options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT fc.id, d.name as department, fc.appointment_type, fc.year, fc.count 
      FROM faculty fc
      JOIN departments d ON fc.department_id = d.id
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(limit, offset);
    
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM faculty').get() as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByDepartment: (departmentId: number, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT fc.id, d.name as department, fc.appointment_type, fc.year, fc.count 
      FROM faculty fc
      JOIN departments d ON fc.department_id = d.id
      WHERE fc.department_id = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(departmentId, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM faculty WHERE department_id = ?';
    const totalCount = db.prepare(countQuery).get(departmentId) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByYear: (year: string, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'department', 
      sortOrder = 'asc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT fc.id, d.name as department, fc.appointment_type, fc.year, fc.count 
      FROM faculty fc
      JOIN departments d ON fc.department_id = d.id
      WHERE fc.year = ?
      ORDER BY ${sortBy === 'department' ? 'd.name' : sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(year, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM faculty WHERE year = ?';
    const totalCount = db.prepare(countQuery).get(year) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByAppointmentType: (appointmentType: string, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT fc.id, d.name as department, fc.appointment_type, fc.year, fc.count 
      FROM faculty fc
      JOIN departments d ON fc.department_id = d.id
      WHERE fc.appointment_type = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(appointmentType, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM faculty WHERE appointment_type = ?';
    const totalCount = db.prepare(countQuery).get(appointmentType) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  }
};

export const enrollmentService = {
  getAll: (options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'academic_year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT id, academic_year, category, subcategory, full_time, part_time 
      FROM enrollment_report 
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(limit, offset);
    
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM enrollment_report').get() as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByAcademicYear: (academicYear: string, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'category', 
      sortOrder = 'asc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT id, academic_year, category, subcategory, full_time, part_time 
      FROM enrollment_report 
      WHERE academic_year = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(academicYear, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM enrollment_report WHERE academic_year = ?';
    const totalCount = db.prepare(countQuery).get(academicYear) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  },
  
  getByCategory: (category: string, options: PaginationOptions = {}) => {
    const { 
      page = 1, 
      limit = 100, 
      sortBy = 'academic_year', 
      sortOrder = 'desc' 
    } = options;
    
    const offset = (page - 1) * limit;
    
    const query = `
      SELECT id, academic_year, category, subcategory, full_time, part_time 
      FROM enrollment_report 
      WHERE category = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
    
    const data = db.prepare(query).all(category, limit, offset);
    
    const countQuery = 'SELECT COUNT(*) as count FROM enrollment_report WHERE category = ?';
    const totalCount = db.prepare(countQuery).get(category) as { count: number };
    
    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    };
  }
};

export const apiKeyService = {
  generateApiKey: () => {
    return randomBytes(32).toString('hex');
  },
  
  createApiKey: (userId: string, name: string, expiresInDays?: number) => {
    const apiKey = apiKeyService.generateApiKey();
    const createdAt = Math.floor(Date.now() / 1000);
    const expiresAt = expiresInDays ? createdAt + (expiresInDays * 86400) : null;
    
    const stmt = db.prepare(`
      INSERT INTO api_keys (user_id, api_key, name, created_at, expires_at, is_active)
      VALUES (?, ?, ?, ?, ?, 1)
    `);
    
    const result = stmt.run(userId, apiKey, name, createdAt, expiresAt);
    
    if (result.changes === 1) {
      return {
        id: result.lastInsertRowid,
        userId,
        apiKey,
        name,
        createdAt,
        expiresAt,
        isActive: true
      };
    }
    
    return null;
  },
  
  getApiKeysByUserId: (userId: string) => {
    return db.prepare(`
      SELECT id, user_id as userId, api_key as apiKey, name, 
             created_at as createdAt, expires_at as expiresAt, 
             last_used_at as lastUsedAt, is_active as isActive
      FROM api_keys
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(userId);
  },
  
  validateApiKey: (apiKey: string) => {
    const key = db.prepare(`
      SELECT id, user_id as userId, api_key as apiKey, name, 
             created_at as createdAt, expires_at as expiresAt, 
             last_used_at as lastUsedAt, is_active as isActive
      FROM api_keys
      WHERE api_key = ? AND is_active = 1
    `).get(apiKey) as any;
    
    if (!key) return null;
    
    const now = Math.floor(Date.now() / 1000);
    
    if (key.expiresAt && key.expiresAt < now) {
      db.prepare('UPDATE api_keys SET is_active = 0 WHERE id = ?').run(key.id);
      return null;
    }
    
    db.prepare('UPDATE api_keys SET last_used_at = ? WHERE id = ?').run(now, key.id);
    
    return key;
  },
  
  revokeApiKey: (id: number, userId: string) => {
    const stmt = db.prepare('UPDATE api_keys SET is_active = 0 WHERE id = ? AND user_id = ?');
    const result = stmt.run(id, userId);
    return result.changes === 1;
  },
  
  deleteApiKey: (id: number, userId: string) => {
    const stmt = db.prepare('DELETE FROM api_keys WHERE id = ? AND user_id = ?');
    const result = stmt.run(id, userId);
    return result.changes === 1;
  }
};