"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { X, Search, FileText, CalendarDays } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { routePath } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { formatDate } from "@/lib/format";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

interface Result {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  type: "news" | "events" | "page";
}

interface PageResult {
  route: Parameters<typeof routePath>[0];
}

function pages(): PageResult[] {
  return [
    { route: "about" },
    { route: "academics" },
    { route: "students" },
    { route: "teachers" },
    { route: "news" },
    { route: "events" },
    { route: "gallery" },
    { route: "contact" },
    { route: "results" },
  ];
}

export function SearchOverlay({ open, onClose, locale }: SearchOverlayProps) {
  const { t } = getTranslations(locale);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();

    const pageResults: Result[] = pages().flatMap(({ route }) => {
      const label = t(`nav.${route}`);
      if (!label.toLowerCase().includes(q)) return [];
      return [
        {
          id: `page-${route}`,
          label,
          sublabel: t("header.searchTitle"),
          href: `/${locale}${routePath(route)}`,
          type: "page" as const,
        },
      ];
    });

    const newsResults: Result[] = news
      .filter((item) => pick(item.title, locale).toLowerCase().includes(q))
      .map((item) => ({
        id: item.id,
        label: pick(item.title, locale),
        sublabel: `${t("news.eyebrow")} · ${formatDate(item.date, locale)}`,
        href: `/${locale}${routePath("news")}#${item.id}`,
        type: "news" as const,
      }));

    const eventResults: Result[] = events
      .filter((item) => pick(item.title, locale).toLowerCase().includes(q))
      .map((item) => ({
        id: item.id,
        label: pick(item.title, locale),
        sublabel: `${t("events.eyebrow")} · ${formatDate(item.date, locale)}`,
        href: `/${locale}${routePath("events")}#${item.id}`,
        type: "events" as const,
      }));

    return [...pageResults, ...newsResults, ...eventResults].slice(0, 10);
  }, [query, locale, t]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/70 backdrop-blur-sm">
      <button
        type="button"
        aria-label={t("gallery.close")}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("header.resultsTitle")}
        className="relative z-10 mt-16 w-full max-w-2xl rounded-xl bg-white p-4 shadow-lift sm:mt-24 sm:p-6"
      >
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="h-5 w-5 shrink-0 text-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("header.searchPlaceholder")}
            aria-label={t("header.search")}
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("gallery.close")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto pt-3">
          {query.trim() === "" ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{t("header.resultsTitle")}</p>
          ) : results.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{t("header.noResults")}</p>
          ) : (
            <ul className="space-y-1">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-foreground group-hover:bg-gold/20">
                      {result.type === "news" ? (
                        <FileText className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{result.label}</span>
                      <span className="block text-xs text-muted-foreground">{result.sublabel}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}