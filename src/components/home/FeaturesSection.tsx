import { BookOpen, Building2, Dumbbell, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { features } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const featureIcons = [BookOpen, Building2, Dumbbell, ShieldCheck];

export function FeaturesSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section className="bg-secondary py-20 sm:py-28" aria-labelledby="features-title">
      <Container>
        <SectionHeading
          locale={locale}
          eyebrowKey="features.eyebrow"
          title={t("features.title")}
          description={t("features.description")}
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Reveal key={feature.id} delay={index * 90}>
                <article className="group h-full rounded-2xl border border-border/50 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-white">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {locale === "km" ? feature.title.km : feature.title.en}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {locale === "km" ? feature.description.km : feature.description.en}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}