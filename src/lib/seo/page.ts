import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const base = buildMetadata(locale, path);
  return {
    ...base,
    title,
    description,
    openGraph: {
      ...base.openGraph,
      title,
      description,
    },
  };
}