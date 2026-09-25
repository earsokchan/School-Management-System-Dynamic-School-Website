import { academicPrograms } from "@/data/programs";
import { events } from "@/data/events";
import { gallery } from "@/data/gallery";
import { news } from "@/data/news";
import { studentResults } from "@/data/results";
import { teachers } from "@/data/teachers";
import type { AcademicProgram, GalleryItem, NewsItem, SchoolEvent, StudentResult, Teacher } from "@/data/types";
import { listCollection, type CollectionName } from "@/lib/server/collections";
import { hasMongoConfig } from "@/lib/server/env";

async function getContent<T extends object>(name: CollectionName, fallback: readonly T[]): Promise<T[]> {
  if (!hasMongoConfig()) return [...fallback];
  try {
    const records = await listCollection<T>(name);
    return records.length > 0 ? records : [...fallback];
  } catch {
    return [...fallback];
  }
}

export function getPublicNews(): Promise<NewsItem[]> {
  return getContent<NewsItem>("news", news);
}

export function getPublicEvents(): Promise<SchoolEvent[]> {
  return getContent<SchoolEvent>("events", events);
}

export function getPublicGallery(): Promise<GalleryItem[]> {
  return getContent<GalleryItem>("gallery", gallery);
}

export function getPublicTeachers(): Promise<Teacher[]> {
  return getContent<Teacher>("public-teachers", teachers);
}

export function getPublicPrograms(): Promise<AcademicProgram[]> {
  return getContent<AcademicProgram>("academic-programs", academicPrograms);
}

export function getPublicResults(): Promise<StudentResult[]> {
  return getContent<StudentResult>("public-results", studentResults);
}
