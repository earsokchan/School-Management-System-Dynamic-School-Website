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
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-dark/85 via-navy/60 to-navy-dark/90"
        aria-hidden="true"
      />

      <div className="container-site py-24 text-center">
        <p
          className={cn(
            "mx-auto mb-7 inline-flex items-center gap-2.5 rounded-md border border-gold/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur",
            locale === "km" && "tracking-[0.04em] text-sm normal-case",
          )}
        >
          <Image
            src="/images/school/moeys-emblem.png"
            alt=""
            width={36}
            height={48}
            className="h-6 w-auto shrink-0 object-contain"
          />
          {t("hero.badge")}
        </p>

        <h1
          className={cn(
            "mx-auto max-w-5xl text-white text-balance",
            locale === "km"
              ? "font-moul text-[2rem] leading-normal sm:text-[2.6rem] lg:text-[3.2rem]"
              : "font-bold uppercase leading-[1.05] tracking-tightest text-4xl sm:text-6xl lg:text-7xl",
          )}
        >
          {locale === "km" ? schoolName.km : "HUN SEN KAMPONG TRALACH"}
          <span
            className={cn(
              "block text-gold",
              locale === "km"
                ? "font-khmer mt-3 text-xl sm:text-2xl"
                : "mt-2 text-2xl sm:text-3xl",
            )}
          >
            {locale === "km" ? t("hero.subtitle") : "HIGH SCHOOL"}
          </span>
        </h1>

        <p
          className={cn(
            "mx-auto mt-6 text-balance",
            locale === "km"
              ? "text-[16px] leading-relaxed text-primary-foreground/80"
              : "text-lg text-primary-foreground/80 sm:text-xl",
          )}
        >
          {pick(royalMotto, locale)}
        </p>

        <p
          className={cn(
            "mx-auto mt-3 max-w-2xl text-balance text-sm text-primary-foreground/70",
            locale === "km" && "text-[15px]",
          )}
        >
          {t("hero.description")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink
            href={`/${locale}/results`}
            variant="red"
            icon={ArrowRight}
            className="w-full sm:w-auto"
          >
            {t("hero.primaryCta")}
          </ButtonLink>
          <ButtonLink
            href={`/${locale}/academics`}
            variant="outline"
            icon={Newspaper}
            className="w-full sm:w-auto"
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