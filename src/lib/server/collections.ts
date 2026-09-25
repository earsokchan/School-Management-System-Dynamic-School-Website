import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import type { Document } from "mongodb";
import { getDatabase } from "@/lib/server/mongodb";

export const collectionNames = [
  "news",
  "events",
  "gallery",
  "academic-programs",
  "public-teachers",
  "public-results",
  "admin-teachers",
  "admin-students",
  "admin-results",
  "classes",
  "subjects",
  "timetable",
  "roles",
  "users",
  "settings",
] as const;

export type CollectionName = (typeof collectionNames)[number];

const publicPaths: Partial<Record<CollectionName, string[]>> = {
  news: ["/en", "/km", "/en/news", "/km/news"],
  events: ["/en", "/km", "/en/events", "/km/events"],
  gallery: ["/en", "/km", "/en/gallery", "/km/gallery", "/en/students", "/km/students"],
  "academic-programs": ["/en", "/km", "/en/academics", "/km/academics"],
  "public-teachers": ["/en", "/km", "/en/teachers", "/km/teachers"],
  "public-results": ["/en", "/km", "/en/results", "/km/results", "/en/students", "/km/students"],
};

export function revalidatePublicContent(name: CollectionName): void {
  for (const path of publicPaths[name] ?? []) revalidatePath(path);
}

export function isCollectionName(value: string): value is CollectionName {
  return (collectionNames as readonly string[]).includes(value);
}

function normalizeDocument(document: Document): Record<string, unknown> {
  const { _id, id, ...values } = document;
  return {
    ...values,
    id: typeof id === "string" ? id : String(_id),
  };
}

export async function listCollection<T extends object>(name: CollectionName): Promise<T[]> {
  const database = await getDatabase();
  const documents = await database.collection(name).find({}).sort({ _id: 1 }).toArray();
  return documents.map((document) => normalizeDocument(document) as T);
}

export async function getCollectionDocument<T extends object>(
  name: CollectionName,
  id: string,
): Promise<T | null> {
  const database = await getDatabase();
  const document = await database.collection(name).findOne({ id });
  return document ? (normalizeDocument(document) as T) : null;
}

export async function createCollectionDocument(
  name: CollectionName,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const database = await getDatabase();
  const values = { ...payload };
  delete values._id;
  const suppliedId = values.id;
  delete values.id;
  const id = typeof suppliedId === "string" && suppliedId.length > 0 ? suppliedId : randomUUID();
  await database.collection(name).insertOne({ ...values, id });
  revalidatePublicContent(name);
  return { ...values, id };
}

export async function updateCollectionDocument(
  name: CollectionName,
  id: string,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const database = await getDatabase();
  const values = { ...payload };
  delete values._id;
  delete values.id;
  await database.collection(name).updateOne({ id }, { $set: { ...values, id } });
  const updated = (await getCollectionDocument(name, id)) as Record<string, unknown> | null;
  if (updated) revalidatePublicContent(name);
  return updated;
}

export async function deleteCollectionDocument(name: CollectionName, id: string): Promise<boolean> {
  const database = await getDatabase();
  const result = await database.collection(name).deleteOne({ id });
  if (result.deletedCount === 1) revalidatePublicContent(name);
  return result.deletedCount === 1;
}
