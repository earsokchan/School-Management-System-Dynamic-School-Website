"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { gallery, galleryCategories } from "@/data/gallery";
import type { GalleryItem } from "@/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Category = GalleryItem["category"];

export function GallerySection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);
  const [active, setActive] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (active === "all" ? gallery : gallery.filter((item) => item.category === active)),
    [active],
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") {
        setLightbox((current) => (current === null ? null : (current - 1 + items.length) % items.length));
      }
      if (event.key === "ArrowRight") {
        setLightbox((current) => (current === null ? null : (current + 1) % items.length));
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, items.length, closeLightbox]);

  return (
    <section className="bg-secondary py-20 sm:py-28" aria-labelledby="gallery-title">
      <Container>
        <SectionHeading
          locale={locale}
          eyebrowKey="gallery.eyebrow"
          title={t("gallery.title")}
          description={t("gallery.description")}
          align="center"
        />

        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label={t("gallery.title")}
            className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
          >
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={active === category.id}
                onClick={() => setActive(category.id)}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                  active === category.id
                    ? "bg-navy text-white shadow-card"
                    : "border border-border bg-white text-muted-foreground hover:border-navy hover:text-foreground",
                )}
              >
                {locale === "km" ? category.label.km : category.label.en}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 70}>
              <button
                type="button"
                onClick={() => setLightbox(index)}
                aria-label={`${locale === "km" ? item.title.km : item.title.en} — ${index + 1} ${t("gallery.of")} ${items.length}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl shadow-card focus-visible:ring-4 focus-visible:ring-gold/50"
              >
                <Image
                  src={item.image}
                  alt={locale === "km" ? item.title.km : item.title.en}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="text-sm font-semibold text-white">
                    {locale === "km" ? item.title.km : item.title.en}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">{t("gallery.empty")}</p>
        ) : null}
      </Container>

      {lightbox !== null && items[lightbox] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${locale === "km" ? items[lightbox].title.km : items[lightbox].title.en}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label={t("gallery.close")}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightbox((lightbox - 1 + items.length) % items.length)
            }
            aria-label={t("gallery.prev")}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <figure className="max-h-full max-w-5xl text-center">
            <div className="relative h-[45vh] w-[85vw] overflow-hidden rounded-xl sm:h-[60vh] sm:w-[70vw]">
              <Image
                src={items[lightbox].image}
                alt={locale === "km" ? items[lightbox].title.km : items[lightbox].title.en}
                fill
                sizes="70vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4">
              <p className="text-lg font-bold text-white">
                {locale === "km" ? items[lightbox].title.km : items[lightbox].title.en}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">
                {lightbox + 1} {t("gallery.of")} {items.length}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => setLightbox((lightbox + 1) % items.length)}
            aria-label={t("gallery.next")}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}