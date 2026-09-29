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
import {
  getPublicEvents,
  getPublicGallery,
  getPublicNews,
  getPublicPrograms,
  getPublicTeachers,
  getPublicResults,
  getHomeContent,
} from "@/lib/server/public-content";

export const revalidate = 60;

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [newsItems, eventItems, galleryItems, programItems, teacherItems, resultItems, homeContent] = await Promise.all([
    getPublicNews(),
    getPublicEvents(),
    getPublicGallery(),
    getPublicPrograms(),
    getPublicTeachers(),
    getPublicResults(),
    getHomeContent(),
  ]);

  return (
    <>
      {homeContent?.sectionHero !== false && <Hero locale={locale} homeContent={homeContent} />}
      {homeContent?.sectionStats !== false && <StatsSection locale={locale} homeContent={homeContent} />}
      {homeContent?.sectionAbout !== false && <AboutSection locale={locale} homeContent={homeContent} />}
      {homeContent?.sectionFeatures !== false && <FeaturesSection locale={locale} homeContent={homeContent} />}
      {homeContent?.sectionAcademics !== false && <AcademicPrograms locale={locale} items={programItems} homeContent={homeContent} />}
      {homeContent?.sectionResults !== false && <StudentResults locale={locale} items={resultItems} homeContent={homeContent} />}
      {homeContent?.sectionNews !== false && <NewsSection locale={locale} items={newsItems} homeContent={homeContent} />}
      {homeContent?.sectionEvents !== false && <EventsSection locale={locale} items={eventItems} homeContent={homeContent} />}
      {homeContent?.sectionTeachers !== false && <TeachersSection locale={locale} items={teacherItems} homeContent={homeContent} />}
      {homeContent?.sectionStudentLife !== false && <StudentLife locale={locale} homeContent={homeContent} />}
      {homeContent?.sectionGallery !== false && <GallerySection locale={locale} items={galleryItems} homeContent={homeContent} />}
      <CampusSection locale={locale} />
      <LocationSection locale={locale} />
      <ContactSection locale={locale} />
      {homeContent?.sectionCta !== false && <CTASection locale={locale} homeContent={homeContent} />}
    </>
  );
}