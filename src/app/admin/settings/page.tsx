import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSettingsForm } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Settings", robots: { index: false } };

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.settings" />
      <AdminSettingsForm />
    </>
  );
}