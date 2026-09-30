import Image from "next/image";
import { ArrowRight, CheckCircle2, CalendarDays, Trophy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatNumber } from "@/lib/format";
import type { HomeContent } from "@/components/admin/HomePageEditor";
import type { AboutContent } from "@/components/admin/AboutPageEditor";

export function AboutSection({
  locale,
  homeContent,
  aboutContent,
}: {
  locale: Locale;
  homeContent?: HomeContent | null;
  aboutContent?: AboutContent | null;
}) {
  const { t } = getTranslations(locale);
  const hc = homeContent;
  const ac = aboutContent;

  const aboutEyebrow = locale === "km" ? (ac?.aboutEyebrowKm || t("about.eyebrow")) : (ac?.aboutEyebrowEn || t("about.eyebrow"));
  const aboutTitle = locale === "km" ? (ac?.aboutTitleKm || hc?.aboutTitleKm || t("about.title")) : (ac?.aboutTitleEn || hc?.aboutTitleEn || t("about.title"));
  const aboutDesc = locale === "km" ? (ac?.aboutDescKm || hc?.aboutDescriptionKm || t("about.description")) : (ac?.aboutDescEn || hc?.aboutDescriptionEn || t("about.description"));
  const aboutImg = ac?.aboutImageUrl || hc?.aboutImageUrl || "/images/school/about.svg";
  
  const yearsCount = ac?.aboutYearsCount ?? 19;
  const yearsLabel = locale === "km" ? (ac?.aboutYearsLabelKm || t("about.yearsTitle")) : (ac?.aboutYearsLabelEn || t("about.yearsTitle"));

  const points = [
    locale === "km" ? (ac?.aboutPoint1Km || t("about.point1")) : (ac?.aboutPoint1En || t("about.point1")),
    locale === "km" ? (ac?.aboutPoint2Km || t("about.point2")) : (ac?.aboutPoint2En || t("about.point2")),
    locale === "km" ? (ac?.aboutPoint3Km || t("about.point3")) : (ac?.aboutPoint3En || t("about.point3")),
  ];

  const badgeText = locale === "km"
    ? (ac?.aboutBadgeTextKm || "សមិទ្ធផលពិសេសលើការប្រឡងជាតិ និងកម្មវិធីបន្ថែម")
    : (ac?.aboutBadgeTextEn || "Strong track record in national exams and enrichment programs");

  const ctaText = locale === "km" ? (ac?.aboutCtaTextKm || t("about.cta")) : (ac?.aboutCtaTextEn || t("about.cta"));
  const secondaryLinkText = locale === "km" ? (ac?.aboutSecondaryLinkKm || t("about.secondaryLink")) : (ac?.aboutSecondaryLinkEn || t("about.secondaryLink"));

  return (
    <section className="py-20 sm:py-28" aria-labelledby="about-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              className="absolute -left-6 -top-6 hidden h-full w-full rounded-2xl border border-border/50 bg-secondary/50 sm:block"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-xl shadow-lift">
              <Image
                src={aboutImg}
                alt={aboutTitle}
                width={1400}
                height={980}
                unoptimized={aboutImg.startsWith("http")}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 flex items-center gap-4 rounded-xl bg-navy p-5 text-white shadow-lift sm:right-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-foreground">
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-sans text-3xl font-bold tracking-tight text-white">
                  {formatNumber(yearsCount, locale)}
                </p>
                <p className="text-xs font-medium text-white/70">{yearsLabel}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow text-muted-foreground">{aboutEyebrow}</p>
            <h2
              id="about-title"
              className="section-title mt-3 text-3xl text-foreground sm:text-4xl lg:text-[2.75rem]"
            >
              {aboutTitle}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutDesc}
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-foreground" aria-hidden="true" />
                  <span className="font-medium text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm text-muted-foreground">
                {badgeText}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={`/${locale}/about`} variant="navy" icon={ArrowRight}>
                {ctaText}
              </ButtonLink>
              <a
                href={`/${locale}/academics`}
                className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
              >
                {secondaryLinkText}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}