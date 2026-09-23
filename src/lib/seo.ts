import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { siteUrl, schoolName } from "@/lib/site";

export const schoolSeo: Record<
  Locale,
  { title: string; description: string }
> = {
  en: {
    title: "Hun Sen Kampong Tralach High School",
    description:
      "Official website of Hun Sen Kampong Tralach High School in Kampong Chhnang, Cambodia.",
  },
  km: {
    title: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច",
    description:
      "គេហទំព័ររបស់វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង ប្រទេសកម្ពុជា។",
  },
};

export function buildMetadata(locale: Locale, path: string): Metadata {
  const seo = schoolSeo[locale];
  const url = `${siteUrl}${locale === "en" ? path : `/${locale}${path}`}`;
  const enUrl = `${siteUrl}${path}`;
  const kmUrl = `${siteUrl}/km${path}`;

  return {
    title: {
      default: seo.title,
      template: `%s | ${schoolName.en}`,
    },
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        km: kmUrl,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url,
      locale: locale === "km" ? "km_KH" : "en_US",
      siteName: schoolName.en,
      images: [
        {
          url: `${siteUrl}/images/school/hero.svg`,
          width: 1920,
          height: 1080,
          alt: "Hun Sen Kampong Tralach High School",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}