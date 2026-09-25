import type { Metadata } from "next";
import { RolesManager } from "@/components/admin/RolesManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { Role } from "@/components/admin/RolesManager";

export const metadata: Metadata = { title: "User Roles", robots: { index: false } };

export default async function AdminRolesPage() {
  const initialData = await getAdminCollection<Role>("roles");
  return <RolesManager initialData={initialData} />;
}
