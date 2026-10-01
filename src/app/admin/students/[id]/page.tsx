import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowLeft, ChevronRight, GraduationCap, MapPin, Phone } from "lucide-react";
import { getCollectionDocument } from "@/lib/server/collections";
import { getAdminCollection } from "@/lib/server/admin-content";
import { StudentDetailActions } from "@/components/admin/StudentDetailActions";
import { cn } from "@/lib/cn";
import type { Student } from "@/lib/student-types";

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
    <section className="apple-card overflow-hidden">
      <header className="flex items-center gap-3 px-6 py-5 sm:px-7">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#6e6e73]">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">{title}</h2>
      </header>
      <dl className="border-t border-[#e8e8ed]">{children}</dl>
    </section>
  );
}

function Field({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  const empty = !value?.trim();
  return (
    <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-8 sm:px-7">
      <dt className="apple-label sm:w-44 sm:shrink-0">{label}</dt>
      <dd
        className={cn(
          "min-w-0 break-words text-[15px]",
          empty ? "italic text-[#86868b]" : "font-medium text-[#1d1d1f]",
          mono && !empty && "font-mono tracking-tight",
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
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-[13px] text-[#86868b]">
        <Link href="/admin/students" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#1d1d1f]">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Students
        </Link>
        <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="truncate font-medium text-[#1d1d1f]">{student.name}</span>
      </nav>

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1d1d1f]">
            Student Profile
          </h1>
          <p className="mt-1.5 text-[17px] text-[#6e6e73]">Review and manage this student record.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <StudentDetailActions student={student} availableClasses={availableClasses ?? []} />
        </div>
      </div>

      <div className="apple-canvas">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
          <aside className="apple-card px-6 py-8 text-center sm:px-8 lg:sticky lg:top-24">
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-[#f5f5f7] ring-1 ring-[#e8e8ed]">
              {student.photo ? (
                <Image
                  src={student.photo}
                  alt={student.name}
                  fill
                  sizes="128px"
                  priority
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-5xl font-medium text-[#86868b]">
                  {initials}
                </span>
              )}
            </div>

            <h2 className="mt-5 text-[24px] font-semibold leading-tight tracking-[-0.015em] text-[#1d1d1f]">
              {student.name}
            </h2>
            <p className="mt-1 font-mono text-[13px] tracking-tight text-[#86868b]">ID {student.studentId}</p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span
                className={cn(
                  "apple-chip",
                  isFemale ? "bg-[#fde7ec] text-[#b3113b]" : "bg-[#e6f0fd] text-[#0058b0]",
                )}
              >
                {student.gender || "Unspecified"}
              </span>
              <span className="apple-chip bg-[#f5f5f7] text-[#1d1d1f]">
                {isTechnology ? "Technology" : student.type || "Unspecified"}
              </span>
            </div>

            <dl className="mt-7 border-t border-[#e8e8ed] pt-1">
              {[
                { label: "Grade", value: student.grade },
                { label: "Class", value: student.className },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="apple-label">{item.label}</dt>
                  <dd className="apple-value">{item.value || "—"}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="space-y-6">
            <Section title="Academic" icon={GraduationCap}>
              {[
                { label: "Current Grade", value: student.grade },
                { label: "Class", value: student.className },
                { label: "Stream", value: student.type },
                { label: "Previous School", value: student.previousSchool },
              ].map((item) => (
                <div key={item.label} className="border-b border-[#e8e8ed] last:border-0">
                  <Field label={item.label} value={item.value} />
                </div>
              ))}
            </Section>

            <Section title={"Contact & Address"} icon={Phone}>
              <div className="border-b border-[#e8e8ed]">
                <Field label="Phone" value={student.phone} mono />
              </div>
              {hasAddress ? (
                addressFields.map((field) => (
                  <div key={field.label} className="border-b border-[#e8e8ed] last:border-0">
                    <Field label={field.label} value={field.value} />
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-3 px-6 py-5 sm:px-7">
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#86868b]" aria-hidden="true" />
                  <p className="text-[15px] text-[#86868b]">
                    No residential address has been recorded for this student.
                  </p>
                </div>
              )}
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
