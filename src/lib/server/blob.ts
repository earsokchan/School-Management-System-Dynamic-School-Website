import { del, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getBlobStoreId, getBlobToken, hasBlobConfig } from "@/lib/server/env";

const allowedTypes = new Set([
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
]);
const allowedExtensions = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"]);
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

function isAllowedImage(file: File): boolean {
  if (allowedTypes.has(file.type.toLowerCase())) return true;
  const ext = extensionFor(file);
  return allowedExtensions.has(ext);
}

async function uploadLocal(file: File, folder: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = extensionFor(file);
  const fileName = `${randomUUID()}-${safeSegment(file.name) || "image"}.${ext}`;
  const relativeFolder = safeSegment(folder) || "images";
  const uploadDir = path.join(process.cwd(), "public", "uploads", relativeFolder);

  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  const publicUrl = `/uploads/${relativeFolder}/${fileName}`;
  return { url: publicUrl, pathname: publicUrl };
}

export async function uploadImage(file: File, folder = "images") {
  if (!isAllowedImage(file)) {
    throw new ImageUploadError("Only JPEG, PNG, WebP, GIF, SVG, and AVIF images are supported");
  }
  if (file.size > maximumFileSize) {
    throw new ImageUploadError("Images must be smaller than 10 MB");
  }

  if (hasBlobConfig()) {
    const pathname = `${safeSegment(folder) || "images"}/${randomUUID()}-${safeSegment(file.name) || "image"}.${extensionFor(file)}`;
    const token = getBlobToken();
    const storeId = getBlobStoreId();
    const optionsBase = {
      addRandomSuffix: true,
      ...(token ? { token } : {}),
      ...(storeId ? { storeId } : {}),
    };

    try {
      let result;
      try {
        result = await put(pathname, file, { ...optionsBase, access: "public" });
      } catch (publicErr: unknown) {
        const msg = publicErr instanceof Error ? publicErr.message : String(publicErr);
        if (msg.includes("private store") || msg.includes("private access")) {
          result = await put(pathname, file, { ...optionsBase, access: "private" });
        } else {
          throw publicErr;
        }
      }

      // If store is private, return proxied URL so <img> tags work everywhere
      if (result.url.includes(".private.blob.vercel-storage.com")) {
        const proxiedUrl = `/api/blob-proxy?url=${encodeURIComponent(result.url)}`;
        return { url: proxiedUrl, pathname: result.pathname };
      }

      return { url: result.url, pathname: result.pathname };
    } catch (err) {
      console.warn("Vercel Blob upload error, falling back to local storage:", err);
      return uploadLocal(file, folder);
    }
  }

  return uploadLocal(file, folder);
}

export async function deleteImage(url: string): Promise<void> {
  let targetUrl = url;
  if (url.startsWith("/api/blob-proxy?")) {
    try {
      const parsed = new URL(url, "http://localhost");
      const paramUrl = parsed.searchParams.get("url");
      if (paramUrl) targetUrl = paramUrl;
    } catch {
      /* fallback */
    }
  }

  if (targetUrl.startsWith("/uploads/")) {
    try {
      const relativePath = targetUrl.replace(/^\/uploads\//, "");
      const filePath = path.join(process.cwd(), "public", "uploads", relativePath);
      await fs.unlink(filePath);
    } catch {
      /* ignore if local file missing */
    }
    return;
  }

  const token = getBlobToken();
  const storeId = getBlobStoreId();
  try {
    await del(targetUrl, {
      ...(token ? { token } : {}),
      ...(storeId ? { storeId } : {}),
    });
  } catch {
    /* ignore deletion errors */
  }
}
