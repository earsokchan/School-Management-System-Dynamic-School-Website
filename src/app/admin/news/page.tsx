import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminNewsTable } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin News", robots: { index: false } };

export default function AdminNewsPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.news" />
      <AdminNewsTable />
    </>
  );
}