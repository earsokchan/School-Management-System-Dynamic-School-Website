import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { getPublicTeachers } from "@/lib/server/public-content";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

interface TeachersPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: TeachersPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/teachers",
      t("pages.teachersTitle"),
      t("teachers.description"),
    );
  });
}

export default async function TeachersPage({ params }: TeachersPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const teacherItems = await getPublicTeachers();

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("teachers.eyebrow")}
        title={t("pages.teachersTitle")}
        description={t("teachers.description")}
        image="/images/teachers/teacher-1.svg"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {teacherItems.map((teacher, index) => (
              <Reveal key={teacher.id} delay={(index % 4) * 80}>
                <article className="group text-center">
                  <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full ring-4 ring-border shadow-card transition-transform duration-300 group-hover:scale-105 sm:h-52 sm:w-52">
                    <Image
                      src={teacher.photo}
                      alt={locale === "km" ? teacher.name.km : teacher.name.en}
                      fill
                      sizes="208px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-end justify-center bg-navy/0 pb-3 transition-colors duration-300 group-hover:bg-navy/30"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-foreground">
                    {locale === "km" ? teacher.name.km : teacher.name.en}
                  </h2>
                  <p className="text-sm font-semibold text-creeper">
                    {locale === "km" ? teacher.subject.km : teacher.subject.en}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("teachers.position")} — {locale === "km" ? teacher.position.km : teacher.position.en}
                  </p>
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