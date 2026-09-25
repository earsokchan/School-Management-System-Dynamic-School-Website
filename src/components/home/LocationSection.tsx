import { MapPin, Navigation } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { googleMapsUrl } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function LocationSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section className="bg-[#1D1D1D] py-20 sm:py-28" aria-labelledby="location-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              locale={locale}
              eyebrowKey="location.eyebrow"
              title={t("location.title")}
              description={t("location.description")}
              light
            />

            <address className="mt-8 not-italic">
              <div className="flex items-start gap-4 rounded-xl border border-white/15 bg-white/5 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10 text-gold">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="text-primary-foreground">
                  <p className="font-khmer text-lg font-bold">
                    {locale === "km"
                      ? "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច"
                      : "Hun Sen Kampong Tralach High School"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                    {t("location.district")}
                    <br />
                    {t("location.province")}
                    <br />
                    {t("location.country")}
                  </p>
                </div>
              </div>
            </address>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink
                href={googleMapsUrl}
                variant="gold"
                icon={Navigation}
                className="w-full sm:w-auto"
              >
                {t("location.openMaps")}
              </ButtonLink>
              <ButtonLink
                href={`${googleMapsUrl}&saddr=current+location`}
                variant="outline"
                className="w-full sm:w-auto"
              >
                {t("location.getDirections")}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-white/15"
              aria-label={t("location.openMaps")}
            >
              <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(243,128,32,0.30)_0%,rgba(35,35,35,0.88)_55%,rgba(246,130,31,0.55)_100%)]">
                <div
                  className="absolute inset-0 opacity-40 [background-size:36px_36px] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-creeper text-white shadow-lg ring-4 ring-white/25">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white/95 px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                  {locale === "km" ? "កំពង់ត្រឡាច" : "Kampong Tralach"}
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}