import type { Metadata } from "next";
import { AdminPreviewBanner } from "@/components/admin/AdminShell";
import { DashboardStats } from "@/components/admin/DashboardStats";
import {
  RecentNews,
  UpcomingEvents,
  RecentResults,
} from "@/components/admin/DashboardWidgets";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false },
};

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader titleKey="dashboard.title" subtitleKey="dashboard.welcome" />

      <AdminPreviewBanner />
      <DashboardStats />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentNews />
        </div>
        <UpcomingEvents />
      </div>

      <div className="mt-6">
        <RecentResults />
      </div>
    </>
  );
}