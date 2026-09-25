import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo/page";
import { getPublicNews } from "@/lib/server/public-content";
import { formatDate } from "@/lib/format";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

interface NewsPageProps {
  params: Promise<{ lang: string }>;
}

export function generateMetadata({ params }: NewsPageProps): Promise<Metadata> | Metadata {
  return params.then(({ lang }) => {
    const locale: Locale = isLocale(lang) ? lang : "en";
    const { t } = getTranslations(locale);
    return pageMetadata(
      locale,
      "/news",
      t("pages.newsTitle"),
      t("news.description"),
    );
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { t } = getTranslations(locale);
  const newsItems = await getPublicNews();

  const [featured, ...rest] = newsItems;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("news.eyebrow")}
        title={t("pages.newsTitle")}
        description={t("news.description")}
        image="/images/news/academics.svg"
      />

      <section className="py-20 sm:py-28">
        <Container>
          {/* Featured */}
          {featured ? (
            <Reveal>
              <article
                id={featured.id}
                className="scroll-mt-32 overflow-hidden rounded-xl border border-border bg-white shadow-card lg:grid lg:grid-cols-2"
              >
                <div className="relative h-72 lg:h-auto">
                  <Image
                    src={featured.image}
                    alt={locale === "km" ? featured.title.km : featured.title.en}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 sm:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-creeper px-3 py-1 text-xs font-bold text-white">
                      {t("news.featured")}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                      {locale === "km" ? featured.category.km : featured.category.en}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(featured.date, locale)}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                    {locale === "km" ? featured.title.km : featured.title.en}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {locale === "km" ? featured.excerpt.km : featured.excerpt.en}
                  </p>
                </div>
              </article>
            </Reveal>
          ) : null}

          {/* List */}
          {rest.length > 0 ? (
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item, index) => (
                <Reveal key={item.id} delay={(index % 3) * 80}>
                  <article
                    id={item.id}
                    className="flex h-full scroll-mt-32 flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card card-hover"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={locale === "km" ? item.title.km : item.title.en}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                        {locale === "km" ? item.category.km : item.category.en}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatDate(item.date, locale)}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-foreground">
                        {locale === "km" ? item.title.km : item.title.en}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {locale === "km" ? item.excerpt.km : item.excerpt.en}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : null}

          {newsItems.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{t("news.empty")}</p>
          ) : null}
        </Container>
      </section>

      <CTASection locale={locale} />
    </>
  );
}