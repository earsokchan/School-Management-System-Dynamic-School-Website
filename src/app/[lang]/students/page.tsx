import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
import { StudentLife } from "@/components/home/StudentLife";
import { StudentResults } from "@/components/home/StudentResults";
import { GallerySection } from "@/components/home/GallerySection";
import { CTASection } from "@/components/home/CTASection";

interface StudentsPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: StudentsPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/students",
      t("pages.studentsTitle"),
      t("studentLife.description"),
    );
  });
}

export default async function StudentsPage({ params }: StudentsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("studentLife.eyebrow")}
        title={t("pages.studentsTitle")}
        description={t("studentLife.description")}
        image="/images/students/sports.svg"
      />
      <StudentLife locale={locale} />
      <StudentResults locale={locale} />
      <GallerySection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}