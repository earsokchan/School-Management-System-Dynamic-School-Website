import Image from "next/image";
import { ArrowRight, Newspaper, MapPin, GraduationCap } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { schoolName, royalMotto } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section className="relative isolate overflow-hidden bg-white" aria-labelledby="hero-title">


      <div className="container-site grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        {/* Copy */}
        <div className="animate-fade-up">
          <p
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground shadow-sm",
              locale === "km" && "normal-case tracking-normal text-[13px]",
            )}
          >
            <Image
              src="/images/school/moeys-emblem.png"
              alt=""
              width={36}
              height={48}
              className="h-5 w-auto shrink-0 object-contain"
            />
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            {t("hero.badge")}
          </p>

          <h1
            id="hero-title"
            className={cn(
              "mt-7 text-balance animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100 fill-mode-both",
              locale === "km"
                ? "font-moul text-[2.2rem] leading-[1.4] text-foreground sm:text-[2.8rem]"
                : "text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl",
            )}
          >
            {locale === "km" ? schoolName.km : "HUN SEN KAMPONG TRALACH"}
            <span
              className={cn(
                "block text-gold",
                locale === "km"
                  ? "font-khmer mt-3 text-2xl sm:text-3xl"
                  : "mt-3 text-3xl sm:text-4xl tracking-tight",
              )}
            >
              {locale === "km" ? t("hero.subtitle") : "HIGH SCHOOL"}
            </span>
          </h1>

          <p
            className={cn(
              "mt-7 max-w-xl text-balance text-base leading-relaxed text-muted-foreground animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200 fill-mode-both sm:text-lg",
              locale === "km" && "text-[17px]",
            )}
          >
            {pick(royalMotto, locale)}
          </p>

          <p
            className={cn(
              "mt-3 max-w-xl text-balance text-sm text-muted-foreground animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300 fill-mode-both",
              locale === "km" && "text-[15px]",
            )}
          >
            {t("hero.description")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-in slide-in-from-bottom-5 fade-in duration-700 delay-400 fill-mode-both">
            <ButtonLink
              href={`/${locale}/results`}
              variant="navy"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              {t("hero.primaryCta")}
            </ButtonLink>
            <ButtonLink
              href={`/${locale}/academics`}
              variant="outlineLight"
              icon={Newspaper}
              className="w-full border-border bg-white text-foreground hover:bg-secondary sm:w-auto"
            >
              {t("hero.secondaryCta")}
            </ButtonLink>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground animate-in fade-in duration-700 delay-500 fill-mode-both">
            <li className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-gold" aria-hidden="true" />
              {locale === "km" ? "កម្មវិធីសិក្សាផ្លូវការ" : "Official accredited programs"}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              {locale === "km" ? "ស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង" : "Kampong Tralach, Kampong Chhnang"}
            </li>
          </ul>
        </div>

        {/* Visual */}
        <div className="relative animate-fade-in delay-200 fill-mode-both">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
            <Image
              src="/images/school/banner.jpg"
              alt={
                locale === "km"
                  ? "សាលារៀនវិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច"
                  : "Hun Sen Kampong Tralach High School campus"
              }
              width={1400}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[460px]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl border border-border bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:right-auto sm:w-fit">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold text-white">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {locale === "km" ? "ទីតាំង" : "Location"}
              </p>
              <p className="truncate text-sm font-bold text-foreground">
                {locale === "km"
                  ? "ស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង"
                  : "Kampong Tralach, Kampong Chhnang"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
