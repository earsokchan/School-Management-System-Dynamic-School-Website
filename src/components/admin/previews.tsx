"use client";

import Image from "next/image";
import { Pencil, Trash2, MapPin, FileText } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { adminT } from "@/lib/admin-translations";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { teachers } from "@/data/teachers";
import { studentResults } from "@/data/results";
import { gallery, galleryCategories } from "@/data/gallery";
import { formatDate, formatScore } from "@/lib/format";
import { toKhmerNumerals } from "@/lib/i18n";

function ActionButtons() {
  return (
    <span className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Edit"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Delete"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-creeper"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </span>
  );
}

function TableShell({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-border bg-slate-50">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">{children}</tbody>
      </table>
    </div>
  );
}

export function AdminNewsTable() {
  const locale = useAdminLocale();
  return (
    <TableShell headers={["", adminT(locale, "nav.news"), "Date", ""]}>
      {news.map((item) => (
        <tr key={item.id} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-3.5">
            <div className="relative h-10 w-14 overflow-hidden rounded-lg">
              <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
          </td>
          <td className="px-5 py-3.5">
            <p className="text-sm font-semibold text-foreground">
              {locale === "km" ? item.title.km : item.title.en}
            </p>
            <p className="text-xs text-muted-foreground">
              {locale === "km" ? item.category.km : item.category.en}
            </p>
          </td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(item.date, locale)}</td>
          <td className="px-5 py-3.5 text-right">
            <ActionButtons />
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

export function AdminEventsTable() {
  const locale = useAdminLocale();
  return (
    <TableShell headers={["", adminT(locale, "nav.events"), "Date", "Location", ""]}>
      {events.map((event) => (
        <tr key={event.id} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-3.5">
            <div className="relative h-10 w-14 overflow-hidden rounded-lg">
              <Image src={event.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
          </td>
          <td className="px-5 py-3.5">
            <p className="text-sm font-semibold text-foreground">
              {locale === "km" ? event.title.km : event.title.en}
            </p>
          </td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(event.date, locale)}</td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              {locale === "km" ? event.location.km : event.location.en}
            </span>
          </td>
          <td className="px-5 py-3.5 text-right">
            <ActionButtons />
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

export function AdminTeachersGrid() {
  const locale = useAdminLocale();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className="rounded-xl border border-border bg-white p-5 shadow-sm"
        >
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
            <Image
              src={teacher.photo}
              alt={locale === "km" ? teacher.name.km : teacher.name.en}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-center text-sm font-bold text-foreground">
            {locale === "km" ? teacher.name.km : teacher.name.en}
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {locale === "km" ? teacher.subject.km : teacher.subject.en}
          </p>
          <div className="mt-3 flex justify-center">
            <ActionButtons />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminStudentsTable() {
  const locale = useAdminLocale();
  return (
    <TableShell headers={["ID", adminT(locale, "nav.students"), "Grade", "Class", "", ""]}>
      {studentResults.slice(0, 8).map((student, index) => (
        <tr key={student.id} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-3.5 text-sm text-muted-foreground khmer-num">
            {toKhmerNumerals(index + 1)}
          </td>
          <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
            {locale === "km" ? student.name.km : student.name.en}
          </td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">
            {locale === "km" ? `ថ្នាក់ទី ${toKhmerNumerals(student.grade)}` : `Grade ${student.grade}`}
          </td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">{student.className}</td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">{student.academicYear}</td>
          <td className="px-5 py-3.5 text-right">
            <ActionButtons />
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

export function AdminResultsTable() {
  const locale = useAdminLocale();
  return (
    <TableShell
      headers={[
        adminT(locale, "nav.students"),
        "Mathematics",
        "Khmer",
        "English",
        "Science",
        adminT(locale, "dashboard.recentResults"),
      ]}
    >
      {studentResults.slice(0, 8).map((result) => (
        <tr key={result.id} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
            {locale === "km" ? result.name.km : result.name.en}
          </td>
          {result.subjects.map((subject) => (
            <td key={subject.subject.en} className="px-5 py-3.5 text-sm text-muted-foreground khmer-num">
              {formatScore(subject.score, locale)}
            </td>
          ))}
          <td className="px-5 py-3.5 text-sm font-bold text-foreground khmer-num">
            {formatScore(result.average, locale)}
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

export function AdminGalleryGrid() {
  const locale = useAdminLocale();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {gallery.map((item) => (
        <div key={item.id} className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="relative aspect-[4/3]">
            <Image src={item.image} alt="" fill sizes="25vw" className="object-cover" />
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                aria-label="Edit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-muted-foreground shadow hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Delete"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-muted-foreground shadow hover:text-creeper"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="p-3">
            <p className="truncate text-xs font-semibold text-foreground">
              {locale === "km" ? item.title.km : item.title.en}
            </p>
            <p className="mt-0.5 text-[11px] capitalize text-muted-foreground">{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminPagesTable() {
  const locale = useAdminLocale();
  const pageLabels: Record<string, { en: string; km: string }> = {
    about: { en: "About", km: "អំពីសាលា" },
    academics: { en: "Academics", km: "ការសិក្សា" },
    students: { en: "Students", km: "សិស្សានុសិស្ស" },
    teachers: { en: "Teachers", km: "លោកគ្រូ អ្នកគ្រូ" },
    news: { en: "News", km: "ព័ត៌មាន" },
    events: { en: "Events", km: "ព្រឹត្តិការណ៍" },
    gallery: { en: "Gallery", km: "វិចិត្រសាល" },
    contact: { en: "Contact", km: "ទំនាក់ទំនង" },
  };
  const pages = [
    { key: "about", route: "/about" },
    { key: "academics", route: "/academics" },
    { key: "students", route: "/students" },
    { key: "teachers", route: "/teachers" },
    { key: "news", route: "/news" },
    { key: "events", route: "/events" },
    { key: "gallery", route: "/gallery" },
    { key: "contact", route: "/contact" },
  ] as const;
  return (
    <TableShell headers={[adminT(locale, "nav.pages"), "Route", "Status", ""]}>
      {pages.map((page) => (
        <tr key={page.key} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {locale === "km" ? pageLabels[page.key].km : pageLabels[page.key].en}
            </span>
          </td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">{page.route}</td>
          <td className="px-5 py-3.5">
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
              {locale === "km" ? "បានផ្សព្វផ្សាយ" : "Published"}
            </span>
          </td>
          <td className="px-5 py-3.5 text-right">
            <ActionButtons />
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

export function AdminSettingsForm() {
  const locale = useAdminLocale();
  const fields = [
    { key: "schoolName", label: { en: "School name", km: "ឈ្មោះសាលា" }, value: "Hun Sen Kampong Tralach High School" },
    { key: "phone", label: { en: "Phone", km: "ទូរស័ព្ទ" }, value: "+855 12 345 678" },
    { key: "email", label: { en: "Email", km: "អ៊ីមែល" }, value: "info@hskth.edu.kh" },
    { key: "address", label: { en: "Address", km: "អាសយដ្ឋាន" }, value: "Kampong Tralach, Kampong Chhnang" },
  ];
  return (
    <div className="max-w-2xl space-y-5 rounded-xl border border-border bg-white p-6 shadow-sm">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {locale === "km" ? field.label.km : field.label.en}
          </label>
          <input
            type="text"
            defaultValue={field.value}
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </div>
      ))}
      <button
        type="button"
        className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
      >
        {locale === "km" ? "រក្សាទុកការកំណត់" : "Save settings"}
      </button>
      <p className="text-xs text-muted-foreground">
        {galleryCategories.map((category) => category.label.en).join(" · ")}
      </p>
    </div>
  );
}