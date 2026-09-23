import type { Localized } from "@/data/types";

export const schoolName: Localized = {
  en: "Hun Sen Kampong Tralach High School",
  km: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច",
};

export const schoolShortName: Localized = {
  en: "Hun Sen Kampong Tralach",
  km: "វិ.ហ៊ុនសែន កំពង់ត្រឡាច",
};

export const schoolMotto: Localized = {
  en: "Building Knowledge. Inspiring the Future.",
  km: "កសាងចំណេះដឹង បំផុសគំនិតសម្រាប់អនាគត",
};

export const greeting: Localized = {
  en: "Welcome!",
  km: "សូមស្វាគមន៍!",
};

/* Official hierarchy (matching kp-tralach.org) */
export const ministryOrg: Localized[] = [
  {
    en: "Ministry of Education, Youth and Sport",
    km: "ក្រសួងអប់រំ យុវជន និងកីឡា",
  },
  {
    en: "Department of Education, Youth and Sport — Kampong Chhnang Province",
    km: "មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តកំពង់ឆ្នាំង",
  },
  {
    en: "Office of Education, Youth and Sport — Kampong Tralach District",
    km: "ការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុកកំពង់ត្រឡាច",
  },
];

export const royalMotto: Localized = {
  en: "Kingdom of Cambodia — Nation, Religion, King",
  km: "ព្រះរាជាណាចក្រកម្ពុជា — ជាតិ សាសនា ព្រះមហាក្សត្រ",
};

export const siteUrl = "https://kp-tralach.org";

export const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Hun+Sen+Kampong+Tralach+High+School+Kampong+Chhnang";

export const schoolAddress: Localized = {
  en: "Salalek Bram (School 5) Village, Or Russei Commune, Kampong Tralach District, Kampong Chhnang Province, Cambodia",
  km: "ភូមិសាលាលេខប្រាំ ឃុំអូរឫស្សី ស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង ប្រទេសកម្ពុជា",
};

export const schoolAddressShort: Localized = {
  en: "Salalek Bram, Or Russei, Kampong Tralach, Kampong Chhnang",
  km: "ភូមិសាលាលេខប្រាំ ឃុំអូរឫស្សី ស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង",
};

export const contactInfo = {
  email: "info@kp-tralach.org",
  phones: ["+855 76 647 8888", "+855 17 821 588"],
  telegram: "https://t.me/kampongtralach_bot",
};

export const socialLinks = {
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  telegram: contactInfo.telegram,
};

/* School leadership (from kp-tralach.org) */
export interface LeadershipMember {
  name: string;
  title: Localized;
  phone: string;
}

export const leadership: LeadershipMember[] = [
  {
    name: "លោក នី ម៉ៅ",
    title: { en: "School Director", km: "នាយកសាលា" },
    phone: "+855 76 647 8888",
  },
  {
    name: "លោក ណៃ កាណុល",
    title: { en: "Deputy Director — Administration", km: "នាយករងរដ្ឋបាល" },
    phone: "+855 17 821 588",
  },
  {
    name: "លោកស្រី ណាក សំណាង",
    title: { en: "Deputy Director — Technical", km: "នាយិការងបច្ចេកទេស" },
    phone: "+855 12 925 739",
  },
  {
    name: "លោក ហុន ម៉ុម",
    title: { en: "ICT Technical Assistant", km: "ជំនួយការបច្ចេកទេស ICT" },
    phone: "+855 016 476 664",
  },
];

/* Office hours (from kp-tralach.org) */
export const workingHours = {
  days: { en: "Monday — Saturday", km: "ចន្ទ ដល់ សៅរ៍" } as Localized,
  morning: { en: "07:00 – 11:00", km: "០៧:០០ – ១១:០០" } as Localized,
  afternoon: { en: "13:00 – 17:00", km: "១៣:០០ – ១៧:០០" } as Localized,
};

export const academicYear = {
  en: "Academic Year 2025–2026",
  km: "ឆ្នាំសិក្សា ២០២៥–២០២៦",
} as Localized;

export type RouteKey =
  | "home"
  | "about"
  | "academics"
  | "students"
  | "teachers"
  | "news"
  | "events"
  | "gallery"
  | "contact"
  | "results";

export function routePath(route: RouteKey): string {
  switch (route) {
    case "home":
      return "";
    case "about":
      return "/about";
    case "academics":
      return "/academics";
    case "students":
      return "/students";
    case "teachers":
      return "/teachers";
    case "news":
      return "/news";
    case "events":
      return "/events";
    case "gallery":
      return "/gallery";
    case "contact":
      return "/contact";
    case "results":
      return "/results";
  }
}

export function localizedPath(locale: string, route: RouteKey): string {
  return locale === "en" ? routePath(route) : `/${locale}${routePath(route)}`;
}