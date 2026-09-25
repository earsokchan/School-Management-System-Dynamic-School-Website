import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import type { AcademicProgram } from "@/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AcademicPrograms({ locale, items }: { locale: Locale; items: AcademicProgram[] }) {
  const { t } = getTranslations(locale);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="programs-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            locale={locale}
            eyebrowKey="academics.eyebrow"
            title={t("academics.title")}
            description={t("academics.description")}
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((program, index) => (
            <Reveal key={program.id} delay={(index % 3) * 90}>
              <a
                href={`/${locale}/academics#${program.id}`}
                className="group relative block h-[420px] overflow-hidden rounded-xl shadow-card"
              >
                <Image
                  src={program.image}
                  alt={locale === "km" ? program.title.km : program.title.en}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                    <span className="h-[3px] w-6 rounded-full bg-creeper" aria-hidden="true" />
                    {locale === "km" ? program.grade.km : program.grade.en}
                  </p>
                  <h3 className="text-xl font-bold text-white">
                    {locale === "km" ? program.title.km : program.title.en}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-primary-foreground/80">
                    {locale === "km" ? program.description.km : program.description.en}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    {t("academics.viewProgram")}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <ButtonLink
            href={`/${locale}/academics`}
            variant="navy"
            icon={ArrowRight}
          >
            {t("common.viewAll")}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}