import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false },
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
