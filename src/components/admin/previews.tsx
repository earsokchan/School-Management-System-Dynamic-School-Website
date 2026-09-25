"use client";

import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, MapPin, FileText, MoreHorizontal, Eye, Copy } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { adminT } from "@/lib/admin-translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { teachers } from "@/data/teachers";
import { studentResults } from "@/data/results";
import { gallery, galleryCategories } from "@/data/gallery";
import { academicPrograms } from "@/data/programs";
import { formatDate, formatScore } from "@/lib/format";
import { toKhmerNumerals } from "@/lib/i18n";

function ActionButtons({ editUrl }: { editUrl?: string }) {
  const locale = useAdminLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Actions"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-black data-[state=open]:bg-secondary"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 font-sans shadow-xl rounded-xl border-border/50">
        <DropdownMenuItem className="cursor-pointer gap-2 py-2" asChild>
          {editUrl ? (
            <Link href={editUrl}>
              <Pencil className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-medium">{locale === "km" ? "កែប្រែ" : "Edit"}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2">
              <Pencil className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-medium">{locale === "km" ? "កែប្រែ" : "Edit"}</span>
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 py-2">
          <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="font-medium">{locale === "km" ? "មើល" : "View"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 py-2">
          <Copy className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="font-medium">{locale === "km" ? "ចម្លង" : "Duplicate"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem className="cursor-pointer gap-2 py-2 text-red-600 focus:bg-red-50 focus:text-red-700">
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          <span className="font-bold">{locale === "km" ? "លុប" : "Delete"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
            {headers.map((header, index) => (
              <th
                key={index}
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

export function AdminTeachersTable() {
  const locale = useAdminLocale();
  return (
    <TableShell headers={["", adminT(locale, "nav.teachers"), "Subject", ""]}>
      {teachers.map((teacher) => (
        <tr key={teacher.id} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-2 w-16">
            <div className="relative h-10 w-10 overflow-hidden rounded-md border border-border">
              <Image
                src={teacher.photo}
                alt={locale === "km" ? teacher.name.km : teacher.name.en}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          </td>
          <td className="px-5 py-3.5 text-sm font-semibold text-foreground whitespace-nowrap">
            {locale === "km" ? teacher.name.km : teacher.name.en}
          </td>
          <td className="px-5 py-3.5 text-sm text-muted-foreground">
            {locale === "km" ? teacher.subject.km : teacher.subject.en}
          </td>
          <td className="px-5 py-3.5 text-right">
            <ActionButtons />
          </td>
        </tr>
      ))}
    </TableShell>
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
    home: { en: "Home Page Config", km: "ការកំណត់ទំព័រដើម" },
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
    { key: "home", route: "/admin/pages/home", custom: true },
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
            <ActionButtons editUrl={"custom" in page ? page.route : undefined} />
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

export function AdminAcademicsTable() {
  const locale = useAdminLocale();
  return (
    <TableShell headers={["Grade", "Title", "Subjects", ""]}>
      {academicPrograms.map((program) => (
        <tr key={program.id} className="transition-colors hover:bg-slate-50/60">
          <td className="px-5 py-3.5 text-sm font-semibold text-foreground whitespace-nowrap">
            {locale === "km" ? program.grade.km : program.grade.en}
          </td>
          <td className="px-5 py-3.5">
            <p className="text-sm font-medium text-foreground">
              {locale === "km" ? program.title.km : program.title.en}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {locale === "km" ? program.description.km : program.description.en}
            </p>
          </td>
          <td className="px-5 py-3.5">
            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
              {program.subjects.length} {locale === "km" ? "មុខវិជ្ជា" : "Subjects"}
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