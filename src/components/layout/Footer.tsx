import Link from "next/link";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { routePath, type RouteKey } from "@/lib/site";
import { workingHours, schoolAddress, contactInfo } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { SchoolLogo } from "@/components/layout/SchoolLogo";

export function Footer({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  const exploreItems: { route: RouteKey; label: string }[] = [
    { route: "about", label: t("nav.about") },
    { route: "academics", label: t("nav.academics") },
    { route: "students", label: t("nav.students") },
    { route: "teachers", label: t("nav.teachers") },
    { route: "news", label: t("nav.news") },
    { route: "gallery", label: t("nav.gallery") },
    { route: "contact", label: t("nav.contact") },
  ];

  const hours = workingHours;

  return (
    <footer className="bg-navy text-primary-foreground/70">
      <div className="container-site py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <SchoolLogo locale={locale} href={`/${locale}`} variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              {t("footer.aboutText")}
            </p>
            <a
              href={contactInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-5 text-sm font-bold text-white transition-colors hover:bg-gold"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {t("footer.telegram")}
            </a>
          </div>

          {/* Explore */}
          <nav aria-label={t("footer.explore")}>
            <h3 className="font-khmer mb-6 text-sm font-bold uppercase tracking-[0.16em] text-gold">
              {t("footer.explore")}
            </h3>
            <ul className="space-y-3.5">
              {exploreItems.map((item) => (
                <li key={`${item.label}-${item.route}`}>
                  <Link
                    href={`/${locale}${routePath(item.route)}`}
                    className="text-sm transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-khmer mb-6 text-sm font-bold uppercase tracking-[0.16em] text-gold">
              {t("footer.contactCol")}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="leading-relaxed">{pick(schoolAddress, locale)}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-medium text-white transition-colors hover:text-gold"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:+855766478888`}
                  className="font-medium text-white transition-colors hover:text-gold"
                >
                  {contactInfo.phones[0]}
                </a>
              </li>
            </ul>

            <div className="mt-7 rounded-xl bg-white/5 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                {pick(hours.days, locale)}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <span className="flex items-center gap-2">
                  <span className="rounded bg-white/10 px-2.5 py-1">{pick(hours.morning, locale)}</span>
                  {t("footer.morning")}
                </span>
                <span className="flex items-center gap-2">
                  <span className="rounded bg-white/10 px-2.5 py-1">{pick(hours.afternoon, locale)}</span>
                  {t("footer.afternoon")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            {locale === "km" ? (
              <>© ២០២៦ វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច. {t("footer.rights")}</>
            ) : (
              <>
                © {new Date().getFullYear()} Hun Sen Kampong Tralach High School. {t("footer.rights")}
              </>
            )}
          </p>
          <a
            href="https://earsokchan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-xs font-semibold text-white transition-colors hover:text-gold sm:text-right"
          >
            {t("footer.credits")}
          </a>
        </div>
      </div>
    </footer>
  );
}