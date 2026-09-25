"use client";

import { Plus } from "lucide-react";
import { adminT } from "@/lib/admin-translations";
import { useAdminLocale } from "@/components/admin/AdminShell";

export function AdminPageHeader({
  titleKey,
  subtitleKey,
}: {
  titleKey: string;
  subtitleKey?: string;
}) {
  const locale = useAdminLocale();

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-sans text-2xl font-bold text-foreground">{adminT(locale, titleKey)}</h1>
        {subtitleKey ? (
          <p className="mt-1 text-sm text-muted-foreground">{adminT(locale, subtitleKey)}</p>
        ) : null}
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {adminT(locale, "common.newItem")}
      </button>
    </div>
  );
}