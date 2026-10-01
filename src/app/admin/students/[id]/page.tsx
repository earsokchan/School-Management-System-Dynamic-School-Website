import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowLeft, Building2, ChevronRight, GraduationCap, MapPin, Phone } from "lucide-react";
import { getCollectionDocument } from "@/lib/server/collections";
import { getAdminCollection } from "@/lib/server/admin-content";
import { StudentDetailActions } from "@/components/admin/StudentDetailActions";
import { cn } from "@/lib/cn";
import type { Student } from "@/components/admin/StudentManager";

export const metadata: Metadata = { title: "Student Profile", robots: { index: false } };

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <header className="flex items-center gap-3 border-b border-border bg-slate-50 px-5 py-3.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
      </header>
      <dl className="divide-y divide-slate-100">{children}</dl>
    </section>
  );
}

function Field({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  const empty = !value?.trim();
  return (
    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:items-baseline sm:gap-6">
      <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "min-w-0 break-words text-sm",
          empty ? "italic text-muted-foreground" : "font-semibold text-foreground",
          mono && !empty && "font-mono",
        )}
      >
        {empty ? "Not provided" : value}
      </dd>
    </div>
  );
}

export default async function AdminStudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [student, availableClasses] = await Promise.all([
    getCollectionDocument<Student>("admin-students", id),
    getAdminCollection<{ id: string; name: string; grade: string }>("classes"),
  ]);

  if (!student) {
    notFound();
  }

  const isFemale = student.gender === "Female";
  const isTechnology = student.type === "Technology";
  const addressFields = [
    { label: "Village", value: student.addressVillage },
    { label: "City", value: student.addressCity },
    { label: "Province", value: student.addressProvince },
    { label: "Country", value: student.addressCountry },
  ];
  const hasAddress = addressFields.some((field) => field.value?.trim());
  const initials = (student.name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Students
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate font-medium text-foreground">{student.name}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">Student Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review and manage this student record.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StudentDetailActions student={student} availableClasses={availableClasses ?? []} />
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
        <aside className="rounded-xl border border-border bg-white p-6 text-center shadow-sm lg:sticky lg:top-24">
          <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50">
            {student.photo ? (
              <Image
                src={student.photo}
                alt={student.name}
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-4xl font-semibold text-muted-foreground">
                {initials}
              </span>
            )}
          </div>

          <h2 className="mt-4 font-sans text-xl font-bold tracking-tight text-foreground">{student.name}</h2>
          <p className="mt-1 font-mono text-sm text-muted-foreground">ID {student.studentId}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                isFemale ? "bg-pink-50 text-pink-700" : "bg-blue-50 text-blue-700",
              )}
            >
              {student.gender || "Unspecified"}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                isTechnology ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600",
              )}
            >
              {student.type || "Unspecified"}
            </span>
          </div>

          <dl className="mt-6 divide-y divide-slate-100 border-t border-border text-left">
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Grade</dt>
              <dd className="text-sm font-semibold text-foreground">{student.grade || "—"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Class</dt>
              <dd className="text-sm font-semibold text-foreground">{student.className || "—"}</dd>
            </div>
          </dl>
        </aside>

        <div className="space-y-6">
          <Section title="Academic" icon={GraduationCap}>
            <Field label="Current Grade" value={student.grade} />
            <Field label="Class" value={student.className} />
            <Field label="Stream" value={student.type} />
            <Field label="Previous School" value={student.previousSchool} />
          </Section>

          <Section title="Contact & Address" icon={Phone}>
            <Field label="Phone" value={student.phone} mono />
            {hasAddress ? (
              addressFields.map((field) => (
                <Field key={field.label} label={field.label} value={field.value} />
              ))
            ) : (
              <div className="flex items-start gap-3 px-5 py-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  No residential address has been recorded for this student.
                </p>
              </div>
            )}
          </Section>

          <section className="rounded-xl border border-dashed border-border bg-slate-50/60 p-5">
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Student records are stored per academic year. Use{" "}
                <Link href="/admin/students" className="font-semibold text-foreground underline-offset-4 hover:underline">
                  Students
                </Link>{" "}
                to browse, import, or export the full roster.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
