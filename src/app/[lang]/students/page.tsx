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
import { getPublicGallery, getPublicResults, getStudentsContent } from "@/lib/server/public-content";

export const revalidate = 60;

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
  const [galleryItems, resultItems, sc] = await Promise.all([
    getPublicGallery(),
    getPublicResults(),
    getStudentsContent(),
  ]);

  const heroEyebrow = locale === "km" ? (sc?.heroEyebrowKm || t("studentLife.eyebrow")) : (sc?.heroEyebrowEn || t("studentLife.eyebrow"));
  const heroTitle = locale === "km" ? (sc?.heroTitleKm || t("pages.studentsTitle")) : (sc?.heroTitleEn || t("pages.studentsTitle"));
  const heroDesc = locale === "km" ? (sc?.heroDescKm || t("studentLife.description")) : (sc?.heroDescEn || t("studentLife.description"));
  const heroImage = sc?.heroImageUrl || "/images/students/sports.svg";

  const showHero = sc?.sectionHero ?? true;
  const showStudentLife = sc?.sectionStudentLife ?? true;
  const showResults = sc?.sectionResults ?? true;
  const showGallery = sc?.sectionGallery ?? true;
  const showCta = sc?.sectionCta ?? true;

  return (
    <>
      {showHero && (
        <PageHero
          locale={locale}
          eyebrow={heroEyebrow}
          title={heroTitle}
          description={heroDesc}
          image={heroImage}
        />
      )}
      {showStudentLife && <StudentLife locale={locale} studentsContent={sc} />}
      {showResults && <StudentResults locale={locale} items={resultItems} studentsContent={sc} />}
      {showGallery && <GallerySection locale={locale} items={galleryItems} studentsContent={sc} />}
      {showCta && <CTASection locale={locale} />}
    </>
  );
}