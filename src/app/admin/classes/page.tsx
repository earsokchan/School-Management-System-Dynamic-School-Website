import type { Metadata } from "next";
import { ClassesManager } from "@/components/admin/ClassesManager";

export const metadata: Metadata = { title: "Admin Classes & Subjects", robots: { index: false } };

export default function AdminClassesPage() {
  return <ClassesManager />;
}
