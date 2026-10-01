import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
import { getPublicGallery, getGalleryPageContent } from "@/lib/server/public-content";
import { GallerySection } from "@/components/home/GallerySection";

export const revalidate = 60;

interface GalleryPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/gallery",
      t("pages.galleryTitle"),
      t("gallery.description"),
    );
  });
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const galleryItems = await getPublicGallery();
  const pc = await getGalleryPageContent();

  const heroEyebrow = locale === "km" ? (pc?.heroEyebrowKm || t("gallery.eyebrow")) : (pc?.heroEyebrowEn || t("gallery.eyebrow"));
  const heroTitle = locale === "km" ? (pc?.heroTitleKm || t("pages.galleryTitle")) : (pc?.heroTitleEn || t("pages.galleryTitle"));
  const heroDesc = locale === "km" ? (pc?.heroDescKm || t("gallery.description")) : (pc?.heroDescEn || t("gallery.description"));
  const heroImage = pc?.heroImageUrl || "/images/gallery/g-1.svg";

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDesc}
        image={heroImage}
      />
      <GallerySection locale={locale} items={galleryItems} />
    </>
  );
}