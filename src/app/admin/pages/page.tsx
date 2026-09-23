import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPagesTable } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Pages", robots: { index: false } };

export default function AdminPagesPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.pages" />
      <AdminPagesTable />
    </>
  );
}