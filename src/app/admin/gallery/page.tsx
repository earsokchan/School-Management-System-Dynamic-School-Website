import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminGalleryGrid } from "@/components/admin/previews";

export const metadata: Metadata = { title: "Admin Gallery", robots: { index: false } };

export default function AdminGalleryPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.gallery" />
      <AdminGalleryGrid />
    </>
  );
}