import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminEventsTable } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Events", robots: { index: false } };

export default function AdminEventsPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.events" />
      <AdminEventsTable />
    </>
  );
}