import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/components/admin/HomePageEditor";
import type { AboutContent } from "@/components/admin/AboutPageEditor";
import type { AcademicsContent } from "@/components/admin/AcademicsPageEditor";
import type { TeachersContent } from "@/components/admin/TeachersPageEditor";

export function CTASection({
  locale,
  homeContent,
  aboutContent,
  academicsContent,
  teachersContent,
}: {
  locale: Locale;
  homeContent?: HomeContent | null;
  aboutContent?: AboutContent | null;
  academicsContent?: AcademicsContent | null;
  teachersContent?: TeachersContent | null;
}) {
  const { t } = getTranslations(locale);
  const hc = homeContent;
  const ac = aboutContent;
  const acc = academicsContent;
  const tc = teachersContent;

  const ctaTitle     = locale === "km" ? (tc?.ctaTitleKm     || acc?.ctaTitleKm     || ac?.ctaTitleKm     || hc?.ctaTitleKm     || t("cta.title"))       : (tc?.ctaTitleEn     || acc?.ctaTitleEn     || ac?.ctaTitleEn     || hc?.ctaTitleEn     || t("cta.title"));
  const ctaDesc      = locale === "km" ? (tc?.ctaDescKm      || acc?.ctaDescKm      || ac?.ctaDescKm      || hc?.ctaDescKm      || t("cta.description")) : (tc?.ctaDescEn      || acc?.ctaDescEn      || ac?.ctaDescEn      || hc?.ctaDescEn      || t("cta.description"));
  const ctaPrimary   = locale === "km" ? (tc?.ctaPrimaryKm   || acc?.ctaPrimaryKm   || ac?.ctaPrimaryKm   || hc?.ctaPrimaryKm   || t("cta.primaryCta"))  : (tc?.ctaPrimaryEn   || acc?.ctaPrimaryEn   || ac?.ctaPrimaryEn   || hc?.ctaPrimaryEn   || t("cta.primaryCta"));
  const ctaSecondary = locale === "km" ? (tc?.ctaSecondaryKm || acc?.ctaSecondaryKm || ac?.ctaSecondaryKm || hc?.ctaSecondaryKm || t("cta.secondaryCta")): (tc?.ctaSecondaryEn || acc?.ctaSecondaryEn || ac?.ctaSecondaryEn || hc?.ctaSecondaryEn || t("cta.secondaryCta"));

  return (
    <section className="relative py-20 sm:py-24" aria-labelledby="cta-title">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/school/banner.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70"
        aria-hidden="true"
      />

      <Container>
        <Reveal className="max-w-3xl">
          <h2 id="cta-title" className="font-khmer text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {ctaTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {ctaDesc}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={`/${locale}/contact`} variant="gold" icon={Phone}>
              {ctaPrimary}
            </ButtonLink>
            <ButtonLink href={`/${locale}/academics`} variant="outline" icon={ArrowRight}>
              {ctaSecondary}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}