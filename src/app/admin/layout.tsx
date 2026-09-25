import { fontsVariables } from "@/lib/fonts";
import { AdminShell } from "@/components/admin/AdminShell";

import "@/app/globals.css";

export const metadata = {
  title: "Admin",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontsVariables}>
      <body className="antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}