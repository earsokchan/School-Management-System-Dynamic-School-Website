import type { Metadata } from "next";
import { TeacherManager } from "@/components/admin/TeacherManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { Teacher } from "@/components/admin/TeacherManager";

export const metadata: Metadata = { title: "Admin Teachers", robots: { index: false } };

export default async function AdminTeachersPage() {
  const initialData = await getAdminCollection<Teacher>("admin-teachers");
  return <TeacherManager initialData={initialData} />;
}
