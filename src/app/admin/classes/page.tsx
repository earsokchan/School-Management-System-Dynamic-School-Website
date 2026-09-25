import type { Metadata } from "next";
import { ClassesManager } from "@/components/admin/ClassesManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { ClassItem, GradeItem } from "@/components/admin/ClassesManager";

export const metadata: Metadata = { title: "Admin Classes & Subjects", robots: { index: false } };

export default async function AdminClassesPage() {
  const [initialClasses, initialGradeItems] = await Promise.all([
    getAdminCollection<ClassItem>("classes"),
    getAdminCollection<GradeItem>("settings"),
  ]);
  return <ClassesManager initialClasses={initialClasses} initialGradeItems={initialGradeItems} />;
}
