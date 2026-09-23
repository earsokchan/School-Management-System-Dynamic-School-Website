import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  crumb?: string;
}

export function PageHero({
  locale,
  eyebrow,
  title,
  description,
  image = "/images/school/about.svg",
  crumb,
}: PageHeroProps) {
  const { t } = getTranslations(locale);

  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/90 to-navy/70"
        aria-hidden="true"
      />

      <Container className="relative">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-primary-foreground/70">
            <li>
              <Link href={`/${locale}`} className="transition-colors hover:text-gold">
                {t("pages.breadcrumbHome")}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-gold">
              {crumb ?? title}
            </li>
          </ol>
        </nav>

        <p className="eyebrow eyebrow-gold">{eyebrow}</p>
        <h1
          className={cn(
            "section-title mt-3 max-w-3xl text-white",
            locale === "km" ? "text-[2rem] sm:text-5xl" : "text-4xl sm:text-6xl",
          )}
        >
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}