"use client";

import { GraduationCap, Users, Newspaper, CalendarDays, Images } from "lucide-react";
import { dashboardStats } from "@/data/admin";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { toKhmerNumerals } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const statIcons: Record<string, React.ElementType> = {
  students: GraduationCap,
  teachers: Users,
  news: Newspaper,
  events: CalendarDays,
  gallery: Images,
};

const statColors: Record<string, string> = {
  students: "bg-[#1D1D1D] text-gold",
  teachers: "bg-gold text-white",
  news: "bg-zinc-100 text-zinc-900",
  events: "bg-[#1D1D1D] text-white",
  gallery: "bg-zinc-100 text-zinc-900",
};

export function DashboardStats() {
  const locale = useAdminLocale();
  const format = (value: number) => (locale === "km" ? toKhmerNumerals(value) : value.toLocaleString());

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {dashboardStats.map((stat) => {
        const Icon = statIcons[stat.id];
        return (
          <div key={stat.id} className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", statColors[stat.id])}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-2xl font-bold text-foreground khmer-num">{format(stat.value)}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {locale === "km" ? stat.label.km : stat.label.en}
            </p>
            <p className="mt-2 inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-600">
              {stat.change}
            </p>
          </div>
        );
      })}
    </div>
  );
}