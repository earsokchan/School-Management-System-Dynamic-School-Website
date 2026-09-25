import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { stats } from "@/data/site";
import { formatNumber } from "@/lib/format";
import { GraduationCap, Presentation, BookOpen, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const statIcons: LucideIcon[] = [GraduationCap, Presentation, BookOpen, MapPin];

export function StatsSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section id="stats" className="relative -mt-12 z-10 pb-4" aria-label={t("stats.title")}>
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-2xl border border-border/60 bg-border/40 shadow-sm lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="relative bg-white p-6 sm:p-8"
              >
                <span
                  className="absolute left-0 top-0 h-full w-[2px] bg-foreground/10"
                  aria-hidden="true"
                />
<dt className="flex flex-col gap-4">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
                    role="img"
                    aria-hidden="true"
                  >
                    {(() => {
                      const Icon = statIcons[index];
                      return <Icon className="h-5 w-5" aria-hidden="true" />;
                    })()}
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {locale === "km" ? stat.label.km : stat.label.en}
                  </span>
                </dt>
                <dd className="mt-3 flex items-baseline gap-1">
                  <span className="font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {formatNumber(stat.value, locale)}
                    {stat.suffix ? <span className="text-muted-foreground ml-1">{stat.suffix}</span> : null}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}