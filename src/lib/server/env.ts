export function getMongoUri(): string | undefined {
  const value = process.env.MONGODB_URI?.trim();
  return value || undefined;
}

export function hasMongoConfig(): boolean {
  return Boolean(getMongoUri());
}

export function getBlobToken(): string | undefined {
  const value = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return value || undefined;
}

export function getBlobStoreId(): string | undefined {
  const value = process.env.BLOB_STORE_ID?.trim();
  return value || undefined;
}

export function hasBlobConfig(): boolean {
  return Boolean(getBlobToken() || (getBlobStoreId() && process.env.VERCEL_OIDC_TOKEN));
}
