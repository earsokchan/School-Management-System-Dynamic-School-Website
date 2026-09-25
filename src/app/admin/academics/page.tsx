import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminAcademicsTable } from "@/components/admin/previews";

export const metadata: Metadata = { 
  title: "Admin Academics", 
  robots: { index: false } 
};

export default function AdminAcademicsPage() {
  return (
    <>
      <AdminPageHeader titleKey="nav.academics" />
      <AdminAcademicsTable />
    </>
  );
}
