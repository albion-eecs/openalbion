import db from "./db";
import { randomBytes } from "crypto";

export type PaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const departmentService = {
  getAll: () => {
    return db.prepare("SELECT id, name FROM departments ORDER BY name").all();
  },

  getById: (id: number) => {
    return db.prepare("SELECT id, name FROM departments WHERE id = ?").get(id);
  },
};

export const headcountService = {
  getAll: (options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "year",
      sortOrder = "desc",
    } = options;

    const offset = (page - 1) * limit;

    const query = `
      SELECT id, year, headcount 
      FROM headcounts 
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(query).all(limit, offset);

    const totalCount = db
      .prepare("SELECT COUNT(*) as count FROM headcounts")
      .get() as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByYear: (year: number) => {
    return db
      .prepare("SELECT id, year, headcount FROM headcounts WHERE year = ?")
      .get(year);
  },

  getByYearRange: (
    startYear: number,
    endYear: number,
    options: PaginationOptions = {}
  ) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "year",
      sortOrder = "desc",
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

    const countQuery =
      "SELECT COUNT(*) as count FROM headcounts WHERE year BETWEEN ? AND ?";
    const totalCount = db.prepare(countQuery).get(startYear, endYear) as {
      count: number;
    };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },
};

export const classSizeService = {
  getAll: (options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "term",
      sortOrder = "desc",
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

    const totalCount = db
      .prepare("SELECT COUNT(*) as count FROM class_sizes")
      .get() as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByDepartment: (departmentId: number, options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "term",
      sortOrder = "desc",
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

    const countQuery =
      "SELECT COUNT(*) as count FROM class_sizes WHERE department_id = ?";
    const totalCount = db.prepare(countQuery).get(departmentId) as {
      count: number;
    };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByTerm: (term: string, options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "department",
      sortOrder = "asc",
    } = options;

    const offset = (page - 1) * limit;

    const query = `
      SELECT cs.id, d.name as department, cs.term, cs.average_class_size 
      FROM class_sizes cs
      JOIN departments d ON cs.department_id = d.id
      WHERE cs.term = ?
      ORDER BY ${sortBy === "department" ? "d.name" : sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(query).all(term, limit, offset);

    const countQuery =
      "SELECT COUNT(*) as count FROM class_sizes WHERE term = ?";
    const totalCount = db.prepare(countQuery).get(term) as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },
};

export const facultyService = {
  getAll: (options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "year",
      sortOrder = "desc",
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

    const totalCount = db
      .prepare("SELECT COUNT(*) as count FROM faculty")
      .get() as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByDepartment: (departmentId: number, options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "year",
      sortOrder = "desc",
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

    const countQuery =
      "SELECT COUNT(*) as count FROM faculty WHERE department_id = ?";
    const totalCount = db.prepare(countQuery).get(departmentId) as {
      count: number;
    };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByYear: (year: string, options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "department",
      sortOrder = "asc",
    } = options;

    const offset = (page - 1) * limit;

    const query = `
      SELECT fc.id, d.name as department, fc.appointment_type, fc.year, fc.count 
      FROM faculty fc
      JOIN departments d ON fc.department_id = d.id
      WHERE fc.year = ?
      ORDER BY ${sortBy === "department" ? "d.name" : sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(query).all(year, limit, offset);

    const countQuery = "SELECT COUNT(*) as count FROM faculty WHERE year = ?";
    const totalCount = db.prepare(countQuery).get(year) as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByAppointmentType: (
    appointmentType: string,
    options: PaginationOptions = {}
  ) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "year",
      sortOrder = "desc",
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

    const countQuery =
      "SELECT COUNT(*) as count FROM faculty WHERE appointment_type = ?";
    const totalCount = db.prepare(countQuery).get(appointmentType) as {
      count: number;
    };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },
};

export const enrollmentService = {
  getAll: (options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "academic_year",
      sortOrder = "desc",
    } = options;

    const offset = (page - 1) * limit;

    const query = `
      SELECT id, academic_year, category, subcategory, full_time, part_time 
      FROM enrollment_report 
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(query).all(limit, offset);

    const totalCount = db
      .prepare("SELECT COUNT(*) as count FROM enrollment_report")
      .get() as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByAcademicYear: (
    academicYear: string,
    options: PaginationOptions = {}
  ) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "category",
      sortOrder = "asc",
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

    const countQuery =
      "SELECT COUNT(*) as count FROM enrollment_report WHERE academic_year = ?";
    const totalCount = db.prepare(countQuery).get(academicYear) as {
      count: number;
    };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getByCategory: (category: string, options: PaginationOptions = {}) => {
    const {
      page = 1,
      limit = 100,
      sortBy = "academic_year",
      sortOrder = "desc",
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

    const countQuery =
      "SELECT COUNT(*) as count FROM enrollment_report WHERE category = ?";
    const totalCount = db.prepare(countQuery).get(category) as {
      count: number;
    };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },
};

export const apiKeyService = {
  generateApiKey: () => {
    return randomBytes(32).toString("hex");
  },

  createApiKey: (userId: string, name: string, expiresInDays?: number) => {
    try {
      const apiKey = apiKeyService.generateApiKey();
      const createdAt = Math.floor(Date.now() / 1000);
      const expiresAt = expiresInDays
        ? createdAt + expiresInDays * 86400
        : null;

      const stmt = db.prepare(`
        INSERT INTO api_keys (user_id, api_key, name, created_at, expires_at, is_active)
        VALUES (?, ?, ?, ?, ?, 1)
      `);

      const result = stmt.run(userId, apiKey, name, createdAt, expiresAt);

      if (result && result.changes === 1) {
        return {
          id: result.lastInsertRowid,
          userId,
          apiKey,
          name,
          createdAt,
          expiresAt,
          lastUsedAt: null,
          isActive: true,
        };
      }

      return null;
    } catch (error) {
      console.error("Error creating API key:", error);
      return null;
    }
  },

  getApiKeysByUserId: (userId: string) => {
    return db
      .prepare(
        `
      SELECT id, user_id as userId, api_key as apiKey, name, 
             created_at as createdAt, expires_at as expiresAt, 
             last_used_at as lastUsedAt, is_active as isActive
      FROM api_keys
      WHERE user_id = ?
      ORDER BY created_at DESC
    `
      )
      .all(userId);
  },

  validateApiKey: (apiKey: string) => {
    const key = db
      .prepare(
        `
      SELECT id, user_id as userId, api_key as apiKey, name, 
             created_at as createdAt, expires_at as expiresAt, 
             last_used_at as lastUsedAt, is_active as isActive
      FROM api_keys
      WHERE api_key = ? AND is_active = 1
    `
      )
      .get(apiKey) as
      | {
          id: number;
          userId: string;
          apiKey: string;
          name: string;
          createdAt: number;
          expiresAt: number | null;
          lastUsedAt: number | null;
          isActive: boolean;
        }
      | undefined;

    if (!key) return null;

    const now = Math.floor(Date.now() / 1000);

    if (key.expiresAt && key.expiresAt < now) {
      db.prepare("UPDATE api_keys SET is_active = 0 WHERE id = ?").run(key.id);
      return null;
    }

    db.prepare("UPDATE api_keys SET last_used_at = ? WHERE id = ?").run(
      now,
      key.id
    );

    return key;
  },

  revokeApiKey: (id: number, userId: string) => {
    const stmt = db.prepare(
      "UPDATE api_keys SET is_active = 0 WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(id, userId);
    return result && result.changes === 1;
  },

  unrevokeApiKey: (id: number, userId: string) => {
    const stmt = db.prepare(
      "UPDATE api_keys SET is_active = 1 WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(id, userId);
    return result && result.changes === 1;
  },

  deleteApiKey: (id: number, userId: string) => {
    const stmt = db.prepare(
      "DELETE FROM api_keys WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(id, userId);
    return result && result.changes === 1;
  },
};

export const userLogService = {
  createLog: (logData: {
    userId: string;
    action: string;
    resourceType?: string;
    resourceId?: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
  }) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);

    const stmt = db.prepare(`
      INSERT INTO user_logs (
        user_id, action, resource_type, resource_id, details, 
        ip_address, user_agent, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      logData.userId,
      logData.action,
      logData.resourceType || null,
      logData.resourceId || null,
      logData.details || null,
      logData.ipAddress || null,
      logData.userAgent || null,
      now
    );

    return result ? result.lastInsertRowid : null;
  },

  getLogsByUserId: (userId: string, options: PaginationOptions = {}) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      };
    }

    const {
      page = 1,
      limit = 20,
      sortBy = "created_at",
      sortOrder = "desc",
    } = options;

    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        id, user_id as userId, action, resource_type as resourceType,
        resource_id as resourceId, details, ip_address as ipAddress,
        user_agent as userAgent, created_at as createdAt
      FROM user_logs
      WHERE user_id = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(query).all(userId, limit, offset);

    const countQuery =
      "SELECT COUNT(*) as count FROM user_logs WHERE user_id = ?";
    const totalCount = db.prepare(countQuery).get(userId) as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getRecentUserActivities: (userId: string, limit: number = 5) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return [];
    }

    const query = `
      SELECT 
        id, user_id as userId, action, resource_type as resourceType,
        resource_id as resourceId, details, created_at as createdAt
      FROM user_logs
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `;

    return db.prepare(query).all(userId, limit);
  },
};

export const apiCallService = {
  recordApiCall: (callData: {
    userId: string;
    apiKeyId?: number;
    endpoint: string;
    method: string;
    statusCode?: number;
    responseTime?: number;
  }) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);

    const stmt = db.prepare(`
      INSERT INTO api_calls (
        user_id, api_key_id, endpoint, method, 
        status_code, response_time, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      callData.userId,
      callData.apiKeyId || null,
      callData.endpoint,
      callData.method,
      callData.statusCode || null,
      callData.responseTime || null,
      now
    );

    return result ? result.lastInsertRowid : null;
  },

  getApiCallsByUserId: (userId: string, options: PaginationOptions = {}) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      };
    }

    const {
      page = 1,
      limit = 20,
      sortBy = "created_at",
      sortOrder = "desc",
    } = options;

    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        id, user_id as userId, api_key_id as apiKeyId, endpoint, method,
        status_code as statusCode, response_time as responseTime, 
        created_at as createdAt
      FROM api_calls
      WHERE user_id = ?
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(query).all(userId, limit, offset);

    const countQuery =
      "SELECT COUNT(*) as count FROM api_calls WHERE user_id = ?";
    const totalCount = db.prepare(countQuery).get(userId) as { count: number };

    return {
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit),
      },
    };
  },

  getApiCallCount: (
    userId: string,
    timeframe?: { start: number; end: number }
  ) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return 0;
    }

    let query = "SELECT COUNT(*) as count FROM api_calls WHERE user_id = ?";
    const params: (string | number)[] = [userId];

    if (timeframe) {
      query += " AND created_at BETWEEN ? AND ?";
      params.push(timeframe.start, timeframe.end);
    }

    const result = db.prepare(query).get(...params) as { count: number };
    return result.count;
  },

  getApiCallStatistics: (userId: string) => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return {
        daily: 0,
        weekly: 0,
        monthly: 0,
        topEndpoints: [],
      };
    }

    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 86400;
    const oneWeekAgo = now - 604800;
    const oneMonthAgo = now - 2592000;

    const dailyCount = db
      .prepare(
        "SELECT COUNT(*) as count FROM api_calls WHERE user_id = ? AND created_at > ?"
      )
      .get(userId, oneDayAgo) as { count: number };

    const weeklyCount = db
      .prepare(
        "SELECT COUNT(*) as count FROM api_calls WHERE user_id = ? AND created_at > ?"
      )
      .get(userId, oneWeekAgo) as { count: number };

    const monthlyCount = db
      .prepare(
        "SELECT COUNT(*) as count FROM api_calls WHERE user_id = ? AND created_at > ?"
      )
      .get(userId, oneMonthAgo) as { count: number };

    const endpointStats = db
      .prepare(
        `
      SELECT endpoint, COUNT(*) as count 
      FROM api_calls 
      WHERE user_id = ? AND created_at > ? 
      GROUP BY endpoint 
      ORDER BY count DESC 
      LIMIT 5
    `
      )
      .all(userId, oneMonthAgo);

    return {
      daily: dailyCount.count,
      weekly: weeklyCount.count,
      monthly: monthlyCount.count,
      topEndpoints: endpointStats,
    };
  },
};

export const userPreferenceService = {
  getPreferences: (userId: string) => {
    const prefs = db
      .prepare("SELECT * FROM user_preferences WHERE user_id = ?")
      .get(userId) as
      | {
          user_id: string;
          api_usage_alerts: number;
          security_alerts: number;
          data_update_alerts: number;
          updated_at: number;
        }
      | undefined;

    if (!prefs) {
      const now = Math.floor(Date.now() / 1000);

      db.prepare(
        `
        INSERT INTO user_preferences (
          user_id, api_usage_alerts, security_alerts, 
          data_update_alerts, updated_at
        )
        VALUES (?, 1, 1, 0, ?)
      `
      ).run(userId, now);

      return {
        userId,
        apiUsageAlerts: true,
        securityAlerts: true,
        dataUpdateAlerts: false,
      };
    }

    return {
      userId: prefs.user_id,
      apiUsageAlerts: Boolean(prefs.api_usage_alerts),
      securityAlerts: Boolean(prefs.security_alerts),
      dataUpdateAlerts: Boolean(prefs.data_update_alerts),
    };
  },

  updatePreferences: (userId: string, preferences: Record<string, boolean>) => {
    const now = Math.floor(Date.now() / 1000);
    const currentPrefs = userPreferenceService.getPreferences(userId);

    const updatedPrefs = {
      ...currentPrefs,
      ...preferences,
    };

    const columns = [];
    const values = [];

    if ("apiUsageAlerts" in preferences) {
      columns.push("api_usage_alerts = ?");
      values.push(preferences.apiUsageAlerts ? 1 : 0);
    }

    if ("securityAlerts" in preferences) {
      columns.push("security_alerts = ?");
      values.push(preferences.securityAlerts ? 1 : 0);
    }

    if ("dataUpdateAlerts" in preferences) {
      columns.push("data_update_alerts = ?");
      values.push(preferences.dataUpdateAlerts ? 1 : 0);
    }

    if (columns.length === 0) {
      return updatedPrefs;
    }

    columns.push("updated_at = ?");
    values.push(now);
    values.push(userId);

    const result = db
      .prepare(
        `
      UPDATE user_preferences 
      SET ${columns.join(", ")} 
      WHERE user_id = ?
    `
      )
      .run(...values);

    if (!result) {
      console.error("Failed to update user preferences");
    }

    return updatedPrefs;
  },
};

export const statisticsService = {
  getDashboardStats: (userId: string) => {
    try {
      const apiKeyCount = db
        .prepare(
          "SELECT COUNT(*) as count FROM api_keys WHERE user_id = ? AND is_active = 1"
        )
        .get(userId) as { count: number };

      const apiCallStats = apiCallService.getApiCallStatistics(userId);

      const recentActivities = userLogService.getRecentUserActivities(
        userId,
        5
      );

      const datasetInfo = datasetService.getDatasetInfo();

      if (!apiKeyCount || !apiCallStats || !recentActivities || !datasetInfo) {
        return {
          apiKeyCount: 0,
          apiCallStats: { daily: 0, weekly: 0, monthly: 0, topEndpoints: [] },
          totalDatasets: 0,
          recentActivities: [],
          datasetAccess: [],
          newDatasetsThisMonth: 0,
        };
      }

      return {
        apiKeyCount: apiKeyCount.count,
        apiCallStats,
        totalDatasets: datasetInfo.totalDatasets,
        recentActivities,
        datasetAccess: datasetInfo.datasets.map(dataset => ({
          name: dataset.name,
          available: dataset.available,
          endpoint: dataset.endpoint,
        })),
        newDatasetsThisMonth: datasetInfo.datasets.filter(d => d.available)
          .length,
      };
    } catch (error) {
      console.error("Error getting dashboard stats:", error);
      return null;
    }
  },
};

export const datasetService = {
  getDatasetInfo: () => {
    try {
      const headcountsCount = db
        .prepare("SELECT COUNT(*) as count FROM headcounts")
        .get() as { count: number };

      const headcountsYearRange = db
        .prepare(
          "SELECT MIN(year) as minYear, MAX(year) as maxYear FROM headcounts"
        )
        .get() as { minYear: number; maxYear: number };

      const classSizesCount = db
        .prepare("SELECT COUNT(*) as count FROM class_sizes")
        .get() as { count: number };

      const classTerms = db
        .prepare("SELECT DISTINCT term FROM class_sizes ORDER BY term")
        .all() as { term: string }[];

      const facultyCount = db
        .prepare("SELECT COUNT(*) as count FROM faculty")
        .get() as { count: number };

      const facultyYears = db
        .prepare("SELECT DISTINCT year FROM faculty ORDER BY year")
        .all() as { year: string }[];

      const enrollmentCount = db
        .prepare("SELECT COUNT(*) as count FROM enrollment_report")
        .get() as { count: number };

      const academicYears = db
        .prepare(
          "SELECT DISTINCT academic_year FROM enrollment_report ORDER BY academic_year"
        )
        .all() as { academic_year: string }[];

      const departmentCount = db
        .prepare("SELECT COUNT(*) as count FROM departments")
        .get() as { count: number };

      if (
        !headcountsCount ||
        !headcountsYearRange ||
        !classSizesCount ||
        !facultyCount ||
        !enrollmentCount ||
        !departmentCount
      ) {
        return {
          totalDatasets: 4,
          datasets: [
            {
              name: "Headcount Data",
              recordCount: 0,
              available: false,
              timeRange: "N/A",
              endpoint: "/api/data/headcounts",
            },
            {
              name: "Class Sizes",
              recordCount: 0,
              available: false,
              terms: [],
              departmentCount: 0,
              endpoint: "/api/data/class-sizes",
            },
            {
              name: "Faculty",
              recordCount: 0,
              available: false,
              years: [],
              departmentCount: 0,
              endpoint: "/api/data/faculty",
            },
            {
              name: "Enrollment Reports",
              recordCount: 0,
              available: false,
              academicYears: [],
              endpoint: "/api/data/enrollment",
            },
          ],
          lastUpdate: 0,
        };
      }

      return {
        totalDatasets: 4,
        datasets: [
          {
            name: "Headcount Data",
            recordCount: headcountsCount.count,
            available: headcountsCount.count > 0,
            timeRange:
              headcountsCount.count > 0
                ? `${headcountsYearRange.minYear} - ${headcountsYearRange.maxYear}`
                : "N/A",
            endpoint: "/api/data/headcounts",
          },
          {
            name: "Class Sizes",
            recordCount: classSizesCount.count,
            available: classSizesCount.count > 0,
            terms: classTerms.map(t => t.term),
            departmentCount: departmentCount.count,
            endpoint: "/api/data/class-sizes",
          },
          {
            name: "Faculty",
            recordCount: facultyCount.count,
            available: facultyCount.count > 0,
            years: facultyYears.map(y => y.year),
            departmentCount: departmentCount.count,
            endpoint: "/api/data/faculty",
          },
          {
            name: "Enrollment Reports",
            recordCount: enrollmentCount.count,
            available: enrollmentCount.count > 0,
            academicYears: academicYears.map(y => y.academic_year),
            endpoint: "/api/data/enrollment",
          },
        ],
        lastUpdate: Math.floor(Date.now() / 1000),
      };
    } catch (error) {
      console.error("Error getting dataset info:", error);
      return null;
    }
  },
};
