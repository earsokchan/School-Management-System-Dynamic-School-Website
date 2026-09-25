import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { PageHero } from "@/components/ui/PageHero";
import { getPublicGallery } from "@/lib/server/public-content";
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

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("gallery.eyebrow")}
        title={t("pages.galleryTitle")}
        description={t("gallery.description")}
        image="/images/gallery/g-1.svg"
      />
      <GallerySection locale={locale} items={galleryItems} />
    </>
  );
}