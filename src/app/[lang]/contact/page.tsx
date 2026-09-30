import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
import { getContactPageContent } from "@/lib/server/public-content";
import { ContactSection } from "@/components/home/ContactSection";
import { LocationSection } from "@/components/home/LocationSection";

interface ContactPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: ContactPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/contact",
      t("pages.contactTitle"),
      t("contact.description"),
    );
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const pc = await getContactPageContent();

  const heroEyebrow = locale === "km" ? (pc?.heroEyebrowKm || t("contact.eyebrow")) : (pc?.heroEyebrowEn || t("contact.eyebrow"));
  const heroTitle = locale === "km" ? (pc?.heroTitleKm || t("pages.contactTitle")) : (pc?.heroTitleEn || t("pages.contactTitle"));
  const heroDesc = locale === "km" ? (pc?.heroDescKm || t("contact.description")) : (pc?.heroDescEn || t("contact.description"));
  const heroImage = pc?.heroImageUrl || "/images/school/about.svg";

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDesc}
        image={heroImage}
      />
      <ContactSection locale={locale} />
      <LocationSection locale={locale} />
    </>
  );
}