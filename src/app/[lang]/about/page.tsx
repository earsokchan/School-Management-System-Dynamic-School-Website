import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
import { AboutSection } from "@/components/home/AboutSection";
import { CampusSection } from "@/components/home/CampusSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { getAboutContent } from "@/lib/server/public-content";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: AboutPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/about",
      t("pages.aboutTitle"),
      t("about.description"),
    );
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const ac = await getAboutContent();

  const heroEyebrow = locale === "km" ? (ac?.heroEyebrowKm || t("about.eyebrow")) : (ac?.heroEyebrowEn || t("about.eyebrow"));
  const heroTitle = locale === "km" ? (ac?.heroTitleKm || t("pages.aboutTitle")) : (ac?.heroTitleEn || t("pages.aboutTitle"));
  const heroDesc = locale === "km" ? (ac?.heroDescKm || t("about.description")) : (ac?.heroDescEn || t("about.description"));
  const heroImage = ac?.heroImageUrl || "/images/school/about.svg";

  const showHero = ac?.sectionHero ?? true;
  const showAbout = ac?.sectionAbout ?? true;
  const showFeatures = ac?.sectionFeatures ?? true;
  const showCampus = ac?.sectionCampus ?? true;
  const showCta = ac?.sectionCta ?? true;

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
      {showAbout && <AboutSection locale={locale} aboutContent={ac} />}
      {showFeatures && <FeaturesSection locale={locale} aboutContent={ac} />}
      {showCampus && <CampusSection locale={locale} aboutContent={ac} />}
      {showCta && <CTASection locale={locale} aboutContent={ac} />}
    </>
  );
}