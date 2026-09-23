import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { events } from "@/data/events";
import { formatDay, formatMonthShort } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

export function EventsSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);
  const upcoming = events.slice(0, 3);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="events-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            locale={locale}
            eyebrowKey="events.eyebrow"
            title={t("events.title")}
            description={t("events.description")}
          />
          <Reveal className="shrink-0">
            <ButtonLink
              href={`/${locale}/events`}
              variant="outlineLight"
              icon={ArrowRight}
            >
              {t("events.allEvents")}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {upcoming.map((event, index) => (
            <Reveal key={event.id} delay={index * 90}>
              <Link
                href={`/${locale}/events#${event.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={locale === "km" ? event.title.km : event.title.en}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <h3 className="mt-2 text-lg font-bold text-foreground">
                    {locale === "km" ? event.title.km : event.title.en}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {locale === "km" ? event.description.km : event.description.en}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-foreground/60" aria-hidden="true" />
                      <span className={cn(locale === "km" && "text-[13px]")}>
                        {t("events.time")}: {locale === "km" ? event.time.km : event.time.en}
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60" aria-hidden="true" />
                      <span className={cn(locale === "km" && "text-[13px]")}>
                        {t("events.locationLabel")}: {locale === "km" ? event.location.km : event.location.en}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}