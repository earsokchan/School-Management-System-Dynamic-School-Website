import type { Metadata } from "next";
import { SubjectsManager } from "@/components/admin/SubjectsManager";

export const metadata: Metadata = { title: "Admin Subjects", robots: { index: false } };

export default function AdminSubjectsPage() {
  return <SubjectsManager />;
}
