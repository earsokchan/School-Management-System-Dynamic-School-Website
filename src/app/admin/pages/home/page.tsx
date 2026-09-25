import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FrontPageController } from "@/components/admin/FrontPageController";

export const metadata: Metadata = { 
  title: "Front Page Settings", 
  robots: { index: false } 
};

export default function AdminFrontPageSettings() {
  return (
    <>
      <AdminPageHeader titleKey="nav.home" subtitleKey="dashboard.note" />
      <FrontPageController />
    </>
  );
}
