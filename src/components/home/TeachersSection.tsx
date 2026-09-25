import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import type { Teacher } from "@/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function TeachersSection({ locale, items }: { locale: Locale; items: Teacher[] }) {
  const { t } = getTranslations(locale);
  const featured = items.slice(0, 4);

  return (
    <section className="bg-secondary py-20 sm:py-28" aria-labelledby="teachers-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            locale={locale}
            eyebrowKey="teachers.eyebrow"
            title={t("teachers.title")}
            description={t("teachers.description")}
          />
          <Reveal className="shrink-0">
            <ButtonLink
              href={`/${locale}/teachers`}
              variant="outlineLight"
              icon={ArrowRight}
            >
              {t("teachers.allTeachers")}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {featured.map((teacher, index) => (
            <Reveal key={teacher.id} delay={index * 90}>
              <article className="group text-center">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-4 ring-white shadow-card transition-transform duration-300 group-hover:scale-105 sm:h-48 sm:w-48">
                  <Image
                    src={teacher.photo}
                    alt={locale === "km" ? teacher.name.km : teacher.name.en}
                    fill
                    sizes="(max-width: 640px) 160px, 192px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {locale === "km" ? teacher.name.km : teacher.name.en}
                </h3>
                <p className="text-sm font-medium text-creeper">
                  {locale === "km" ? teacher.subject.km : teacher.subject.en}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {locale === "km" ? teacher.position.km : teacher.position.en}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}