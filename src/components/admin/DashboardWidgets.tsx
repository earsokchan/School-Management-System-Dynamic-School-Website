"use client";

import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";
import { adminT } from "@/lib/admin-translations";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { studentResults } from "@/data/results";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { formatDate, formatScore } from "@/lib/format";
import { toKhmerNumerals } from "@/lib/i18n";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <h2 className="border-b border-border px-5 py-4 text-sm font-bold text-foreground">{title}</h2>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

export function RecentNews() {
  const locale = useAdminLocale();
  return (
    <Card title={adminT(locale, "dashboard.recentNews")}>
      {news.slice(0, 4).map((item) => (
        <div key={item.id} className="flex items-center gap-4 px-5 py-4">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
            <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {locale === "km" ? item.title.km : item.title.en}
            </p>
            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {locale === "km" ? item.category.km : item.category.en}
              <span aria-hidden="true">·</span>
              {formatDate(item.date, locale)}
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
}

export function UpcomingEvents() {
  const locale = useAdminLocale();
  return (
    <Card title={adminT(locale, "dashboard.upcomingEvents")}>
      {events.slice(0, 4).map((event) => (
        <div key={event.id} className="flex items-center gap-4 px-5 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-center">
            <div>
<p className="text-sm font-bold leading-none text-gold khmer-num">
                {toKhmerNumerals(new Date(event.date).getDate())}
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase text-white/70">
                {formatDate(event.date, locale).split(" ")[0]?.slice(0, 3)}
              </p>
            </div>
        </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {locale === "km" ? event.title.km : event.title.en}
            </p>
            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" aria-hidden="true" />
              {locale === "km" ? event.time.km : event.time.en}
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
}

export function RecentResults() {
  const locale = useAdminLocale();
  const rows = studentResults.slice(0, 5);
  return (
    <Card title={adminT(locale, "dashboard.recentResults")}>
      {rows.map((row) => (
        <div key={row.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {locale === "km" ? row.name.km : row.name.en}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {row.academicYear} · {locale === "km" ? `ថ្នាក់ទី ${row.grade} ${row.className}` : `Grade ${row.grade} ${row.className}`}
            </p>
          </div>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-sm font-bold text-foreground khmer-num">
            {formatScore(row.average, locale)}
          </span>
        </div>
      ))}
    </Card>
  );
}