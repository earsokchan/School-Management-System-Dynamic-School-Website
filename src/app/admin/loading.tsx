"use client";

import { usePathname } from "next/navigation";
import { usesEdgeToEdgeLayout } from "@/lib/admin-layout";

export default function AdminLoading() {
  const pathname = usePathname();
  const edgeToEdge = usesEdgeToEdgeLayout(pathname ?? "");

  return (
    <div className={edgeToEdge ? "min-h-[70vh]" : "p-4 sm:p-6 lg:p-8"}>
      <span className="sr-only">Loading…</span>
      <div className="animate-pulse" aria-hidden="true">
        <div className="space-y-3">
          <div className="h-8 w-52 rounded-lg bg-slate-200/70" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-slate-200/50" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="h-10 w-28 rounded-full bg-slate-200/70" />
          <div className="h-10 w-28 rounded-full bg-slate-200/70" />
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div className="h-72 rounded-2xl border border-border bg-white" />
          <div className="space-y-6">
            <div className="h-44 rounded-2xl border border-border bg-white" />
            <div className="h-56 rounded-2xl border border-border bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}