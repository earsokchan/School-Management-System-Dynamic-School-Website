import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { news } from "@/data/news";
import { formatDateShort } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function NewsSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);
  const featured = news.filter((item) => item.featured)[0] ?? news[0];
  const rest = news.filter((item) => item.id !== featured.id).slice(0, 4);

  return (
    <section className="bg-secondary py-20 sm:py-28" aria-labelledby="news-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            locale={locale}
            eyebrowKey="news.eyebrow"
            title={t("news.title")}
            description={t("news.description")}
          />
          <Reveal className="shrink-0">
            <ButtonLink
              href={`/${locale}/news`}
              variant="outlineLight"
              icon={ArrowRight}
            >
              {t("news.allNews")}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Featured */}
          <Reveal>
            <Link
              href={`/${locale}/news#${featured.id}`}
              className="group relative block h-full min-h-[380px] overflow-hidden rounded-xl shadow-card lg:min-h-[520px]"
            >
              <Image
                src={featured.image}
                alt={locale === "km" ? featured.title.km : featured.title.en}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-creeper px-3 py-1 text-xs font-bold text-white">
                    {t("news.featured")}
                  </span>
                  <span className="rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
                    {locale === "km" ? featured.category.km : featured.category.en}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {locale === "km" ? featured.title.km : featured.title.en}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
                  {locale === "km" ? featured.excerpt.km : featured.excerpt.en}
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs font-medium text-gold">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {formatDateShort(featured.date, locale)}
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Smaller cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <Link
                  href={`/${locale}/news#${item.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card card-hover"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={locale === "km" ? item.title.km : item.title.en}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                      {locale === "km" ? item.category.km : item.category.en}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-base font-bold text-foreground">
                      {locale === "km" ? item.title.km : item.title.en}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {locale === "km" ? item.excerpt.km : item.excerpt.en}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDateShort(item.date, locale)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}