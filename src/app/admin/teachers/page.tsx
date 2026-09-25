import type { Metadata } from "next";
import { TeacherManager } from "@/components/admin/TeacherManager";

export const metadata: Metadata = { title: "Admin Teachers", robots: { index: false } };

export default function AdminTeachersPage() {
  return (
    <TeacherManager />
  );
}