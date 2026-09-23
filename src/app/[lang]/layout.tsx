import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { fontsVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import "@/app/globals.css";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "km" }];
}

export function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    return buildMetadata(locale, "/");
  });
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;

  return (
    <html lang={locale} className={fontsVariables}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230B1F3A'/%3E%3Ctext x='50' y='70' font-size='56' text-anchor='middle' fill='%23D4A72C'%3E%E0%9E%9C%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Suspense fallback={null}>
          <Header locale={locale} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}