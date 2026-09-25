import type { Metadata } from "next";
import { TimetableManager } from "@/components/admin/TimetableManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { TimetableEntry } from "@/components/admin/TimetableManager";

export const metadata: Metadata = { title: "Admin Timetable", robots: { index: false } };

export default async function AdminTimetablePage() {
  const initialData = await getAdminCollection<TimetableEntry>("timetable");
  return <TimetableManager initialData={initialData} />;
}
