const maximumJsonLength = 1_000_000;
const maximumArrayLength = 2_000;
const maximumStringLength = 100_000;
const blockedKeys = new Set(["__proto__", "constructor", "prototype"]);

export class ContentValidationError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ContentValidationError";
    this.status = status;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validateValue(value: unknown, depth = 0): unknown {
  if (depth > 20) {
    throw new ContentValidationError("Document nesting is too deep");
  }
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new ContentValidationError("Document contains an invalid number");
    return value;
  }
  if (typeof value === "string") {
    if (value.length > maximumStringLength) {
      throw new ContentValidationError("Document contains an oversized string", 413);
    }
    return value;
  }
  if (Array.isArray(value)) {
    if (value.length > maximumArrayLength) {
      throw new ContentValidationError("Document contains too many array items", 413);
    }
    return value.map((item) => validateValue(item, depth + 1));
  }
  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      if (!key || key === "_id" || key.startsWith("$") || key.includes(".")) {
        throw new ContentValidationError("Document contains an invalid field name");
      }
      if (blockedKeys.has(key)) {
        throw new ContentValidationError("Document contains a reserved field name");
      }
      result[key] = validateValue(item, depth + 1);
    }
    return result;
  }
  throw new ContentValidationError("Document contains an unsupported value");
}

export function parseDocumentPayload(value: unknown): Record<string, unknown> {
  if (!isPlainObject(value)) {
    throw new ContentValidationError("Request body must be an object");
  }

  let serialized: string;
  try {
    serialized = JSON.stringify(value);
  } catch {
    throw new ContentValidationError("Request body is not valid JSON data");
  }
  if (serialized.length > maximumJsonLength) {
    throw new ContentValidationError("Document is too large", 413);
  }

  return validateValue(value) as Record<string, unknown>;
}
