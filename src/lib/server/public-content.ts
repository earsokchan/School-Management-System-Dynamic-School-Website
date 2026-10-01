import { academicPrograms } from "@/data/programs";
import { events } from "@/data/events";
import { gallery } from "@/data/gallery";
import { news } from "@/data/news";
import { studentResults } from "@/data/results";
import { teachers } from "@/data/teachers";
import type { AcademicProgram, GalleryItem, NewsItem, SchoolEvent, StudentResult, Teacher } from "@/data/types";
import { listCollection, type CollectionName } from "@/lib/server/collections";
import { hasMongoConfig } from "@/lib/server/env";
import type { HomeContent } from "@/components/admin/HomePageEditor";
import type { AboutContent } from "@/components/admin/AboutPageEditor";
import type { AcademicsContent } from "@/components/admin/AcademicsPageEditor";
import type { StudentsContent } from "@/components/admin/StudentsPageEditor";
import type { NewsPageContent } from "@/components/admin/NewsPageEditor";
import type { EventsPageContent } from "@/components/admin/EventsPageEditor";
import type { GalleryPageContent } from "@/components/admin/GalleryPageEditor";
import type { ContactPageContent } from "@/components/admin/ContactPageEditor";
import { getDatabase } from "@/lib/server/mongodb";

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

export async function getHomeContent(): Promise<HomeContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("home-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as HomeContent;
  } catch {
    return null;
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("about-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as AboutContent;
  } catch {
    return null;
  }
}

export async function getAcademicsContent(): Promise<AcademicsContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("academics-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as AcademicsContent;
  } catch {
    return null;
  }
}

import type { TeachersContent } from "@/components/admin/TeachersPageEditor";

export async function getStudentsContent(): Promise<StudentsContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("students-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as StudentsContent;
  } catch {
    return null;
  }
}

export async function getTeachersContent(): Promise<TeachersContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("teachers-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as TeachersContent;
  } catch {
    return null;
  }
}

export async function getNewsPageContent(): Promise<NewsPageContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("news-page-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as NewsPageContent;
  } catch {
    return null;
  }
}

export async function getEventsPageContent(): Promise<EventsPageContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("events-page-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as EventsPageContent;
  } catch {
    return null;
  }
}

export async function getGalleryPageContent(): Promise<GalleryPageContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("gallery-page-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as GalleryPageContent;
  } catch {
    return null;
  }
}

export async function getContactPageContent(): Promise<ContactPageContent | null> {
  if (!hasMongoConfig()) return null;
  try {
    const db = await getDatabase();
    const doc = await db.collection("contact-page-content").findOne({ id: "singleton" });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    void _id;
    return rest as ContactPageContent;
  } catch {
    return null;
  }
}
