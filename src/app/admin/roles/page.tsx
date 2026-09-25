import type { Metadata } from "next";
import { RolesManager } from "@/components/admin/RolesManager";

export const metadata: Metadata = { title: "User Roles", robots: { index: false } };

export default function AdminRolesPage() {
  return (
    <>
      <RolesManager />
    </>
  );
}
