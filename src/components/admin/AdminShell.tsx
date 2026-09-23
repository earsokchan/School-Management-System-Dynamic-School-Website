"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Users,
  GraduationCap,
  Trophy,
  Images,
  FileText,
  Settings as SettingsIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  GraduationCap as Logo,
  Search,
  Info,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { adminT } from "@/lib/admin-translations";
import { adminNavItems } from "@/data/admin";
import { cn } from "@/lib/cn";

const AdminLocaleContext = createContext<Locale>("en");

export function useAdminLocale(): Locale {
  return useContext(AdminLocaleContext);
}

const navIcons: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  news: Newspaper,
  events: CalendarDays,
  teachers: Users,
  students: GraduationCap,
  results: Trophy,
  gallery: Images,
  pages: FileText,
  settings: SettingsIcon,
};

function AdminSidebar({
  locale,
  pathname,
  open,
  onClose,
}: {
  locale: Locale;
  pathname: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-black text-white transition-transform duration-300 lg:translate-x-0 font-notosans",
        open ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label={adminT(locale, "admin")}
    >
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
          <Logo className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="font-notosans text-sm font-bold leading-tight">
          {locale === "km" ? "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច" : "Hun Sen Kampong Tralach"}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 lg:hidden"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label={adminT(locale, "admin")}>
        <ul className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = navIcons[item.key];
            const active = pathname === item.href;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-white text-black" : "text-white/75 hover:bg-white/10 hover:text-white",
                    locale === "km" && "text-[15px]",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {locale === "km" ? item.label.km : item.label.en}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/en"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {adminT(locale, "common.viewSite")}
        </Link>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-creeper hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {adminT(locale, "common.logout")}
        </button>
      </div>
    </aside>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("km");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("hskth_admin_locale");
    if (saved === "en" || saved === "km") setLocale(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("hskth_admin_locale", locale);
  }, [locale]);

  return (
    <AdminLocaleContext.Provider value={locale}>
      <div className="min-h-screen bg-secondary font-notosans">
        <AdminSidebar
          locale={locale}
          pathname={pathname}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
              {adminT(locale, "common.preview")}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-border bg-slate-50 px-3 py-1.5 sm:flex">
                <Search className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">{adminT(locale, "common.search")}</span>
              </div>

              <div
                role="group"
                aria-label="Admin language / ភាសាអ្នកគ្រប់គ្រង"
                className="inline-flex overflow-hidden rounded-full border border-border"
              >
                <button
                  type="button"
                  onClick={() => setLocale("km")}
                  aria-pressed={locale === "km"}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold transition-colors",
                    locale === "km" ? "bg-black text-white" : "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  ខ្មែរ
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold transition-colors",
                    locale === "en" ? "bg-black text-white" : "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  EN
                </button>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminLocaleContext.Provider>
  );
}

export function AdminPreviewBanner() {
  const locale = useAdminLocale();
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-amber-800">{adminT(locale, "dashboard.note")}</p>
    </div>
  );
}