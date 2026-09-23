import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { facilities } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function CampusSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="campus-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              locale={locale}
              eyebrowKey="campus.eyebrow"
              title={t("campus.title")}
              description={t("campus.description")}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-navy p-6 text-white">
                <p className="font-khmer text-4xl font-bold text-gold">35+</p>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  {locale === "km" ? "បន្ទប់រៀន" : "Classrooms"}
                </p>
              </div>
              <div className="rounded-xl bg-secondary p-6">
                <p className="font-khmer text-4xl font-bold text-foreground">6</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {locale === "km" ? "ទីលានកីឡា" : "Sports areas"}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {facilities.slice(0, 4).map((facility, index) => (
              <Reveal key={facility.id} delay={index * 80}>
                <article className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-card">
                  <Image
                    src={facility.image}
                    alt={locale === "km" ? facility.name.km : facility.name.en}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-lg font-bold text-white">
                      {locale === "km" ? facility.name.km : facility.name.en}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-primary-foreground/80">
                      {locale === "km" ? facility.description.km : facility.description.en}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {facilities.slice(4).map((facility, index) => (
            <Reveal key={facility.id} delay={index * 80}>
              <article className="flex items-center gap-5 rounded-xl border border-border bg-secondary p-6 card-hover">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={facility.image}
                    alt={locale === "km" ? facility.name.km : facility.name.en}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {locale === "km" ? facility.name.km : facility.name.en}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {locale === "km" ? facility.description.km : facility.description.en}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}