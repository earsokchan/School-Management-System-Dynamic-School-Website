import type { Metadata } from "next";
import { StudentManager } from "@/components/admin/StudentManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { Student } from "@/components/admin/StudentManager";

export const metadata: Metadata = { title: "Admin Students", robots: { index: false } };

export default async function AdminStudentsPage() {
  const initialData = await getAdminCollection<Student>("admin-students");
  return <StudentManager initialData={initialData} />;
}
