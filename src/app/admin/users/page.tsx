import type { Metadata } from "next";
import { UserManager } from "@/components/admin/UserManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { SystemUser } from "@/components/admin/UserManager";

export const metadata: Metadata = { title: "System Users", robots: { index: false } };

export default async function AdminUsersPage() {
  const initialData = await getAdminCollection<SystemUser>("users");
  return <UserManager initialData={initialData} />;
}
