import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { academicPrograms } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";

interface AcademicsPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: AcademicsPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/academics",
      t("pages.academicsTitle"),
      t("academics.description"),
    );
  });
}

export default async function AcademicsPage({ params }: AcademicsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("academics.eyebrow")}
        title={t("pages.academicsTitle")}
        description={t("academics.description")}
        image="/images/academics/grade-12.svg"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="space-y-16">
            {academicPrograms.map((program, index) => (
              <Reveal key={program.id}>
                <article
                  id={program.id}
                  className="grid scroll-mt-32 items-center gap-8 lg:grid-cols-2 lg:gap-14"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative overflow-hidden rounded-xl shadow-card">
                      <Image
                        src={program.image}
                        alt={locale === "km" ? program.title.km : program.title.en}
                        width={900}
                        height={640}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="inline-flex rounded-full bg-navy px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                      {locale === "km" ? program.grade.km : program.grade.en}
                    </p>
                    <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                      {locale === "km" ? program.title.km : program.title.en}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {locale === "km" ? program.description.km : program.description.en}
                    </p>
                    <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      {locale === "km" ? "មុខវិជ្ជាស្នូល" : "Core subjects"}
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {program.subjects.map((subject) => (
                        <li
                          key={subject.en}
                          className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                          {locale === "km" ? subject.km : subject.en}
                        </li>
                      ))}
                    </ul>
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