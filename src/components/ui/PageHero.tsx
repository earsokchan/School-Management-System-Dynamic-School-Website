import Image from "next/image";
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
    <section className="relative overflow-hidden border-b border-border bg-white">


      <Container className="relative py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <li>
                  <Link href={`/${locale}`} className="transition-colors hover:text-foreground">
                    {t("pages.breadcrumbHome")}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="font-semibold text-gold">
                  {crumb ?? title}
                </li>
              </ol>
            </nav>

            <p className="eyebrow eyebrow-gold">{eyebrow}</p>
            <h1
              className={cn(
                "section-title mt-3 max-w-3xl text-foreground",
                locale === "km" ? "text-[2rem] sm:text-5xl" : "text-4xl sm:text-6xl",
              )}
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>

          <div className="hidden lg:block">
            <div className="relative ml-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-card">
              <Image
                src={image}
                alt=""
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}