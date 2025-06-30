import { ZodSchema, ZodError } from "zod";

export class ValidationError extends Error {
  public details: ZodError;
  constructor(error: ZodError) {
    super("Validation error");
    this.details = error;
  }
}

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error);
  }
  return result.data;
}
