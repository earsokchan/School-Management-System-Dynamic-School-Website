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
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-secondary shadow-card lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="relative bg-white p-6 sm:p-8"
              >
                <span
                  className="absolute left-0 top-0 h-full w-1 bg-primary"
                  aria-hidden="true"
                  style={{ opacity: index === 0 ? 1 : 0.45 }}
                />
<dt className="flex flex-col gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-foreground"
                    role="img"
                    aria-hidden="true"
                  >
                    {(() => {
                      const Icon = statIcons[index];
                      return <Icon className="h-6 w-6" aria-hidden="true" />;
                    })()}
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {locale === "km" ? stat.label.km : stat.label.en}
                  </span>
                </dt>
                <dd className="mt-2 flex items-baseline gap-2">
                  <span className="font-khmer text-4xl font-bold text-foreground sm:text-5xl khmer-num">
                    {formatNumber(stat.value, locale)}
                    {stat.suffix ? <span className="text-gold">{stat.suffix}</span> : null}
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