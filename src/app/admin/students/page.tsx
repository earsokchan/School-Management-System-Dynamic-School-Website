import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStudentsTable } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Students", robots: { index: false } };

export default function AdminStudentsPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.students" />
      <AdminStudentsTable />
    </>
  );
}