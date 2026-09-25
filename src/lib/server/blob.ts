import { del, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { getBlobStoreId, getBlobToken, hasBlobConfig } from "@/lib/server/env";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const maximumFileSize = 10 * 1024 * 1024;

export class ImageUploadError extends Error {}

function safeSegment(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
}

function extensionFor(file: File): string {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension && /^[a-z0-9]+$/.test(extension)) return extension;
  return file.type.split("/")[1] || "bin";
}

export async function uploadImage(file: File, folder = "images") {
  if (!hasBlobConfig()) {
    throw new Error("Vercel Blob is not configured");
  }
  if (!allowedTypes.has(file.type)) {
    throw new ImageUploadError("Only JPEG, PNG, WebP, GIF, and AVIF images are supported");
  }
  if (file.size > maximumFileSize) {
    throw new ImageUploadError("Images must be smaller than 10 MB");
  }

  const pathname = `${safeSegment(folder) || "images"}/${randomUUID()}-${safeSegment(file.name) || "image"}.${extensionFor(file)}`;
  const token = getBlobToken();
  const storeId = getBlobStoreId();
  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    ...(token ? { token } : {}),
    ...(storeId ? { storeId } : {}),
  });
}

export async function deleteImage(url: string): Promise<void> {
  const token = getBlobToken();
  const storeId = getBlobStoreId();
  await del(url, {
    ...(token ? { token } : {}),
    ...(storeId ? { storeId } : {}),
  });
}
