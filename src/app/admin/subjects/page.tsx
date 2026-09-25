import type { Metadata } from "next";
import { SubjectsManager } from "@/components/admin/SubjectsManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { Subject } from "@/components/admin/SubjectsManager";

export const metadata: Metadata = { title: "Admin Subjects", robots: { index: false } };

export default async function AdminSubjectsPage() {
  const initialData = await getAdminCollection<Subject>("subjects");
  return <SubjectsManager initialData={initialData} />;
}
