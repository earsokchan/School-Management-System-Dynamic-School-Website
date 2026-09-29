import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/components/admin/HomePageEditor";

export function CTASection({ locale, homeContent }: { locale: Locale; homeContent?: HomeContent | null }) {
  const { t } = getTranslations(locale);
  const hc = homeContent;
  const ctaTitle     = locale === "km" ? (hc?.ctaTitleKm     || t("cta.title"))       : (hc?.ctaTitleEn     || t("cta.title"));
  const ctaDesc      = locale === "km" ? (hc?.ctaDescKm      || t("cta.description")) : (hc?.ctaDescEn      || t("cta.description"));
  const ctaPrimary   = locale === "km" ? (hc?.ctaPrimaryKm   || t("cta.primaryCta"))  : (hc?.ctaPrimaryEn   || t("cta.primaryCta"));
  const ctaSecondary = locale === "km" ? (hc?.ctaSecondaryKm || t("cta.secondaryCta")): (hc?.ctaSecondaryEn || t("cta.secondaryCta"));

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