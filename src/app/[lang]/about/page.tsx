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

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("about.eyebrow")}
        title={t("pages.aboutTitle")}
        description={t("about.description")}
        image="/images/school/about.svg"
      />
      <AboutSection locale={locale} />
      <FeaturesSection locale={locale} />
      <CampusSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}