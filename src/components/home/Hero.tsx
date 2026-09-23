import Image from "next/image";
import { ChevronDown, ArrowRight, Newspaper } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { schoolName, royalMotto } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden bg-navy-dark">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/school/banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
      </div>

      <div
        className="absolute inset-0 -z-10 bg-black/50"
        aria-hidden="true"
      />

      <div className="container-site py-32 text-center animate-in fade-in duration-1000">
        <p
          className={cn(
            "mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 glass px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-transform hover:scale-105",
            locale === "km" && "tracking-[0.04em] text-sm normal-case",
          )}
        >
          <Image
            src="/images/school/moeys-emblem.png"
            alt=""
            width={36}
            height={48}
            className="h-6 w-auto shrink-0 object-contain drop-shadow-md"
          />
          {t("hero.badge")}
        </p>

        <h1
          className={cn(
            "mx-auto max-w-5xl text-white text-balance drop-shadow-lg animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-150 fill-mode-both",
            locale === "km"
              ? "font-moul text-[2.2rem] leading-normal sm:text-[3rem] lg:text-[3.8rem]"
              : "font-bold uppercase leading-[1.05] tracking-tightest text-5xl sm:text-7xl lg:text-8xl",
          )}
        >
          {locale === "km" ? schoolName.km : "HUN SEN KAMPONG TRALACH"}
          <span
            className={cn(
              "block text-gold drop-shadow-md",
              locale === "km"
                ? "font-khmer mt-4 text-2xl sm:text-3xl"
                : "mt-4 text-3xl sm:text-4xl tracking-widest",
            )}
          >
            {locale === "km" ? t("hero.subtitle") : "HIGH SCHOOL"}
          </span>
        </h1>

        <p
          className={cn(
            "mx-auto mt-8 text-balance animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-300 fill-mode-both",
            locale === "km"
              ? "text-[18px] leading-relaxed text-gray-200"
              : "text-xl text-gray-200 sm:text-2xl font-light tracking-wide",
          )}
        >
          {pick(royalMotto, locale)}
        </p>

        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-balance text-sm text-gray-300 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-500 fill-mode-both",
            locale === "km" && "text-[16px]",
          )}
        >
          {t("hero.description")}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-700 fill-mode-both">
          <ButtonLink
            href={`/${locale}/results`}
            variant="red"
            icon={ArrowRight}
            className="w-full sm:w-auto shadow-lg shadow-red/20 hover:shadow-red/40 hover:-translate-y-1 transition-all"
          >
            {t("hero.primaryCta")}
          </ButtonLink>
          <ButtonLink
            href={`/${locale}/academics`}
            variant="outline"
            icon={Newspaper}
            className="w-full sm:w-auto glass hover:bg-white/20 text-white border-white/30 hover:-translate-y-1 transition-all"
          >
            {t("hero.secondaryCta")}
          </ButtonLink>
        </div>
      </div>

      <a
        href="#stats"
        aria-label={t("hero.scroll")}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          {t("hero.scroll")}
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}