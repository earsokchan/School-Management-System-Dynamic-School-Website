import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { facilities } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutContent } from "@/components/admin/AboutPageEditor";

export function CampusSection({
  locale,
  aboutContent,
}: {
  locale: Locale;
  aboutContent?: AboutContent | null;
}) {
  const { t } = getTranslations(locale);
  const ac = aboutContent;

  const eyebrow = locale === "km" ? (ac?.campusEyebrowKm || t("campus.eyebrow")) : (ac?.campusEyebrowEn || t("campus.eyebrow"));
  const title = locale === "km" ? (ac?.campusTitleKm || t("campus.title")) : (ac?.campusTitleEn || t("campus.title"));
  const description = locale === "km" ? (ac?.campusDescKm || t("campus.description")) : (ac?.campusDescEn || t("campus.description"));

  const stat1Num = ac?.campusStat1Num || "35+";
  const stat1Label = locale === "km" ? (ac?.campusStat1LabelKm || "បន្ទប់រៀន") : (ac?.campusStat1LabelEn || "Classrooms");

  const stat2Num = ac?.campusStat2Num || "6";
  const stat2Label = locale === "km" ? (ac?.campusStat2LabelKm || "ទីលានកីឡា") : (ac?.campusStat2LabelEn || "Sports areas");

  const dynamicFacilities = facilities.map((f, i) => {
    const n = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    return {
      ...f,
      name: {
        en: (ac?.[`fac${n}TitleEn` as keyof AboutContent] as string) || f.name.en,
        km: (ac?.[`fac${n}TitleKm` as keyof AboutContent] as string) || f.name.km,
      },
      description: {
        en: (ac?.[`fac${n}DescEn` as keyof AboutContent] as string) || f.description.en,
        km: (ac?.[`fac${n}DescKm` as keyof AboutContent] as string) || f.description.km,
      },
    };
  });

  return (
    <section className="py-20 sm:py-28" aria-labelledby="campus-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              locale={locale}
              eyebrowKey="campus.eyebrow"
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-navy p-6 text-white">
                <p className="font-khmer text-4xl font-bold text-gold">{stat1Num}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  {stat1Label}
                </p>
              </div>
              <div className="rounded-xl bg-secondary p-6">
                <p className="font-khmer text-4xl font-bold text-foreground">{stat2Num}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat2Label}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {dynamicFacilities.slice(0, 4).map((facility, index) => (
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
          {dynamicFacilities.slice(4).map((facility, index) => (
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