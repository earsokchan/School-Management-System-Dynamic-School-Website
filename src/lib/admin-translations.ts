import type { Locale, Localized } from "@/lib/i18n";

export const adminTranslations = {
  brand: {
    en: "Hun Sen Kampong Tralach — Admin",
    km: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច — អ្នកគ្រប់គ្រង",
  },
  nav: {
    dashboard: { en: "Dashboard", km: "ផ្ទាំងគ្រប់គ្រង" },
    news: { en: "News", km: "ព័ត៌មាន" },
    events: { en: "Events", km: "ព្រឹត្តិការណ៍" },
    academics: { en: "Academic Programs", km: "កម្មវិធីសិក្សា" },
    teachers: { en: "Teachers", km: "លោកគ្រូ អ្នកគ្រូ" },
    students: { en: "Students", km: "សិស្សានុសិស្ស" },
    results: { en: "Academic Results", km: "លទ្ធផលសិក្សា" },
    gallery: { en: "Gallery", km: "វិចិត្រសាល" },
    pages: { en: "Pages", km: "ទំព័រ" },
    settings: { en: "Settings", km: "ការកំណត់" },
    home: { en: "Front Page Settings", km: "ការកំណត់ទំព័រដើម" },
  },
  common: {
    viewSite: { en: "View site", km: "មើលគេហទំព័រ" },
    logout: { en: "Sign out", km: "ចេញពីប្រព័ន្ធ" },
    preview: { en: "UI preview only — no real data", km: "គ្រាន់តែបង្ហាញមុខងារ — គ្មានទិន្នន័យពិត" },
    admin: { en: "Admin", km: "អ្នកគ្រប់គ្រង" },
    search: { en: "Search...", km: "ស្វែងរក..." },
    newItem: { en: "Add New", km: "បន្ថែមថ្មី" },
    loading: { en: "Loading preview data...", km: "កំពុងផ្ទុកទិន្នន័យបង្ហាញ..." },
  },
  dashboard: {
    title: { en: "Dashboard", km: "ផ្ទាំងគ្រប់គ្រង" },
    welcome: {
      en: "Welcome back, administrator.",
      km: "សូមស្វាគមន៍ត្រឡប់មកវិញ អ្នកគ្រប់គ្រង។",
    },
    totalStudents: { en: "Total Students", km: "ចំនួនសិស្សានុសិស្សសរុប" },
    totalTeachers: { en: "Total Teachers", km: "ចំនួនលោកគ្រូ អ្នកគ្រូសរុប" },
    newsCount: { en: "News Articles", km: "អត្ថបទព័ត៌មាន" },
    eventsCount: { en: "Events", km: "ព្រឹត្តិការណ៍" },
    galleryCount: { en: "Gallery Photos", km: "រូបថតក្នុងវិចិត្រសាល" },
    recentNews: { en: "Recent News", km: "ព័ត៌មានថ្មីៗ" },
    upcomingEvents: { en: "Upcoming Events", km: "ព្រឹត្តិការណ៍នាពេលខាងមុខ" },
    recentResults: { en: "Recent Results", km: "លទ្ធផលថ្មីៗ" },
    note: {
      en: "This is a static UI preview. A real backend can be connected later.",
      km: "នេះគ្រាន់តែជាការបង្ហាញមុខងារប៉ុណ្ណោះ។ អាចភ្ជាប់ប្រព័ន្ធខាងក្រោយពិតប្រាកដនៅពេលក្រោយ។",
    },
  },
} as const;

export type AdminTranslation = {
  [key: string]: Localized | unknown;
};

export function adminT(locale: Locale, key: string): string {
  const parts = key.split(".");
  let current: unknown = adminTranslations;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  if (current && typeof current === "object" && "en" in (current as Localized) && "km" in (current as Localized)) {
    return (current as Localized)[locale];
  }
  return key;
}