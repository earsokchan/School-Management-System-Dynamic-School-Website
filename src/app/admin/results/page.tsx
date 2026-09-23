import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminResultsTable } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Results", robots: { index: false } };

export default function AdminResultsPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.results" />
      <AdminResultsTable />
    </>
  );
}