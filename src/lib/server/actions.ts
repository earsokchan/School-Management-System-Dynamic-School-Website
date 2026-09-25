"use server";

import { hasAdminSession, isAdminAuthConfigured } from "@/lib/server/admin-auth";
import { ImageUploadError, uploadImage as uploadBlobImage } from "@/lib/server/blob";
import {
  createCollectionDocument,
  deleteCollectionDocument,
  isCollectionName,
  listCollection,
  updateCollectionDocument,
  type CollectionName,
} from "@/lib/server/collections";
import { ContentValidationError, parseDocumentPayload } from "@/lib/server/content-validation";
import { hasBlobConfig, hasMongoConfig } from "@/lib/server/env";
import { seedPublicCollections } from "@/lib/server/seed";

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

function failure<T>(error: string): ActionResult<T> {
  return { ok: false, error };
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ContentValidationError || error instanceof ImageUploadError) return error.message;
  if (error instanceof Error && [
    "Admin authentication is not configured",
    "Authentication required",
    "MongoDB is not configured",
    "Vercel Blob is not configured",
  ].includes(error.message)) {
    return error.message;
  }
  return fallback;
}

async function requireAdminAction(): Promise<void> {
  if (!isAdminAuthConfigured()) throw new Error("Admin authentication is not configured");
  if (!(await hasAdminSession())) throw new Error("Authentication required");
}

function requireCollection(collection: string): asserts collection is CollectionName {
  if (!isCollectionName(collection)) throw new Error("Unknown collection");
}

export async function listCollectionAction<T extends { id: string }>(
  collection: CollectionName,
): Promise<ActionResult<T[]>> {
  try {
    await requireAdminAction();
    requireCollection(collection);
    if (!hasMongoConfig()) return failure("MongoDB is not configured");
    return { ok: true, data: await listCollection<T>(collection) };
  } catch (error) {
    return failure(getErrorMessage(error, "Unable to read the collection"));
  }
}

export async function createCollectionAction<T extends { id: string }>(
  collection: CollectionName,
  payload: unknown,
): Promise<ActionResult<T>> {
  try {
    await requireAdminAction();
    requireCollection(collection);
    if (!hasMongoConfig()) return failure("MongoDB is not configured");
    const parsedPayload = parseDocumentPayload(payload);
    return { ok: true, data: (await createCollectionDocument(collection, parsedPayload)) as T };
  } catch (error) {
    return failure(getErrorMessage(error, "Unable to create the document"));
  }
}

export async function updateCollectionAction<T extends { id: string }>(
  collection: CollectionName,
  id: string,
  payload: unknown,
): Promise<ActionResult<T>> {
  try {
    await requireAdminAction();
    requireCollection(collection);
    if (!hasMongoConfig()) return failure("MongoDB is not configured");
    const parsedPayload = parseDocumentPayload(payload);
    const updated = await updateCollectionDocument(collection, id, parsedPayload);
    if (!updated) return failure("Document not found");
    return { ok: true, data: updated as T };
  } catch (error) {
    return failure(getErrorMessage(error, "Unable to update the document"));
  }
}

export async function removeCollectionAction(
  collection: CollectionName,
  id: string,
): Promise<ActionResult<boolean>> {
  try {
    await requireAdminAction();
    requireCollection(collection);
    if (!hasMongoConfig()) return failure("MongoDB is not configured");
    const deleted = await deleteCollectionDocument(collection, id);
    if (!deleted) return failure("Document not found");
    return { ok: true, data: true };
  } catch (error) {
    return failure(getErrorMessage(error, "Unable to delete the document"));
  }
}

export async function uploadImageAction(
  file: File,
  folder = "images",
): Promise<ActionResult<{ url: string; pathname: string; contentType: string; size: number }>> {
  try {
    await requireAdminAction();
    if (!hasBlobConfig()) return failure("Vercel Blob is not configured");
    const uploaded = await uploadBlobImage(file, folder);
    return {
      ok: true,
      data: {
        url: uploaded.url,
        pathname: uploaded.pathname,
        contentType: file.type,
        size: file.size,
      },
    };
  } catch (error) {
    return failure(getErrorMessage(error, "Unable to upload the image"));
  }
}

export async function seedPublicCollectionsAction(): Promise<ActionResult<Record<string, number>>> {
  try {
    await requireAdminAction();
    if (!hasMongoConfig()) return failure("MongoDB is not configured");
    return { ok: true, data: await seedPublicCollections() };
  } catch (error) {
    return failure(getErrorMessage(error, "Unable to seed public collections"));
  }
}
