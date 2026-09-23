import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  locale: Locale;
  eyebrowKey: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  red?: boolean;
}

function EyebrowLabel() {
  return <span aria-hidden="true" className="h-px w-8 bg-current" />;
}

export function SectionHeading({
  locale,
  eyebrowKey,
  title,
  description,
  align = "left",
  light = false,
  red = false,
}: SectionHeadingProps) {
  const { t } = getTranslations(locale);
  const eyebrowText = t(eyebrowKey);

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p
        className={cn(
          "eyebrow flex items-center gap-3",
          align === "center" && "justify-center",
          light ? "text-gold" : red ? "text-creeper" : "text-foreground",
        )}
      >
        <EyebrowLabel />
        {eyebrowText}
        {align === "center" && locale === "en" ? (
          <span aria-hidden="true" className="h-px w-8 bg-current" />
        ) : null}
      </p>
      <h2
        className={cn(
          "section-title mt-3 text-3xl sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-foreground",
          locale === "km" && "text-[1.8rem] sm:text-[2.1rem] lg:text-[2.4rem]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}