import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { schoolName } from "@/lib/site";
import { cn } from "@/lib/cn";

interface SchoolLogoProps {
  locale: Locale;
  href: string;
  variant?: "dark" | "light";
  compact?: boolean;
}

export function SchoolLogo({
  locale,
  href,
  variant = "dark",
  compact = false,
}: SchoolLogoProps) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-center gap-3 rounded-md transition-opacity hover:opacity-90"
      aria-label={schoolName[locale]}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-sm ring-2",
          variant === "dark" ? "ring-gold" : "ring-gold",
        )}
      >
        <Image
          src="/images/school/logo.png"
          alt=""
          width={96}
          height={96}
          className="h-full w-full rounded-full object-contain"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "font-khmer truncate text-[15px] font-bold",
            variant === "dark" ? "text-foreground" : "text-white",
          )}
          style={locale === "km" ? { whiteSpace: "normal", lineHeight: 1.4 } : undefined}
        >
          {schoolName[locale]}
        </span>
        {!compact ? (
          <span
            className={cn(
              "flex items-center gap-1 truncate text-[10.5px] font-semibold uppercase tracking-[0.14em]",
              variant === "dark" ? "text-muted-foreground" : "text-white/70",
            )}
          >
            <Crown className="h-3 w-3 text-gold" aria-hidden="true" />
            {locale === "km" ? "Kampong Chhnang, Cambodia" : "Kampong Tralach, Kampong Chhnang"}
          </span>
        ) : null}
      </span>
    </Link>
  );
}