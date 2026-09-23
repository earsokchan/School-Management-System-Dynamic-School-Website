import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { activityCategories } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function StudentLife({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="student-life-title">
      <Container>
        <SectionHeading
          locale={locale}
          eyebrowKey="studentLife.eyebrow"
          title={t("studentLife.title")}
          description={t("studentLife.description")}
          align="center"
        />

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-3">
          {activityCategories.map((category, index) => (
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