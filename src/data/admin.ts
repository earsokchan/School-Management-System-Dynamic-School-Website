import type { Localized } from "@/data/types";

export const adminNavItems: { key: string; label: Localized; href: string }[] = [
  { key: "dashboard", label: { en: "Dashboard", km: "ផ្ទាំងគ្រប់គ្រង" }, href: "/admin" },
  { key: "news", label: { en: "News", km: "ព័ត៌មាន" }, href: "/admin/news" },
  { key: "events", label: { en: "Events", km: "ព្រឹត្តិការណ៍" }, href: "/admin/events" },
  { key: "teachers", label: { en: "Teachers", km: "លោកគ្រូ អ្នកគ្រូ" }, href: "/admin/teachers" },
  { key: "students", label: { en: "Students", km: "សិស្សានុសិស្ស" }, href: "/admin/students" },
  { key: "results", label: { en: "Academic Results", km: "លទ្ធផលសិក្សា" }, href: "/admin/results" },
  { key: "gallery", label: { en: "Gallery", km: "វិចិត្រសាល" }, href: "/admin/gallery" },
  { key: "pages", label: { en: "Pages", km: "ទំព័រ" }, href: "/admin/pages" },
  { key: "settings", label: { en: "Settings", km: "ការកំណត់" }, href: "/admin/settings" },
];

export const dashboardStats = [
  { id: "students", label: { en: "Total Students", km: "ចំនួនសិស្សានុសិស្សសរុប" }, value: 1200, change: "+14%" },
  { id: "teachers", label: { en: "Total Teachers", km: "ចំនួនលោកគ្រូ អ្នកគ្រូសរុប" }, value: 45, change: "+3" },
  { id: "news", label: { en: "News Articles", km: "អត្ថបទព័ត៌មាន" }, value: 36, change: "+6" },
  { id: "events", label: { en: "Events", km: "ព្រឹត្តិការណ៍" }, value: 12, change: "+2" },
  { id: "gallery", label: { en: "Gallery Photos", km: "រូបថតក្នុងវិចិត្រសាល" }, value: 120, change: "+18" },
];