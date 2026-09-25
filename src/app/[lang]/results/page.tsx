import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
import { StudentResults } from "@/components/home/StudentResults";
import { getPublicResults } from "@/lib/server/public-content";

export const revalidate = 60;

interface ResultsPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/results",
      t("pages.resultsTitle"),
      t("results.description"),
    );
  });
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const resultItems = await getPublicResults();

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("results.eyebrow")}
        title={t("pages.resultsTitle")}
        description={t("results.description")}
        image="/images/academics/grade-12.svg"
      />
      <StudentResults locale={locale} items={resultItems} />
    </>
  );
}