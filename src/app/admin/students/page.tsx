import type { Metadata } from "next";
import { StudentManager } from "@/components/admin/StudentManager";

export const metadata: Metadata = { title: "Admin Students", robots: { index: false } };

export default function AdminStudentsPage() {
  return (
    <StudentManager />
  );
}