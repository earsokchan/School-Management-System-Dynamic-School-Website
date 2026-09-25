"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  User,
  Send,
  CheckCircle2,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { googleMapsUrl, contactInfo, schoolAddressShort } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const channels: {
    icon: typeof Mail;
    title: string;
    value: string;
    href: string;
    external?: boolean;
  }[] = [
    {
      icon: Mail,
      title: t("contact.emailUs"),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      title: t("contact.callUs"),
      value: contactInfo.phones[0],
      href: `tel:${contactInfo.phones[0].replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      title: t("contact.visitUs"),
      value: pick(schoolAddressShort, locale),
      href: googleMapsUrl,
      external: true,
    },
  ];

  return (
    <section className="bg-muted py-20 sm:py-28" aria-labelledby="contact-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              locale={locale}
              eyebrowKey="contact.eyebrow"
              title={t("contact.title")}
              description={t("contact.description")}
            />

            <div className="mt-10 space-y-4">
              {channels.map((channel) => (
                <Card key={channel.title} className="card-hover">
                  <CardContent className="flex items-center gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <channel.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {channel.title}
                      </span>
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noopener noreferrer" : undefined}
                        className={cn(
                          "mt-0.5 block text-sm font-semibold text-foreground hover:text-foreground",
                          channel.external && "hover:underline",
                        )}
                      >
                        {channel.value}
                      </a>
                    </span>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contact.pmToSchool")}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-foreground">
                      {t("contact.officeHours")}
                    </span>
                  </span>
                </CardContent>
              </Card>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {submitted ? (
              <Card className="flex h-full min-h-[380px] flex-col items-center justify-center p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <CheckCircle2 className="h-8 w-8 text-foreground" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {t("contact.successTitle")}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t("contact.successDesc")}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="mt-8"
                >
                  {t("contact.sendAnother")}
                </Button>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("contact.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">{t("contact.name")}</Label>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(event) =>
                              setForm({ ...form, name: event.target.value })
                            }
                            placeholder={t("contact.namePlaceholder")}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">{t("contact.email")}</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(event) =>
                            setForm({ ...form, email: event.target.value })
                          }
                          placeholder={t("contact.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">{t("contact.phone")}</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(event) =>
                          setForm({ ...form, phone: event.target.value })
                        }
                        placeholder={t("contact.phonePlaceholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">{t("contact.message")}</Label>
                      <Textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(event) =>
                          setForm({ ...form, message: event.target.value })
                        }
                        placeholder={t("contact.messagePlaceholder")}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send aria-hidden="true" />
                      {t("contact.send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}