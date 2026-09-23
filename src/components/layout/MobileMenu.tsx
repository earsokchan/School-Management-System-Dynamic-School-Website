"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { routePath, type RouteKey } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { pick } from "@/lib/i18n";

interface NavItem {
  route: RouteKey;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  nav: NavItem[];
}

export function MobileMenu({ open, onClose, locale, nav }: MobileMenuProps) {
  const { t } = getTranslations(locale);
  const pathname = usePathname();

  const isActive = (route: RouteKey) => {
    if (route === "home")
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === `/${locale}${routePath(route)}`;
  };

  const quickResults: { id: string; label: string; route: RouteKey }[] = [
    ...news.slice(0, 3).map((item) => ({
      id: item.id,
      label: pick(item.title, locale),
      route: "news" as const,
    })),
    ...events.slice(0, 3).map((item) => ({
      id: item.id,
      label: pick(item.title, locale),
      route: "events" as const,
    })),
  ];

  return (
    <Sheet open={open} onOpenChange={(next) => (!next ? onClose() : undefined)}>
      <SheetContent side="right" className="w-full max-w-sm gap-0 p-0 bg-background/95 backdrop-blur-xl border-l-white/20 shadow-2xl">
        <SheetHeader className="border-b border-border/50 px-5 py-4 text-left">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base font-semibold text-foreground">
              {locale === "km" ? "ម៉ឺនុយ" : "Menu"}
            </SheetTitle>
            <LanguageSwitcher locale={locale} variant="menu" />
          </div>
          <SheetDescription className="sr-only">
            {t("header.openMenu")}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <Button asChild className="mb-5 w-full rounded-md">
            <Link href={`/${locale}/results`} onClick={onClose}>
              <GraduationCap aria-hidden="true" />
              {t("nav.results")}
            </Link>
          </Button>

          <nav aria-label="Primary">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.route}>
                  <Link
                    href={`/${locale}${routePath(item.route)}`}
                    onClick={onClose}
                    aria-current={isActive(item.route) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors",
                      isActive(item.route)
                        ? "bg-accent font-semibold text-foreground"
                        : "text-foreground hover:bg-accent/60",
                      locale === "km" && "text-[16px]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator className="my-5" />

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("news.title")}
          </p>
          <ul className="space-y-2">
            {quickResults.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${locale}${routePath(item.route)}`}
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t px-5 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          {locale === "km"
            ? "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច"
            : "Hun Sen Kampong Tralach High School"}
        </div>
      </SheetContent>
    </Sheet>
  );
}