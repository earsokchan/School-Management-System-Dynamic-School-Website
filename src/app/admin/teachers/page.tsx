import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTeachersGrid } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Teachers", robots: { index: false } };

export default function AdminTeachersPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.teachers" />
      <AdminTeachersGrid />
    </>
  );
}