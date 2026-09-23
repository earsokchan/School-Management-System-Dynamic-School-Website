import type { Locale } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AcademicPrograms } from "@/components/home/AcademicPrograms";
import { StudentResults } from "@/components/home/StudentResults";
import { NewsSection } from "@/components/home/NewsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { TeachersSection } from "@/components/home/TeachersSection";
import { StudentLife } from "@/components/home/StudentLife";
import { GallerySection } from "@/components/home/GallerySection";
import { CampusSection } from "@/components/home/CampusSection";
import { LocationSection } from "@/components/home/LocationSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CTASection } from "@/components/home/CTASection";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <>
      <Hero locale={locale} />
      <StatsSection locale={locale} />
      <AboutSection locale={locale} />
      <FeaturesSection locale={locale} />
      <AcademicPrograms locale={locale} />
      <StudentResults locale={locale} />
      <NewsSection locale={locale} />
      <EventsSection locale={locale} />
      <TeachersSection locale={locale} />
      <StudentLife locale={locale} />
      <GallerySection locale={locale} />
      <CampusSection locale={locale} />
      <LocationSection locale={locale} />
      <ContactSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}