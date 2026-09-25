import Image from "next/image";
import { ArrowRight, CheckCircle2, CalendarDays, Trophy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatNumber } from "@/lib/format";

export function AboutSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  const points = [t("about.point1"), t("about.point2"), t("about.point3")];

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
                src="/images/school/about.svg"
                alt={t("about.title")}
                width={1400}
                height={980}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 flex items-center gap-4 rounded-xl bg-navy p-5 text-white shadow-lift sm:right-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-foreground">
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-sans text-3xl font-bold tracking-tight text-white">
                  {formatNumber(19, locale)}
                </p>
                <p className="text-xs font-medium text-white/70">{t("about.yearsTitle")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow text-muted-foreground">{t("about.eyebrow")}</p>
            <h2
              id="about-title"
              className="section-title mt-3 text-3xl text-foreground sm:text-4xl lg:text-[2.75rem]"
            >
              {t("about.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("about.description")}
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
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
                {locale === "km"
                  ? "សមិទ្ធផលពិសេសលើការប្រឡងជាតិ និងកម្មវិធីបន្ថែម"
                  : "Strong track record in national exams and enrichment programs"}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={`/${locale}/about`} variant="navy" icon={ArrowRight}>
                {t("about.cta")}
              </ButtonLink>
              <a
                href={`/${locale}/academics`}
                className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
              >
                {t("about.secondaryLink")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}