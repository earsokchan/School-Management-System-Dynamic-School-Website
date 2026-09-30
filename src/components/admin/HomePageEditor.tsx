"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Tablet, Smartphone,
  Eye, EyeOff, Check, RefreshCw,
  ExternalLink, ChevronDown, ChevronRight,
  Layout, Type, BarChart2, Info,
  Zap, BookOpen, Megaphone, CalendarDays, Users,
  GripVertical, Save, Upload, Loader2, AlertCircle,
  Image as ImageIcon, Hash, Phone, Trophy,
  Heart, Camera,
} from "lucide-react";
import Image from "next/image";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";

/* ──────────────────────────────────────────────────────
   TYPE
────────────────────────────────────────────────────── */
export interface HomeContent {
  id?: string;
  /* hero */
  heroTitleEn: string; heroTitleKm: string;
  heroSubtitleEn: string; heroSubtitleKm: string;
  heroDescriptionEn: string; heroDescriptionKm: string;
  heroPrimaryCtaEn: string; heroPrimaryCtaKm: string;
  heroSecondaryCtaEn: string; heroSecondaryCtaKm: string;
  heroBannerUrl: string;
  /* about */
  aboutTitleEn: string; aboutTitleKm: string;
  aboutDescriptionEn: string; aboutDescriptionKm: string;
  aboutImageUrl: string;
  /* stats */
  statsStudents: number; statsTeachers: number;
  statsClassrooms: number; statsEstablished: string;
  /* features (4 cards) */
  feat1TitleEn: string; feat1TitleKm: string; feat1DescEn: string; feat1DescKm: string;
  feat2TitleEn: string; feat2TitleKm: string; feat2DescEn: string; feat2DescKm: string;
  feat3TitleEn: string; feat3TitleKm: string; feat3DescEn: string; feat3DescKm: string;
  feat4TitleEn: string; feat4TitleKm: string; feat4DescEn: string; feat4DescKm: string;
  /* news section heading */
  newsTitleEn: string; newsTitleKm: string;
  newsDescEn: string; newsDescKm: string;
  /* events section heading */
  eventsTitleEn: string; eventsTitleKm: string;
  eventsDescEn: string; eventsDescKm: string;
  /* teachers section heading */
  teachersTitleEn: string; teachersTitleKm: string;
  teachersDescEn: string; teachersDescKm: string;
  /* gallery section heading */
  galleryTitleEn: string; galleryTitleKm: string;
  galleryDescEn: string; galleryDescKm: string;
  /* student life heading */
  studentLifeTitleEn: string; studentLifeTitleKm: string;
  studentLifeDescEn: string; studentLifeDescKm: string;
  /* academics heading */
  academicsTitleEn: string; academicsTitleKm: string;
  academicsDescEn: string; academicsDescKm: string;
  /* results heading */
  resultsTitleEn: string; resultsTitleKm: string;
  resultsDescEn: string; resultsDescKm: string;
  /* CTA section */
  ctaTitleEn: string; ctaTitleKm: string;
  ctaDescEn: string; ctaDescKm: string;
  ctaPrimaryEn: string; ctaPrimaryKm: string;
  ctaSecondaryEn: string; ctaSecondaryKm: string;
  /* section visibility */
  sectionHero: boolean; sectionStats: boolean; sectionAbout: boolean;
  sectionFeatures: boolean; sectionAcademics: boolean; sectionResults: boolean;
  sectionNews: boolean; sectionEvents: boolean; sectionTeachers: boolean;
  sectionStudentLife: boolean; sectionGallery: boolean; sectionCta: boolean;
}

const defaults: HomeContent = {
  heroTitleEn: "HUN SEN KAMPONG TRALACH", heroTitleKm: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច",
  heroSubtitleEn: "HIGH SCHOOL", heroSubtitleKm: "សូមស្វាគមន៍!",
  heroDescriptionEn: "Under the management of the Kampong Tralach District Office of Education, our high school serves students of Kampong Chhnang province with quality general education.",
  heroDescriptionKm: "ក្រោមការគ្រប់គ្រងរបស់ការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុកកំពង់ត្រឡាច វិទ្យាល័យរបស់យើងផ្តល់សេវាអប់រំទូទៅប្រកបដោយគុណភាព។",
  heroPrimaryCtaEn: "Student Results", heroPrimaryCtaKm: "លទ្ធផលសិក្សា",
  heroSecondaryCtaEn: "School Services", heroSecondaryCtaKm: "សេវាសាលារៀន",
  heroBannerUrl: "/images/school/banner.jpg",
  aboutTitleEn: "Learning Today. Leading Tomorrow.", aboutTitleKm: "រៀនថ្ងៃនេះ ដើម្បីដឹកនាំថ្ងៃស្អែក",
  aboutDescriptionEn: "Hun Sen Kampong Tralach High School is a public higher secondary school serving the students of Kampong Tralach district.",
  aboutDescriptionKm: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច គឺជាវិទ្យាល័យសាធារណៈ ដែលផ្តល់សេវាអប់រំដល់សិស្សានុសិស្ស។",
  aboutImageUrl: "/images/school/about.svg",
  statsStudents: 1200, statsTeachers: 45, statsClassrooms: 24, statsEstablished: "2007",
  feat1TitleEn: "Quality Education", feat1TitleKm: "ការអប់រំមានគុណភាព",
  feat1DescEn: "A strong national curriculum delivered by professional teachers.", feat1DescKm: "កម្មវិធីសិក្សាជាតិរឹងមាំ បង្រៀនដោយគ្រូជំនាញ។",
  feat2TitleEn: "Modern Facilities", feat2TitleKm: "បរិការៈទំនើប",
  feat2DescEn: "Libraries, computer rooms and science labs.", feat2DescKm: "បណ្ណាល័យ បន្ទប់កុំព្យូទ័រ និងមន្ទីរពិសោធន៍វិទ្យាសាស្ត្រ។",
  feat3TitleEn: "Sports & Clubs", feat3TitleKm: "កីឡា និងក្លឹប",
  feat3DescEn: "Football, volleyball and youth clubs.", feat3DescKm: "បាល់ទាត់ បាល់ទះ និងក្លឹបយុវជន។",
  feat4TitleEn: "Safe Environment", feat4TitleKm: "បរិយាកាសសុវត្ថិភាព",
  feat4DescEn: "A respectful and supportive school culture.", feat4DescKm: "វប្បធម៌សាលាដែលមានការគោរព និងគាំទ្រ។",
  newsTitleEn: "Latest News", newsTitleKm: "ព័ត៌មានថ្មីៗ",
  newsDescEn: "Stay up to date with the latest happenings at our school.", newsDescKm: "តាមដានព័ត៌មានថ្មីៗនៅក្នុងសាលារបស់យើង។",
  eventsTitleEn: "Upcoming Events", eventsTitleKm: "ព្រឹត្តិការណ៍នាពេលខាងមុខ",
  eventsDescEn: "Join us at our school events throughout the year.", eventsDescKm: "សូមចូលរួមជាមួយយើងនៅក្នុងព្រឹត្តិការណ៍របស់សាលា។",
  teachersTitleEn: "Meet Our Teachers", teachersTitleKm: "ស្គាល់លោកគ្រូ អ្នកគ្រូរបស់យើង",
  teachersDescEn: "A team of committed educators who guide and inspire our students every day.", teachersDescKm: "ក្រុមគ្រូបង្រៀនដែលលះបង់ និងណែនាំសិស្សានុសិស្ស។",
  galleryTitleEn: "Life at Hun Sen Kampong Tralach", galleryTitleKm: "ជីវិតនៅវិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច",
  galleryDescEn: "A look inside our classrooms, campus and community.", galleryDescKm: "ទស្សនារូបភាពក្នុងថ្នាក់រៀន បរិវេណសាលា និងសហគមន៍។",
  studentLifeTitleEn: "More Than a Classroom", studentLifeTitleKm: "លើសពីការរៀនក្នុងថ្នាក់",
  studentLifeDescEn: "Our students grow through sports, clubs, culture and leadership.", studentLifeDescKm: "សិស្សានុសិស្សរបស់យើងលូតលាស់តាមរយៈកីឡា ក្លឹប វប្បធម៌ និងភាពជាអ្នកដឹកនាំ។",
  academicsTitleEn: "Explore Our Academic Programs", academicsTitleKm: "ស្វែងយល់អំពីកម្មវិធីសិក្សារបស់យើង",
  academicsDescEn: "From Grade 7 to Grade 12, we prepare students for the national examinations and for life beyond school.", academicsDescKm: "ចាប់ពីថ្នាក់ទី ៧ ដល់ថ្នាក់ទី ១២ យើងរៀបចំសិស្សានុសិស្សសម្រាប់ការប្រឡងជាតិ។",
  resultsTitleEn: "Student Results", resultsTitleKm: "លទ្ធផលសិក្សារបស់សិស្ស",
  resultsDescEn: "Search student results securely by academic year, evaluation period, student ID and date of birth.", resultsDescKm: "ស្វែងរកលទ្ធផលសិក្សាតាមឆ្នាំសិក្សា ការវាយតម្លៃ អត្តលេខ និងថ្ងៃខែឆ្នាំកំណើត។",
  ctaTitleEn: "Ready to be part of our school?", ctaTitleKm: "រួចរាល់ដើម្បីក្លាយជាផ្នែកមួយនៃសាលារបស់យើង?",
  ctaDescEn: "Enrollment for the new academic year is open. Contact our office to learn how to join.", ctaDescKm: "ការចុះឈ្មោះចូលរៀនសម្រាប់ឆ្នាំសិក្សាថ្មី បានបើកហើយ។",
  ctaPrimaryEn: "Contact Our Office", ctaPrimaryKm: "ទាក់ទងការិយាល័យសាលា",
  ctaSecondaryEn: "Explore Academics", ctaSecondaryKm: "ស្វែងយល់ពីការសិក្សា",
  sectionHero: true, sectionStats: true, sectionAbout: true, sectionFeatures: true,
  sectionAcademics: true, sectionResults: true, sectionNews: true, sectionEvents: true,
  sectionTeachers: false, sectionStudentLife: true, sectionGallery: true, sectionCta: true,
};

/* ──────────────────────────────────────────────────────
   SECTION META (visibility toggles)
────────────────────────────────────────────────────── */
const sectionMeta: { key: keyof HomeContent; icon: React.ElementType; name: { en: string; km: string } }[] = [
  { key: "sectionHero",        icon: ImageIcon,    name: { en: "Hero Banner",        km: "បដាខាងលើ" } },
  { key: "sectionStats",       icon: BarChart2,    name: { en: "School Statistics",  km: "ស្ថិតិសាលា" } },
  { key: "sectionAbout",       icon: Info,         name: { en: "About School",       km: "អំពីសាលា" } },
  { key: "sectionFeatures",    icon: Zap,          name: { en: "Key Features",       km: "លក្ខណៈពិសេស" } },
  { key: "sectionAcademics",   icon: BookOpen,     name: { en: "Academic Programs",  km: "កម្មវិធីសិក្សា" } },
  { key: "sectionResults",     icon: Trophy,       name: { en: "Student Results",    km: "លទ្ធផលសិស្ស" } },
  { key: "sectionNews",        icon: Megaphone,    name: { en: "Latest News",        km: "ព័ត៌មានថ្មីៗ" } },
  { key: "sectionEvents",      icon: CalendarDays, name: { en: "Upcoming Events",    km: "ព្រឹត្តិការណ៍" } },
  { key: "sectionTeachers",    icon: Users,        name: { en: "Teachers Directory", km: "លោកគ្រូ អ្នកគ្រូ" } },
  { key: "sectionStudentLife", icon: Heart,        name: { en: "Student Life",       km: "ជីវិតសិស្ស" } },
  { key: "sectionGallery",     icon: Camera,       name: { en: "Photo Gallery",      km: "វិចិត្រសាល" } },
  { key: "sectionCta",         icon: Phone,        name: { en: "Call to Action",     km: "ប្លុកអំពាវនាវ" } },
];

type PanelKey =
  | "sections" | "hero" | "about" | "stats" | "features"
  | "news" | "events" | "teachers" | "gallery"
  | "studentlife" | "academics" | "results" | "cta";

/* ──────────────────────────────────────────────────────
   REUSABLE UI
────────────────────────────────────────────────────── */
function AccordionPanel({ panelKey, openPanel, setOpenPanel, icon: Icon, title, children }: {
  panelKey: PanelKey; openPanel: PanelKey | null; setOpenPanel: (p: PanelKey | null) => void;
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  const open = openPanel === panelKey;
  return (
    <div className="hpe2-accordion">
      <button type="button" onClick={() => setOpenPanel(open ? null : panelKey)}
        className="hpe2-accordion-trigger" aria-expanded={open}>
        <span className="hpe2-acc-icon-wrap"><Icon className="hpe2-acc-icon" /></span>
        <span className="hpe2-acc-title">{title}</span>
        {open ? <ChevronDown className="hpe2-acc-chevron" /> : <ChevronRight className="hpe2-acc-chevron" />}
      </button>
      {open && <div className="hpe2-accordion-body">{children}</div>}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="hpe2-field"><label className="hpe2-label">{label}</label>{children}</div>;
}
function TI({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="hpe2-input" />;
}
function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="hpe2-textarea" />;
}
function NI({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="hpe2-num-row">
      <Hash className="hpe2-num-icon" />
      <span className="hpe2-num-label">{label}</span>
      <input type="number" value={value} min={0} onChange={e => onChange(Number(e.target.value))} className="hpe2-num-input" />
    </div>
  );
}
function LangTag({ flag, lang, km }: { flag: string; lang: string; km?: boolean }) {
  return <p className={cn("hpe2-lang-tag", km && "hpe2-lang-km")}>{flag} {lang}</p>;
}

/* Heading Fields helper - used for sections that only have a heading (title + desc) */
function HeadingFields({ locale, en, km, onEnTitle, onKmTitle, onEnDesc, onKmDesc }: {
  locale: string;
  en: { title: string; desc: string };
  km: { title: string; desc: string };
  onEnTitle: (v: string) => void; onKmTitle: (v: string) => void;
  onEnDesc: (v: string) => void; onKmDesc: (v: string) => void;
}) {
  void locale;
  return (
    <div className="hpe2-fields">
      <p className="hpe2-panel-desc">Edit the heading that appears at the top of this section.</p>
      <LangTag flag="🇺🇸" lang="English" />
      <F label="Section Title"><TI value={en.title} onChange={onEnTitle} /></F>
      <F label="Description"><TA value={en.desc} onChange={onEnDesc} /></F>
      <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
      <F label="ចំណងជើង"><TI value={km.title} onChange={onKmTitle} /></F>
      <F label="ការពិពណ៌នា"><TA value={km.desc} onChange={onKmDesc} /></F>
    </div>
  );
}

/* Image uploader */
function ImgUp({ label, currentUrl, fieldKey, onUploaded }: {
  label: string; currentUrl: string; fieldKey: string; onUploaded: (url: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file: File) => {
    setUploading(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file); fd.append("folder", "home");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json() as { data?: { url: string } };
      if (!res.ok || !json.data) throw new Error();
      onUploaded(json.data.url);
    } catch { setErr("Upload failed. Try again."); }
    finally { setUploading(false); }
  };

  return (
    <div className="hpe2-imgup">
      <label className="hpe2-label">{label}</label>
      <div className="hpe2-imgup-preview" onClick={() => !uploading && ref.current?.click()}>
        {currentUrl
          ? <Image src={currentUrl} alt={label} fill className="hpe2-imgup-img" unoptimized />
          : <div className="hpe2-imgup-empty"><Upload className="hpe2-imgup-empty-icon" /><span>Upload image</span></div>}
        <div className="hpe2-imgup-overlay">
          {uploading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : <Upload className="h-5 w-5 text-white" />}
        </div>
      </div>
      {err && <p className="hpe2-imgup-err"><AlertCircle className="h-3.5 w-3.5" />{err}</p>}
      <input ref={ref} type="file" accept="image/*" className="sr-only" id={`img-${fieldKey}`}
        onChange={e => { const f = e.target.files?.[0]; if (f) void upload(f); }} />
      <p className="hpe2-imgup-hint">Click image to change · JPEG / PNG / WebP · max 10 MB</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────── */
export function HomePageEditor() {
  const locale = useAdminLocale();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("sections");
  const [content, setContent] = useState<HomeContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Load */
  useEffect(() => {
    fetch("/api/home-content")
      .then(r => r.json())
      .then((json: { data?: HomeContent }) => {
        if (json?.data) setContent(prev => ({ ...prev, ...json.data }));
      })
      .catch(() => setLoadError("Failed to load content. Showing defaults."))
      .finally(() => setLoading(false));
  }, []);

  /* Save */
  const handleSave = async () => {
    setSaving(true); setSaveError("");
    try {
      const res = await fetch("/api/home-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
      if (iframeRef.current) {
        const s = iframeRef.current.src;
        iframeRef.current.src = "";
        setTimeout(() => { if (iframeRef.current) iframeRef.current.src = s; }, 400);
      }
    } catch { setSaveError("Could not save. Try again."); }
    finally { setSaving(false); }
  };

  const set = useCallback(<K extends keyof HomeContent>(k: K, v: HomeContent[K]) => {
    setContent(prev => ({ ...prev, [k]: v }));
    setSaved(false);
  }, []);

  const vw = { desktop: "100%", tablet: "768px", mobile: "390px" };

  return (
    <div className="hpe2-root">

      {/* ── TOPBAR ── */}
      <div className="hpe2-topbar">
        <div className="hpe2-topbar-left">
          <span className="hpe2-topbar-title">{locale === "km" ? "កែសម្រួលទំព័រដើម" : "Edit Home Page"}</span>
          <a href="/en" target="_blank" rel="noopener noreferrer" className="hpe2-topbar-link">
            <ExternalLink className="h-3.5 w-3.5" />{locale === "km" ? "មើលទំព័រ" : "View page"}
          </a>
        </div>
        <div className="hpe2-vp-group" role="group">
          {(["desktop", "tablet", "mobile"] as const).map(vp => {
            const Ic = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[vp];
            return (
              <button key={vp} type="button" onClick={() => setViewport(vp)}
                aria-pressed={viewport === vp} aria-label={vp}
                className={cn("hpe2-vp-btn", viewport === vp && "hpe2-vp-btn--on")}>
                <Ic className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div className="hpe2-topbar-right">
          <button type="button" onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }} className="hpe2-icon-btn">
            <RefreshCw className="h-4 w-4" />
          </button>
          {saved && <span className="hpe2-saved-tag"><Check className="h-3.5 w-3.5" />{locale === "km" ? "បានរក្សាទុក" : "Published!"}</span>}
          {saveError && <span className="hpe2-err-tag"><AlertCircle className="h-3.5 w-3.5" />{saveError}</span>}
          <button type="button" onClick={handleSave} disabled={saving || loading} className="hpe2-save-btn">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? (locale === "km" ? "កំពុងរក្សា…" : "Saving…") : (locale === "km" ? "រក្សាទុក" : "Publish")}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="hpe2-body">

        {/* ── LEFT PANEL ── */}
        <aside className="hpe2-panel">
          {loading && (
            <div className="hpe2-loading">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              <span>{locale === "km" ? "កំពុងផ្ទុក…" : "Loading…"}</span>
            </div>
          )}
          {loadError && <div className="hpe2-load-err"><AlertCircle className="h-4 w-4" />{loadError}</div>}

          {!loading && (
            <div className="hpe2-panel-inner">

              {/* ── 1. SECTIONS ── */}
              <AccordionPanel panelKey="sections" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Layout} title={locale === "km" ? "ផ្នែកទំព័រ" : "Page Sections"}>
                <p className="hpe2-panel-desc">{locale === "km" ? "បើក/បិទផ្នែកនៅលើទំព័រដើម" : "Toggle which sections appear on the home page."}</p>
                <div className="hpe2-sections-list">
                  {sectionMeta.map(s => {
                    const SIcon = s.icon;
                    const enabled = content[s.key] as boolean;
                    return (
                      <div key={s.key} className={cn("hpe2-section-row", !enabled && "hpe2-section-row--off")}>
                        <GripVertical className="hpe2-grip" />
                        <SIcon className="hpe2-section-icon" />
                        <span className="hpe2-section-name">{locale === "km" ? s.name.km : s.name.en}</span>
                        <button type="button" role="switch" aria-checked={enabled}
                          onClick={() => set(s.key, !enabled as HomeContent[typeof s.key])}
                          className={cn("hpe2-toggle", enabled ? "hpe2-toggle--on" : "hpe2-toggle--off")}>
                          {enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </AccordionPanel>

              {/* ── 2. HERO ── */}
              <AccordionPanel panelKey="hero" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Type} title={locale === "km" ? "កែសម្រួលបដា" : "Hero Banner"}>
                <div className="hpe2-fields">
                  <ImgUp label={locale === "km" ? "រូបភាពបដា" : "Banner Image"}
                    currentUrl={content.heroBannerUrl} fieldKey="heroBannerUrl" onUploaded={url => set("heroBannerUrl", url)} />
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Title"><TI value={content.heroTitleEn} onChange={v => set("heroTitleEn", v)} /></F>
                  <F label="Subtitle"><TI value={content.heroSubtitleEn} onChange={v => set("heroSubtitleEn", v)} /></F>
                  <F label="Description"><TA value={content.heroDescriptionEn} onChange={v => set("heroDescriptionEn", v)} /></F>
                  <F label="Primary CTA"><TI value={content.heroPrimaryCtaEn} onChange={v => set("heroPrimaryCtaEn", v)} /></F>
                  <F label="Secondary CTA"><TI value={content.heroSecondaryCtaEn} onChange={v => set("heroSecondaryCtaEn", v)} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ចំណងជើង"><TI value={content.heroTitleKm} onChange={v => set("heroTitleKm", v)} /></F>
                  <F label="ចំណងជើងរង"><TI value={content.heroSubtitleKm} onChange={v => set("heroSubtitleKm", v)} /></F>
                  <F label="ការពិពណ៌នា"><TA value={content.heroDescriptionKm} onChange={v => set("heroDescriptionKm", v)} /></F>
                  <F label="ប៊ូតុងសំខាន់"><TI value={content.heroPrimaryCtaKm} onChange={v => set("heroPrimaryCtaKm", v)} /></F>
                  <F label="ប៊ូតុងទីពីរ"><TI value={content.heroSecondaryCtaKm} onChange={v => set("heroSecondaryCtaKm", v)} /></F>
                </div>
              </AccordionPanel>

              {/* ── 3. STATS ── */}
              <AccordionPanel panelKey="stats" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={BarChart2} title={locale === "km" ? "ស្ថិតិសាលា" : "School Statistics"}>
                <div className="hpe2-fields">
                  <NI label={locale === "km" ? "ចំនួនសិស្ស" : "Total Students"} value={content.statsStudents} onChange={v => set("statsStudents", v)} />
                  <NI label={locale === "km" ? "ចំនួនគ្រូ" : "Total Teachers"} value={content.statsTeachers} onChange={v => set("statsTeachers", v)} />
                  <NI label={locale === "km" ? "ចំនួនបន្ទប់រៀន" : "Classrooms"} value={content.statsClassrooms} onChange={v => set("statsClassrooms", v)} />
                  <F label={locale === "km" ? "ឆ្នាំបង្កើត" : "Year Established"}><TI value={content.statsEstablished} onChange={v => set("statsEstablished", v)} /></F>
                </div>
              </AccordionPanel>

              {/* ── 4. ABOUT ── */}
              <AccordionPanel panelKey="about" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Info} title={locale === "km" ? "អំពីសាលា" : "About Section"}>
                <div className="hpe2-fields">
                  <ImgUp label={locale === "km" ? "រូបភាព" : "Image"}
                    currentUrl={content.aboutImageUrl} fieldKey="aboutImageUrl" onUploaded={url => set("aboutImageUrl", url)} />
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Title"><TI value={content.aboutTitleEn} onChange={v => set("aboutTitleEn", v)} /></F>
                  <F label="Description"><TA value={content.aboutDescriptionEn} onChange={v => set("aboutDescriptionEn", v)} rows={4} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ចំណងជើង"><TI value={content.aboutTitleKm} onChange={v => set("aboutTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នា"><TA value={content.aboutDescriptionKm} onChange={v => set("aboutDescriptionKm", v)} rows={4} /></F>
                </div>
              </AccordionPanel>

              {/* ── 5. FEATURES ── */}
              <AccordionPanel panelKey="features" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Zap} title={locale === "km" ? "លក្ខណៈពិសេស" : "Key Features"}>
                <div className="hpe2-fields">
                  {([1, 2, 3, 4] as const).map(n => (
                    <div key={n} className="hpe2-feature-block">
                      <p className="hpe2-feature-label">Feature {n}</p>
                      <LangTag flag="🇺🇸" lang="English" />
                      <F label="Title"><TI value={content[`feat${n}TitleEn`]} onChange={v => set(`feat${n}TitleEn`, v)} /></F>
                      <F label="Description"><TA value={content[`feat${n}DescEn`]} onChange={v => set(`feat${n}DescEn`, v)} rows={2} /></F>
                      <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                      <F label="ចំណងជើង"><TI value={content[`feat${n}TitleKm`]} onChange={v => set(`feat${n}TitleKm`, v)} /></F>
                      <F label="ការពិពណ៌នា"><TA value={content[`feat${n}DescKm`]} onChange={v => set(`feat${n}DescKm`, v)} rows={2} /></F>
                    </div>
                  ))}
                </div>
              </AccordionPanel>

              {/* ── 6. ACADEMICS heading ── */}
              <AccordionPanel panelKey="academics" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={BookOpen} title={locale === "km" ? "កម្មវិធីសិក្សា" : "Academic Programs"}>
                <HeadingFields locale={locale}
                  en={{ title: content.academicsTitleEn, desc: content.academicsDescEn }}
                  km={{ title: content.academicsTitleKm, desc: content.academicsDescKm }}
                  onEnTitle={v => set("academicsTitleEn", v)} onKmTitle={v => set("academicsTitleKm", v)}
                  onEnDesc={v => set("academicsDescEn", v)} onKmDesc={v => set("academicsDescKm", v)} />
              </AccordionPanel>

              {/* ── 7. RESULTS heading ── */}
              <AccordionPanel panelKey="results" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Trophy} title={locale === "km" ? "លទ្ធផលសិស្ស" : "Student Results"}>
                <HeadingFields locale={locale}
                  en={{ title: content.resultsTitleEn, desc: content.resultsDescEn }}
                  km={{ title: content.resultsTitleKm, desc: content.resultsDescKm }}
                  onEnTitle={v => set("resultsTitleEn", v)} onKmTitle={v => set("resultsTitleKm", v)}
                  onEnDesc={v => set("resultsDescEn", v)} onKmDesc={v => set("resultsDescKm", v)} />
              </AccordionPanel>

              {/* ── 8. NEWS heading ── */}
              <AccordionPanel panelKey="news" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Megaphone} title={locale === "km" ? "ព័ត៌មានថ្មីៗ" : "News Section"}>
                <HeadingFields locale={locale}
                  en={{ title: content.newsTitleEn, desc: content.newsDescEn }}
                  km={{ title: content.newsTitleKm, desc: content.newsDescKm }}
                  onEnTitle={v => set("newsTitleEn", v)} onKmTitle={v => set("newsTitleKm", v)}
                  onEnDesc={v => set("newsDescEn", v)} onKmDesc={v => set("newsDescKm", v)} />
              </AccordionPanel>

              {/* ── 9. EVENTS heading ── */}
              <AccordionPanel panelKey="events" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={CalendarDays} title={locale === "km" ? "ព្រឹត្តិការណ៍" : "Events Section"}>
                <HeadingFields locale={locale}
                  en={{ title: content.eventsTitleEn, desc: content.eventsDescEn }}
                  km={{ title: content.eventsTitleKm, desc: content.eventsDescKm }}
                  onEnTitle={v => set("eventsTitleEn", v)} onKmTitle={v => set("eventsTitleKm", v)}
                  onEnDesc={v => set("eventsDescEn", v)} onKmDesc={v => set("eventsDescKm", v)} />
              </AccordionPanel>

              {/* ── 10. TEACHERS heading ── */}
              <AccordionPanel panelKey="teachers" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Users} title={locale === "km" ? "លោកគ្រូ អ្នកគ្រូ" : "Teachers Section"}>
                <HeadingFields locale={locale}
                  en={{ title: content.teachersTitleEn, desc: content.teachersDescEn }}
                  km={{ title: content.teachersTitleKm, desc: content.teachersDescKm }}
                  onEnTitle={v => set("teachersTitleEn", v)} onKmTitle={v => set("teachersTitleKm", v)}
                  onEnDesc={v => set("teachersDescEn", v)} onKmDesc={v => set("teachersDescKm", v)} />
              </AccordionPanel>

              {/* ── 11. STUDENT LIFE heading ── */}
              <AccordionPanel panelKey="studentlife" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Heart} title={locale === "km" ? "ជីវិតសិស្ស" : "Student Life"}>
                <HeadingFields locale={locale}
                  en={{ title: content.studentLifeTitleEn, desc: content.studentLifeDescEn }}
                  km={{ title: content.studentLifeTitleKm, desc: content.studentLifeDescKm }}
                  onEnTitle={v => set("studentLifeTitleEn", v)} onKmTitle={v => set("studentLifeTitleKm", v)}
                  onEnDesc={v => set("studentLifeDescEn", v)} onKmDesc={v => set("studentLifeDescKm", v)} />
              </AccordionPanel>

              {/* ── 12. GALLERY heading ── */}
              <AccordionPanel panelKey="gallery" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Camera} title={locale === "km" ? "វិចិត្រសាល" : "Gallery Section"}>
                <HeadingFields locale={locale}
                  en={{ title: content.galleryTitleEn, desc: content.galleryDescEn }}
                  km={{ title: content.galleryTitleKm, desc: content.galleryDescKm }}
                  onEnTitle={v => set("galleryTitleEn", v)} onKmTitle={v => set("galleryTitleKm", v)}
                  onEnDesc={v => set("galleryDescEn", v)} onKmDesc={v => set("galleryDescKm", v)} />
              </AccordionPanel>

              {/* ── 13. CTA SECTION ── */}
              <AccordionPanel panelKey="cta" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Phone} title={locale === "km" ? "ប្លុកអំពាវនាវ" : "Call to Action"}>
                <div className="hpe2-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Heading"><TI value={content.ctaTitleEn} onChange={v => set("ctaTitleEn", v)} /></F>
                  <F label="Description"><TA value={content.ctaDescEn} onChange={v => set("ctaDescEn", v)} /></F>
                  <F label="Primary Button"><TI value={content.ctaPrimaryEn} onChange={v => set("ctaPrimaryEn", v)} /></F>
                  <F label="Secondary Button"><TI value={content.ctaSecondaryEn} onChange={v => set("ctaSecondaryEn", v)} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ចំណងជើង"><TI value={content.ctaTitleKm} onChange={v => set("ctaTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នា"><TA value={content.ctaDescKm} onChange={v => set("ctaDescKm", v)} /></F>
                  <F label="ប៊ូតុងសំខាន់"><TI value={content.ctaPrimaryKm} onChange={v => set("ctaPrimaryKm", v)} /></F>
                  <F label="ប៊ូតុងទីពីរ"><TI value={content.ctaSecondaryKm} onChange={v => set("ctaSecondaryKm", v)} /></F>
                </div>
              </AccordionPanel>

            </div>
          )}
        </aside>

        {/* ── RIGHT: IFRAME PREVIEW ── */}
        <div className="hpe2-preview-area">
          <div className="hpe2-iframe-wrap" style={{ maxWidth: vw[viewport] }}>
            <iframe ref={iframeRef} src="/en" title="Home page preview"
              className="hpe2-iframe" sandbox="allow-same-origin allow-scripts allow-forms" />
            <div className="hpe2-preview-badge">
              {locale === "km" ? "ការមើលជាមុន" : "Preview"} · {viewport}
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        .hpe2-root { display:flex; flex-direction:column; height:calc(100vh - 64px); font-family:var(--font-sans,system-ui,sans-serif); background:#f1f5f9; overflow:hidden; }
        /* topbar */
        .hpe2-topbar { display:flex; align-items:center; gap:.75rem; padding:0 1rem; height:52px; background:#0f172a; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0; z-index:20; }
        .hpe2-topbar-left { display:flex; align-items:center; gap:.75rem; flex:1; min-width:0; }
        .hpe2-topbar-title { font-size:.82rem; font-weight:700; color:#fff; white-space:nowrap; }
        .hpe2-topbar-link { display:inline-flex; align-items:center; gap:.35rem; font-size:.75rem; font-weight:500; color:rgba(255,255,255,.5); text-decoration:none; transition:color .15s; white-space:nowrap; }
        .hpe2-topbar-link:hover { color:rgba(255,255,255,.85); }
        .hpe2-topbar-right { display:flex; align-items:center; gap:.6rem; flex-shrink:0; }
        .hpe2-vp-group { display:flex; border:1px solid rgba(255,255,255,.12); border-radius:8px; overflow:hidden; }
        .hpe2-vp-btn { display:flex; align-items:center; justify-content:center; padding:.4rem .65rem; background:transparent; border:none; cursor:pointer; color:rgba(255,255,255,.45); transition:background .15s,color .15s; }
        .hpe2-vp-btn:hover { color:rgba(255,255,255,.8); }
        .hpe2-vp-btn--on { background:rgba(255,255,255,.12); color:#fff; }
        .hpe2-icon-btn { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:7px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); cursor:pointer; color:rgba(255,255,255,.6); transition:background .15s,color .15s; }
        .hpe2-icon-btn:hover { background:rgba(255,255,255,.14); color:#fff; }
        .hpe2-saved-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#34d399; white-space:nowrap; }
        .hpe2-err-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#f87171; white-space:nowrap; }
        .hpe2-save-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.45rem 1rem; border-radius:8px; border:none; background:#f59e0b; color:#000; font-size:.8rem; font-weight:700; cursor:pointer; transition:opacity .15s,transform .15s; white-space:nowrap; }
        .hpe2-save-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .hpe2-save-btn:disabled { opacity:.5; cursor:not-allowed; }
        /* body */
        .hpe2-body { display:flex; flex:1; overflow:hidden; }
        /* panel */
        .hpe2-panel { width:320px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; overflow-y:auto; display:flex; flex-direction:column; }
        .hpe2-loading { display:flex; flex-direction:column; align-items:center; gap:.75rem; padding:3rem 1rem; color:#94a3b8; font-size:.82rem; }
        .hpe2-load-err { display:flex; align-items:center; gap:.5rem; margin:.75rem; padding:.65rem .85rem; border-radius:8px; background:#fef2f2; border:1px solid #fecaca; color:#dc2626; font-size:.76rem; font-weight:500; }
        .hpe2-panel-inner { padding:.75rem; display:flex; flex-direction:column; gap:.5rem; }
        .hpe2-panel-desc { font-size:.75rem; color:#64748b; margin:0 0 .75rem; line-height:1.5; }
        /* accordion */
        .hpe2-accordion { border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .hpe2-accordion-trigger { display:flex; align-items:center; gap:.6rem; width:100%; padding:.7rem .85rem; background:#f8fafc; border:none; cursor:pointer; text-align:left; transition:background .15s; }
        .hpe2-accordion-trigger:hover { background:#f1f5f9; }
        .hpe2-acc-icon-wrap { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:7px; background:#0f172a; flex-shrink:0; }
        .hpe2-acc-icon { width:14px; height:14px; color:#fff; }
        .hpe2-acc-title { font-size:.82rem; font-weight:700; color:#0f172a; flex:1; }
        .hpe2-acc-chevron { width:15px; height:15px; color:#94a3b8; flex-shrink:0; }
        .hpe2-accordion-body { padding:.85rem; border-top:1px solid #e2e8f0; background:#fff; }
        /* sections list */
        .hpe2-sections-list { display:flex; flex-direction:column; gap:.35rem; }
        .hpe2-section-row { display:flex; align-items:center; gap:.55rem; padding:.5rem .6rem; border-radius:8px; border:1.5px solid #e2e8f0; background:#fff; transition:opacity .2s; }
        .hpe2-section-row--off { opacity:.45; background:#f8fafc; }
        .hpe2-grip { width:14px; height:14px; color:#cbd5e1; cursor:grab; flex-shrink:0; }
        .hpe2-section-icon { width:14px; height:14px; color:#64748b; flex-shrink:0; }
        .hpe2-section-name { flex:1; font-size:.8rem; font-weight:600; color:#334155; }
        .hpe2-toggle { display:flex; align-items:center; justify-content:center; width:30px; height:22px; border-radius:6px; border:1px solid transparent; cursor:pointer; flex-shrink:0; transition:background .2s; }
        .hpe2-toggle--on { background:#0f172a; border-color:#0f172a; color:#fff; }
        .hpe2-toggle--off { background:#f1f5f9; border-color:#e2e8f0; color:#94a3b8; }
        /* fields */
        .hpe2-fields { display:flex; flex-direction:column; gap:.65rem; }
        .hpe2-lang-tag { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#475569; padding:.4rem 0 .1rem; border-top:1px solid #f1f5f9; margin-top:.3rem; }
        .hpe2-lang-km { color:#1e3a5f; }
        .hpe2-field { display:flex; flex-direction:column; gap:.25rem; }
        .hpe2-label { font-size:.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.06em; }
        .hpe2-input, .hpe2-textarea { width:100%; padding:.5rem .7rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:.82rem; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s; box-sizing:border-box; font-family:inherit; resize:vertical; }
        .hpe2-input:focus, .hpe2-textarea:focus { border-color:#0f172a; box-shadow:0 0 0 3px rgba(15,23,42,.08); background:#fff; }
        .hpe2-textarea { min-height:56px; }
        .hpe2-num-row { display:flex; align-items:center; gap:.55rem; padding:.45rem .7rem; border:1.5px solid #e2e8f0; border-radius:8px; background:#f8fafc; }
        .hpe2-num-icon { width:14px; height:14px; color:#94a3b8; flex-shrink:0; }
        .hpe2-num-label { font-size:.8rem; font-weight:600; color:#334155; flex:1; }
        .hpe2-num-input { width:80px; padding:.3rem .5rem; border:1.5px solid #e2e8f0; border-radius:6px; font-size:.82rem; font-weight:700; color:#0f172a; background:#fff; outline:none; text-align:right; transition:border-color .15s; }
        .hpe2-num-input:focus { border-color:#0f172a; }
        /* image uploader */
        .hpe2-imgup { display:flex; flex-direction:column; gap:.35rem; }
        .hpe2-imgup-preview { position:relative; width:100%; height:120px; border:2px dashed #e2e8f0; border-radius:10px; overflow:hidden; cursor:pointer; background:#f8fafc; transition:border-color .15s; }
        .hpe2-imgup-preview:hover { border-color:#94a3b8; }
        .hpe2-imgup-img { object-fit:cover; }
        .hpe2-imgup-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:.4rem; color:#94a3b8; font-size:.78rem; font-weight:500; }
        .hpe2-imgup-empty-icon { width:22px; height:22px; }
        .hpe2-imgup-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(15,23,42,.45); opacity:0; transition:opacity .2s; }
        .hpe2-imgup-preview:hover .hpe2-imgup-overlay { opacity:1; }
        .hpe2-imgup-err { display:flex; align-items:center; gap:.3rem; font-size:.72rem; font-weight:500; color:#dc2626; }
        .hpe2-imgup-hint { font-size:.68rem; color:#94a3b8; margin:0; }
        /* feature block */
        .hpe2-feature-block { padding:.65rem; border:1.5px solid #f1f5f9; border-radius:8px; background:#fafbfc; display:flex; flex-direction:column; gap:.5rem; }
        .hpe2-feature-label { font-size:.72rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:.08em; }
        /* preview */
        .hpe2-preview-area { flex:1; overflow:auto; display:flex; align-items:flex-start; justify-content:center; padding:1rem; background:#e2e8f0; }
        .hpe2-iframe-wrap { position:relative; width:100%; min-height:calc(100vh - 64px - 52px - 2rem); transition:max-width .3s ease; background:#fff; border-radius:10px; box-shadow:0 4px 32px rgba(0,0,0,.15); overflow:hidden; }
        .hpe2-iframe { width:100%; height:100%; border:none; display:block; min-height:calc(100vh - 64px - 52px - 2rem); }
        .hpe2-preview-badge { position:absolute; top:12px; right:12px; padding:.3rem .65rem; border-radius:99px; background:rgba(15,23,42,.75); color:rgba(255,255,255,.85); font-size:.7rem; font-weight:600; text-transform:capitalize; letter-spacing:.04em; pointer-events:none; backdrop-filter:blur(4px); }
      `}</style>
    </div>
  );
}
