import { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint, APIError } from "better-auth/api";
import { randomBytes } from "crypto";
import type { Database } from "better-sqlite3";

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

interface ApiKey {
  id: string;
  userId: string;
  key: string;
  name: string;
  createdAt: string;
  expiresAt: string | null;
  lastUsedAt: string | null;
}

interface ApiKeyRequestBody {
  name?: string;
  expiresIn?: number;
  apiKey?: string;
}

export const apiKeyPlugin = () => {
  return {
    id: "api-key-factory",
    
    schema: {
      api_keys: {
        fields: {
          userId: {
            type: "string",
            required: true,
            references: {
              model: "user",
              field: "id",
              onDelete: "cascade",
            },
          },
          key: {
            type: "string",
            required: true,
            unique: true,
          },
          name: {
            type: "string",
            required: true,
          },
          createdAt: {
            type: "date",
            required: true,
          },
          expiresAt: {
            type: "date",
            required: false,
          },
          lastUsedAt: {
            type: "date",
            required: false,
          },
        },
      },
    },
    
    endpoints: {
      generateApiKey: createAuthEndpoint("/api-keys/generate", {
        method: "POST",
      }, async (ctx) => {
        try {
          const sessionCookie = ctx.getCookie("session");
          if (!sessionCookie) {
            throw new APIError("UNAUTHORIZED", {
              message: "Unauthorized"
            });
          }
          
          let userId: string;
          
          try {
            const db = ctx.context.options.database as Database;
            
            const session = db.prepare<string, Session>(
              "SELECT * FROM session WHERE token = ?"
            ).get(sessionCookie);
            
            if (!session) {
              throw new Error("Invalid session");
            }
            
            userId = session.userId;
          } catch {
            throw new APIError("UNAUTHORIZED", {
              message: "Could not verify session"
            });
          }
          
          let body: ApiKeyRequestBody = {};
          if (ctx.request) {
            try {
              body = await ctx.request.json();
            } catch {
            }
          }
          
          const keyName = body.name || "Default API Key";
          
          const apiKey = randomBytes(32).toString("hex");
          
          const expiresAt = body.expiresIn ? new Date(Date.now() + Number(body.expiresIn)) : null;
          
          try {
            const db = ctx.context.options.database as Database;
            
            const insertStmt = db.prepare(`
              INSERT INTO api_keys (userId, key, name, createdAt, expiresAt)
              VALUES (?, ?, ?, ?, ?)
            `);
            
            const now = new Date().toISOString();
            insertStmt.run(
              userId,
              apiKey,
              keyName,
              now,
              expiresAt ? expiresAt.toISOString() : null
            );
            
            return ctx.json({
              userId,
              key: apiKey,
              name: keyName,
              createdAt: now,
              expiresAt: expiresAt ? expiresAt.toISOString() : null,
            }, { status: 201 });
          } catch {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to create API key"
            });
          }
        } catch (error) {
          if (error instanceof APIError) {
            throw error;
          }
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "An unexpected error occurred"
          });
        }
      }),
      
      listApiKeys: createAuthEndpoint("/api-keys", {
        method: "GET",
      }, async (ctx) => {
        try {
          const sessionCookie = ctx.getCookie("session");
          if (!sessionCookie) {
            throw new APIError("UNAUTHORIZED", {
              message: "Unauthorized"
            });
          }
          
          let userId: string;
          
          try {
            const db = ctx.context.options.database as Database;
            
            const session = db.prepare<string, Session>(
              "SELECT * FROM session WHERE token = ?"
            ).get(sessionCookie);
            
            if (!session) {
              throw new Error("Invalid session");
            }
            
            userId = session.userId;
            
            const apiKeys = db.prepare<string, ApiKey>(
              "SELECT * FROM api_keys WHERE userId = ?"
            ).all(userId) as unknown as ApiKey[];
            
            return ctx.json({
              apiKeys: apiKeys.map((key) => ({
                id: key.id,
                name: key.name,
                createdAt: key.createdAt,
                expiresAt: key.expiresAt,
                lastUsedAt: key.lastUsedAt,
              })),
            });
          } catch {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Could not retrieve API keys"
            });
          }
        } catch (error) {
          if (error instanceof APIError) {
            throw error;
          }
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "An unexpected error occurred"
          });
        }
      }),
      
      deleteApiKey: createAuthEndpoint("/api-keys/:id", {
        method: "DELETE",
      }, async (ctx) => {
        try {
          const sessionCookie = ctx.getCookie("session");
          if (!sessionCookie) {
            throw new APIError("UNAUTHORIZED", {
              message: "Unauthorized"
            });
          }
          
          const keyId = ctx.params.id;
          
          try {
            const db = ctx.context.options.database as Database;
            
            const session = db.prepare<string, Session>(
              "SELECT * FROM session WHERE token = ?"
            ).get(sessionCookie);
            
            if (!session) {
              throw new APIError("UNAUTHORIZED", {
                message: "Invalid session"
              });
            }
            
            const userId = session.userId;
            
            const apiKey = db.prepare<[string, string], ApiKey>(
              "SELECT * FROM api_keys WHERE id = ? AND userId = ?"
            ).get(keyId, userId);
            
            if (!apiKey) {
              throw new APIError("NOT_FOUND", {
                message: "API key not found"
              });
            }
            
            db.prepare<string>(
              "DELETE FROM api_keys WHERE id = ?"
            ).run(keyId);
            
            return ctx.json({
              success: true,
            });
          } catch (error) {
            if (error instanceof APIError) {
              throw error;
            }
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to delete API key"
            });
          }
        } catch (error) {
          if (error instanceof APIError) {
            throw error;
          }
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "An unexpected error occurred"
          });
        }
      }),
      
      verifyApiKey: createAuthEndpoint("/api-keys/verify", {
        method: "POST",
      }, async (ctx) => {
        try {
          let body: ApiKeyRequestBody = {};
          if (ctx.request) {
            try {
              body = await ctx.request.json();
            } catch {
            }
          }
          
          const apiKey = body.apiKey || (ctx.headers ? ctx.headers.get("x-api-key") : null);
          
          if (!apiKey) {
            throw new APIError("BAD_REQUEST", {
              message: "API key is required"
            });
          }
          
          try {
            const db = ctx.context.options.database as Database;
            
            const keyRecord = db.prepare<string, ApiKey>(
              "SELECT * FROM api_keys WHERE key = ?"
            ).get(apiKey);
            
            if (!keyRecord) {
              return ctx.json({
                valid: false,
                error: "Invalid API key",
              });
            }
            
            if (keyRecord.expiresAt && new Date(keyRecord.expiresAt) < new Date()) {
              return ctx.json({
                valid: false,
                error: "API key has expired",
              });
            }
            
            const now = new Date().toISOString();
            db.prepare<[string, string]>(
              "UPDATE api_keys SET lastUsedAt = ? WHERE id = ?"
            ).run(now, keyRecord.id);
            
            return ctx.json({
              valid: true,
              userId: keyRecord.userId,
            });
          } catch {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to verify API key"
            });
          }
        } catch (error) {
          if (error instanceof APIError) {
            throw error;
          }
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "An unexpected error occurred"
          });
        }
      }),
    },
  } satisfies BetterAuthPlugin;
};

export default apiKeyPlugin; 