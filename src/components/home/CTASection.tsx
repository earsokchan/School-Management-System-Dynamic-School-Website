import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

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
            {t("cta.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {t("cta.description")}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={`/${locale}/contact`} variant="gold" icon={Phone}>
              {t("cta.primaryCta")}
            </ButtonLink>
            <ButtonLink href={`/${locale}/academics`} variant="outline" icon={ArrowRight}>
              {t("cta.secondaryCta")}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}