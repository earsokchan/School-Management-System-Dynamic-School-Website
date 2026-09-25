import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { getPublicEvents } from "@/lib/server/public-content";
import { formatDate, formatDay, formatMonthShort } from "@/lib/format";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

interface EventsPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: EventsPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/events",
      t("pages.eventsTitle"),
      t("events.description"),
    );
  });
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const eventItems = await getPublicEvents();

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("events.eyebrow")}
        title={t("pages.eventsTitle")}
        description={t("events.description")}
        image="/images/events/khmer-new-year.svg"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {eventItems.map((event, index) => (
              <Reveal key={event.id} delay={(index % 2) * 90}>
                <article
                  id={event.id}
                  className="flex h-full scroll-mt-32 flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card lg:flex-row"
                >
                  <div className="relative h-52 shrink-0 lg:h-auto lg:w-64">
                    <Image
                      src={event.image}
                      alt={locale === "km" ? event.title.km : event.title.en}
                      fill
                      sizes="(max-width: 1024px) 100vw, 256px"
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white px-3 py-2 shadow-card">
                      <span className="text-lg font-bold leading-none text-creeper khmer-num">
                        {formatDay(event.date)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                        {formatMonthShort(event.date, locale)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold">
                      {locale === "km" ? event.category.km : event.category.en}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-foreground">
                      {locale === "km" ? event.title.km : event.title.en}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {locale === "km" ? event.description.km : event.description.en}
                    </p>
                    <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 shrink-0 text-foreground/60" aria-hidden="true" />
                        <span>
                          {t("events.date")}: {formatDate(event.date, locale)}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0 text-foreground/60" aria-hidden="true" />
                        <span>
                          {t("events.time")}: {locale === "km" ? event.time.km : event.time.en}
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60" aria-hidden="true" />
                        <span>
                          {t("events.locationLabel")}: {locale === "km" ? event.location.km : event.location.en}
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection locale={locale} />
    </>
  );
}