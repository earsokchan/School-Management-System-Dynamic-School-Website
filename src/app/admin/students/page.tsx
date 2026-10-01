import type { Metadata } from "next";
import { StudentManager } from "@/components/admin/StudentManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { Student } from "@/components/admin/StudentManager";

export const metadata: Metadata = { title: "Admin Students", robots: { index: false } };

export default async function AdminStudentsPage() {
  const [initialData, availableClasses] = await Promise.all([
    getAdminCollection<Student>("admin-students"),
    getAdminCollection<{ id: string; name: string; grade: string }>("classes"),
  ]);
  
  return <StudentManager initialData={initialData} availableClasses={availableClasses} />;
}
