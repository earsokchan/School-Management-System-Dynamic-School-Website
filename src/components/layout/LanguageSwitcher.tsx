"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LanguageSwitcherProps {
  locale: Locale;
  variant?: "header" | "menu";
}

function switchLocalePath(pathname: string, locale: Locale, search: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = segments[0] === "en" || segments[0] === "km";

  let newSegments = segments;
  if (hasLocale) {
    newSegments = [locale, ...segments.slice(1)];
  } else {
    newSegments = [locale, ...segments];
  }

  const path = `/${newSegments.join("/")}`;
  return search ? `${path}${search}` : path;
}

export function LanguageSwitcher({ locale, variant = "header" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams ? `?${searchParams.toString()}` : "";
  const enHref = switchLocalePath(pathname, "en", search);
  const kmHref = switchLocalePath(pathname, "km", search);

  return (
    <nav
      aria-label="Language switch / ការប្តូរភាសា"
      className={cn(
        "inline-flex items-center rounded-full",
        variant === "header"
          ? "border border-border bg-white/70 backdrop-blur"
          : "border border-white/20 bg-white/5",
      )}
    >
      <Link
        href={kmHref}
        lang="km"
        aria-current={locale === "km" ? "page" : undefined}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
          locale === "km"
            ? variant === "header"
              ? "bg-navy text-white"
              : "bg-gold text-foreground"
            : variant === "header"
              ? "text-muted-foreground hover:text-foreground"
              : "text-white/80 hover:text-white",
        )}
      >
        ខ្មែរ
      </Link>
      <span aria-hidden="true" className={cn("h-4 w-px", variant === "header" ? "bg-border" : "bg-white/25")} />
      <Link
        href={enHref}
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
          locale === "en"
            ? variant === "header"
              ? "bg-navy text-white"
              : "bg-gold text-foreground"
            : variant === "header"
              ? "text-muted-foreground hover:text-foreground"
              : "text-white/80 hover:text-white",
        )}
      >
        EN
      </Link>
    </nav>
  );
}