import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { activityCategories } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { HomeContent } from "@/components/admin/HomePageEditor";
import type { StudentsContent } from "@/components/admin/StudentsPageEditor";

export function StudentLife({
  locale,
  homeContent,
  studentsContent,
}: {
  locale: Locale;
  homeContent?: HomeContent | null;
  studentsContent?: StudentsContent | null;
}) {
  const { t } = getTranslations(locale);
  const hc = homeContent;
  const sc = studentsContent;

  const sectionEyebrow = locale === "km"
    ? (sc?.studentLifeEyebrowKm || t("studentLife.eyebrow"))
    : (sc?.studentLifeEyebrowEn || t("studentLife.eyebrow"));

  const sectionTitle = locale === "km"
    ? (sc?.studentLifeTitleKm || hc?.studentLifeTitleKm || t("studentLife.title"))
    : (sc?.studentLifeTitleEn || hc?.studentLifeTitleEn || t("studentLife.title"));

  const sectionDesc = locale === "km"
    ? (sc?.studentLifeDescKm || hc?.studentLifeDescKm || t("studentLife.description"))
    : (sc?.studentLifeDescEn || hc?.studentLifeDescEn || t("studentLife.description"));

  const dynamicCategories = activityCategories.map((cat, idx) => {
    const n = (idx + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    return {
      ...cat,
      title: {
        en: (sc?.[`cat${n}TitleEn` as keyof StudentsContent] as string) || cat.title.en,
        km: (sc?.[`cat${n}TitleKm` as keyof StudentsContent] as string) || cat.title.km,
      },
      description: {
        en: (sc?.[`cat${n}DescEn` as keyof StudentsContent] as string) || cat.description.en,
        km: (sc?.[`cat${n}DescKm` as keyof StudentsContent] as string) || cat.description.km,
      },
    };
  });

  return (
    <section className="py-20 sm:py-28" aria-labelledby="student-life-title">
      <Container>
        <SectionHeading
          locale={locale}
          eyebrowKey="studentLife.eyebrow"
          eyebrow={sectionEyebrow}
          title={sectionTitle}
          description={sectionDesc}
          align="center"
        />

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-3">
          {dynamicCategories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={(index % 3) * 100}
              className={cn(index === 0 && "sm:col-span-2 sm:row-span-2")}
            >
              <a
                href={`/${locale}/gallery`}
                className={cn(
                  "group relative block h-full w-full overflow-hidden rounded-xl",
                  "auto-rows-span-full",
                )}
              >
                <Image
                  src={category.image}
                  alt={locale === "km" ? category.title.km : category.title.en}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
                  <span
                    className={cn(
                      "h-1 w-10 rounded-full bg-gold",
                      index === 0 && "w-14",
                    )}
                    aria-hidden="true"
                  />
                  <h3
                    className={cn(
                      "mt-2 font-bold text-white",
                      index === 0 ? "text-2xl sm:text-3xl" : "text-lg",
                    )}
                  >
                    {locale === "km" ? category.title.km : category.title.en}
                  </h3>
                  {index === 0 ? (
                    <p className="mt-1 max-w-md text-sm text-primary-foreground/80">
                      {locale === "km" ? category.description.km : category.description.en}
                    </p>
                  ) : (
                    <p className="line-clamp-1 text-xs text-primary-foreground/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {locale === "km" ? category.description.km : category.description.en}
                    </p>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}