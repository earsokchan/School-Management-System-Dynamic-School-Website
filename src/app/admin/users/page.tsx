import type { Metadata } from "next";
import { UserManager } from "@/components/admin/UserManager";

export const metadata: Metadata = { title: "System Users", robots: { index: false } };

export default function AdminUsersPage() {
  return (
    <>
      <UserManager />
    </>
  );
}
