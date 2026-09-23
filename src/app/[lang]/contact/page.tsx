import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
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

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("contact.eyebrow")}
        title={t("pages.contactTitle")}
        description={t("contact.description")}
        image="/images/school/about.svg"
      />
      <ContactSection locale={locale} />
      <LocationSection locale={locale} />
    </>
  );
}