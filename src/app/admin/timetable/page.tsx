import type { Metadata } from "next";
import { TimetableManager } from "@/components/admin/TimetableManager";

export const metadata: Metadata = { title: "Admin Timetable", robots: { index: false } };

export default function AdminTimetablePage() {
  return (
    <>
      <TimetableManager />
    </>
  );
}
