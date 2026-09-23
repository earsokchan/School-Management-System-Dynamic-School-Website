export type Localized = { en: string; km: string };

export interface NewsItem {
  id: string;
  title: Localized;
  excerpt: Localized;
  category: Localized;
  date: string;
  image: string;
  featured?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: Localized;
  description: Localized;
  date: string;
  time: Localized;
  location: Localized;
  category: Localized;
  image: string;
}

export interface Teacher {
  id: string;
  name: Localized;
  subject: Localized;
  position: Localized;
  photo: string;
}

export interface AcademicProgram {
  id: string;
  grade: Localized;
  title: Localized;
  description: Localized;
  image: string;
  subjects: Localized[];
}

export interface GalleryItem {
  id: string;
  title: Localized;
  category: "all" | "campus" | "students" | "events" | "sports" | "activities";
  image: string;
}

export interface StudentResult {
  id: string;
  name: Localized;
  grade: string;
  className: string;
  academicYear: string;
  subjects: { subject: Localized; score: number }[];
  average: number;
}

export interface Facility {
  id: string;
  name: Localized;
  description: Localized;
  image: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  label: Localized;
}

export interface ActivityCategory {
  id: string;
  title: Localized;
  description: Localized;
  image: string;
}

export interface ContactField {
  label: Localized;
  value: Localized;
}