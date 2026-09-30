"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Tablet, Smartphone,
  Eye, EyeOff, Check, RefreshCw,
  ExternalLink, ChevronDown, ChevronRight,
  Layout, Type, Info, Zap, Building2, Phone,
  GripVertical, Save, Upload, Loader2, AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";

/* ──────────────────────────────────────────────────────
   TYPE & DEFAULTS
────────────────────────────────────────────────────── */
export interface AboutContent {
  id?: string;
  /* Hero */
  heroEyebrowEn: string; heroEyebrowKm: string;
  heroTitleEn: string; heroTitleKm: string;
  heroDescEn: string; heroDescKm: string;
  heroImageUrl: string;
  /* About Overview */
  aboutEyebrowEn: string; aboutEyebrowKm: string;
  aboutTitleEn: string; aboutTitleKm: string;
  aboutDescEn: string; aboutDescKm: string;
  aboutImageUrl: string;
  aboutYearsCount: number;
  aboutYearsLabelEn: string; aboutYearsLabelKm: string;
  aboutPoint1En: string; aboutPoint1Km: string;
  aboutPoint2En: string; aboutPoint2Km: string;
  aboutPoint3En: string; aboutPoint3Km: string;
  aboutBadgeTextEn: string; aboutBadgeTextKm: string;
  aboutCtaTextEn: string; aboutCtaTextKm: string;
  aboutSecondaryLinkEn: string; aboutSecondaryLinkKm: string;
  /* Features */
  featuresTitleEn: string; featuresTitleKm: string;
  featuresDescEn: string; featuresDescKm: string;
  feat1TitleEn: string; feat1TitleKm: string; feat1DescEn: string; feat1DescKm: string;
  feat2TitleEn: string; feat2TitleKm: string; feat2DescEn: string; feat2DescKm: string;
  feat3TitleEn: string; feat3TitleKm: string; feat3DescEn: string; feat3DescKm: string;
  feat4TitleEn: string; feat4TitleKm: string; feat4DescEn: string; feat4DescKm: string;
  /* Campus */
  campusEyebrowEn: string; campusEyebrowKm: string;
  campusTitleEn: string; campusTitleKm: string;
  campusDescEn: string; campusDescKm: string;
  campusStat1Num: string; campusStat1LabelEn: string; campusStat1LabelKm: string;
  campusStat2Num: string; campusStat2LabelEn: string; campusStat2LabelKm: string;
  fac1TitleEn: string; fac1TitleKm: string; fac1DescEn: string; fac1DescKm: string;
  fac2TitleEn: string; fac2TitleKm: string; fac2DescEn: string; fac2DescKm: string;
  fac3TitleEn: string; fac3TitleKm: string; fac3DescEn: string; fac3DescKm: string;
  fac4TitleEn: string; fac4TitleKm: string; fac4DescEn: string; fac4DescKm: string;
  fac5TitleEn: string; fac5TitleKm: string; fac5DescEn: string; fac5DescKm: string;
  fac6TitleEn: string; fac6TitleKm: string; fac6DescEn: string; fac6DescKm: string;
  /* CTA */
  ctaTitleEn: string; ctaTitleKm: string;
  ctaDescEn: string; ctaDescKm: string;
  ctaPrimaryEn: string; ctaPrimaryKm: string;
  ctaSecondaryEn: string; ctaSecondaryKm: string;
  /* Section toggles */
  sectionHero: boolean;
  sectionAbout: boolean;
  sectionFeatures: boolean;
  sectionCampus: boolean;
  sectionCta: boolean;
}

const defaults: AboutContent = {
  heroEyebrowEn: "Discover Our Institution", heroEyebrowKm: "ស្វែងយល់ពីគ្រឹះស្ថានរបស់យើង",
  heroTitleEn: "About Hun Sen Kampong Tralach High School", heroTitleKm: "អំពី វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច",
  heroDescEn: "Learn about our rich history, mission, values, facilities, and our dedicated educators shaping future leaders.",
  heroDescKm: "ស្វែងយល់អំពីប្រវត្តិសាស្ត្រ បេសកកម្ម តម្លៃ បរិស័ទ និងលោកគ្រូអ្នកគ្រូដែលកំពុងបណ្ដុះបណ្ដាលយុវជន។",
  heroImageUrl: "/images/school/about.svg",

  aboutEyebrowEn: "About Our School", aboutEyebrowKm: "អំពីសាលាយើង",
  aboutTitleEn: "Learning Today. Leading Tomorrow.", aboutTitleKm: "រៀនថ្ងៃនេះ ដើម្បីដឹកនាំថ្ងៃស្អែក",
  aboutDescEn: "Hun Sen Kampong Tralach High School is a public higher secondary school serving the students of Kampong Tralach district, Kampong Chhnang province.",
  aboutDescKm: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច គឺជាវិទ្យាល័យសាធារណៈ ដែលផ្តល់សេវាអប់រំដល់សិស្សានុសិស្សក្នុងស្រុកកំពង់ត្រឡាច ខេត្តកំពង់ឆ្នាំង។",
  aboutImageUrl: "/images/school/about.svg",
  aboutYearsCount: 19,
  aboutYearsLabelEn: "Years of Educational Excellence", aboutYearsLabelKm: "ឆ្នាំនៃឧត្តមភាពនៃការអប់រំ",
  aboutPoint1En: "MoEYS standard curriculum Grade 7 to 12", aboutPoint1Km: "កម្មវិធីសិក្សាស្របតាមក្រសួងអប់រំ យុវជន និងកីឡា (ថ្នាក់ទី ៧ ដល់ ១២)",
  aboutPoint2En: "Qualified teachers and modern computer laboratories", aboutPoint2Km: "លោកគ្រូ អ្នកគ្រូមានគរុកោសល្យ និងមន្ទីរពិសោធន៍ទំនើប",
  aboutPoint3En: "Rich extracurricular programs, sports, and youth leadership", aboutPoint3Km: "កម្មវិធីសិក្សាបន្ថែម កីឡា និងការបណ្ដុះបណ្ដាលភាពជាអ្នកដឹកនាំ",
  aboutBadgeTextEn: "Strong track record in national exams and enrichment programs", aboutBadgeTextKm: "សមិទ្ធផលពិសេសលើការប្រឡងជាតិ និងកម្មវិធីបន្ថែម",
  aboutCtaTextEn: "Learn More About Us", aboutCtaTextKm: "ស្វែងយល់បន្ថែម",
  aboutSecondaryLinkEn: "View Academic Programs", aboutSecondaryLinkKm: "មើលកម្មវិធីសិក្សា",

  featuresTitleEn: "Why Choose Our School", featuresTitleKm: "ហេតុអ្វីជ្រើសរើសសាលាយើង?",
  featuresDescEn: "We provide high standards of learning, discipline, and modern facilities.", featuresDescKm: "យើងផ្តល់ជូននូវស្តង់ដារអប់រំខ្ពស់ វិន័យ និងបរិក្ខារទំនើបៗ។",
  feat1TitleEn: "Quality Education", feat1TitleKm: "ការអប់រំមានគុណភាព",
  feat1DescEn: "A strong national curriculum delivered by professional teachers.", feat1DescKm: "កម្មវិធីសិក្សាជាតិរឹងមាំ បង្រៀនដោយគ្រូជំនាញ។",
  feat2TitleEn: "Modern Facilities", feat2TitleKm: "បរិការៈទំនើប",
  feat2DescEn: "Libraries, computer rooms and science labs.", feat2DescKm: "បណ្ណាល័យ បន្ទប់កុំព្យូទ័រ និងមន្ទីរពិសោធន៍វិទ្យាសាស្ត្រ។",
  feat3TitleEn: "Sports & Clubs", feat3TitleKm: "កីឡា និងក្លឹប",
  feat3DescEn: "Football, volleyball and youth clubs.", feat3DescKm: "បាល់ទាត់ បាល់ទះ និងក្លឹបយុវជន។",
  feat4TitleEn: "Safe Environment", feat4TitleKm: "បរិយាកាសសុវត្ថិភាព",
  feat4DescEn: "A respectful and supportive school culture.", feat4DescKm: "វប្បធម៌សាលាដែលមានការគោរព និងគាំទ្រ។",

  campusEyebrowEn: "Campus Life & Environment", campusEyebrowKm: "ជីវិត និងបរិស្ថានក្នុងសាលា",
  campusTitleEn: "Our Campus & Facilities", campusTitleKm: "បរិវេណ និងបរិក្ខារសាលា",
  campusDescEn: "Explore our spacious classrooms, computer labs, library, and sports grounds.", campusDescKm: "ស្វែងយល់អំពីបន្ទប់រៀន បន្ទប់កុំព្យូទ័រ បណ្ណាល័យ និងទីលានកីឡា។",
  campusStat1Num: "35+", campusStat1LabelEn: "Classrooms", campusStat1LabelKm: "បន្ទប់រៀន",
  campusStat2Num: "6", campusStat2LabelEn: "Sports Areas", campusStat2LabelKm: "ទីលានកីឡា",

  fac1TitleEn: "Classrooms", fac1TitleKm: "បន្ទប់រៀន",
  fac1DescEn: "Bright, spacious classrooms equipped for effective learning in every subject.", fac1DescKm: "បន្ទប់រៀនធំទូលាយ និងភ្លឺច្បាស់ បំពាក់បរិការៈសម្រាប់ការរៀនសូត្រប្រកបដោយប្រសិទ្ធភាពលើគ្រប់មុខវិជ្ជា។",
  fac2TitleEn: "Library", fac2TitleKm: "បណ្ណាល័យ",
  fac2DescEn: "A quiet reading space with books in Khmer, English and science for all grades.", fac2DescKm: "កន្លែងអានសៀវភៅស្ងប់ស្ងាត់ មានសៀវភៅជាភាសាខ្មែរ អង់គ្លេស និងវិទ្យាសាស្ត្រ សម្រាប់គ្រប់ថ្នាក់។",
  fac3TitleEn: "Computer Room", fac3TitleKm: "បន្ទប់កុំព្យូទ័រ",
  fac3DescEn: "Digital literacy classes with computer access for students of all levels.", fac3DescKm: "ថ្នាក់រៀនជំនាញឌីជីថល ជាមួយការប្រើប្រាស់កុំព្យូទ័រសម្រាប់សិស្សគ្រប់កម្រិត។",
  fac4TitleEn: "Science Facilities", fac4TitleKm: "បន្ទប់ពិសោធន៍វិទ្យាសាស្ត្រ",
  fac4DescEn: "Laboratories where students perform experiments in physics, chemistry and biology.", fac4DescKm: "មន្ទីរពិសោធន៍ ដែលសិស្សានុសិស្សធ្វើការពិសោធន៍រូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា។",
  fac5TitleEn: "Sports Area", fac5TitleKm: "ទីលានកីឡា",
  fac5DescEn: "Football and volleyball courts that keep our students active and healthy.", fac5DescKm: "ទីលានបាល់ទាត់ និងបាល់ទះ ដែលរក្សាសិស្សានុសិស្សឱ្យសកម្ម និងមានសុខភាពល្អ។",
  fac6TitleEn: "Student Areas", fac6TitleKm: "តំបន់សិស្សានុសិស្ស",
  fac6DescEn: "Open spaces where students relax, study together and build friendships.", fac6DescKm: "កន្លែងធំទូលាយ ដែលសិស្សានុសិស្សសម្រាក សិក្សាជាមួយគ្នា និងកសាងមិត្តភាព។",

  ctaTitleEn: "Ready to Join Our Community?", ctaTitleKm: "រួចរាល់ដើម្បីចូលរួមជាមួយសាលាយើង?",
  ctaDescEn: "Enrollment for the upcoming academic year is open. Get in touch with our office today.", ctaDescKm: "ការចុះឈ្មោះចូលរៀនសម្រាប់ឆ្នាំសិក្សាថ្មី បានបើកហើយ។ ទាក់ទងការិយាល័យយើងឥឡូវនេះ។",
  ctaPrimaryEn: "Contact Office", ctaPrimaryKm: "ទាក់ទងការិយាល័យ",
  ctaSecondaryEn: "Academic Programs", ctaSecondaryKm: "កម្មវិធីសិក្សា",

  sectionHero: true,
  sectionAbout: true,
  sectionFeatures: true,
  sectionCampus: true,
  sectionCta: true,
};

/* ──────────────────────────────────────────────────────
   SECTION META
────────────────────────────────────────────────────── */
const sectionMeta: { key: keyof AboutContent; icon: React.ElementType; name: { en: string; km: string } }[] = [
  { key: "sectionHero",     icon: Type,      name: { en: "Hero Banner",        km: "បដាខាងលើ" } },
  { key: "sectionAbout",    icon: Info,      name: { en: "About Overview",     km: "ព័ត៌មានទូទៅ" } },
  { key: "sectionFeatures", icon: Zap,       name: { en: "Why Choose Us",      km: "លក្ខណៈពិសេស" } },
  { key: "sectionCampus",   icon: Building2, name: { en: "Campus Facilities",  km: "បរិវេណសាលា" } },
  { key: "sectionCta",      icon: Phone,     name: { en: "Call to Action",     km: "ប្លុកអំពាវនាវ" } },
];

type PanelKey = "sections" | "hero" | "about" | "features" | "campus" | "cta";

/* ──────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────── */
function AccordionPanel({ panelKey, openPanel, setOpenPanel, icon: Icon, title, children }: {
  panelKey: PanelKey; openPanel: PanelKey | null; setOpenPanel: (p: PanelKey | null) => void;
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  const open = openPanel === panelKey;
  return (
    <div className="ape-accordion">
      <button type="button" onClick={() => setOpenPanel(open ? null : panelKey)}
        className="ape-accordion-trigger" aria-expanded={open}>
        <span className="ape-acc-icon-wrap"><Icon className="ape-acc-icon" /></span>
        <span className="ape-acc-title">{title}</span>
        {open ? <ChevronDown className="ape-acc-chevron" /> : <ChevronRight className="ape-acc-chevron" />}
      </button>
      {open && <div className="ape-accordion-body">{children}</div>}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="ape-field"><label className="ape-label">{label}</label>{children}</div>;
}
function TI({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="ape-input" />;
}
function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="ape-textarea" />;
}
function LangTag({ flag, lang, km }: { flag: string; lang: string; km?: boolean }) {
  return <p className={cn("ape-lang-tag", km && "ape-lang-km")}>{flag} {lang}</p>;
}

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
      fd.append("file", file); fd.append("folder", "about");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json() as { data?: { url: string } };
      if (!res.ok || !json.data) throw new Error();
      onUploaded(json.data.url);
    } catch { setErr("Upload failed. Try again."); }
    finally { setUploading(false); }
  };

  return (
    <div className="ape-imgup">
      <label className="ape-label">{label}</label>
      <div className="ape-imgup-preview" onClick={() => !uploading && ref.current?.click()}>
        {currentUrl
          ? <Image src={currentUrl} alt={label} fill className="ape-imgup-img" unoptimized />
          : <div className="ape-imgup-empty"><Upload className="ape-imgup-empty-icon" /><span>Upload image</span></div>}
        <div className="ape-imgup-overlay">
          {uploading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : <Upload className="h-5 w-5 text-white" />}
        </div>
      </div>
      {err && <p className="ape-imgup-err"><AlertCircle className="h-3.5 w-3.5" />{err}</p>}
      <input ref={ref} type="file" accept="image/*" className="sr-only" id={`img-${fieldKey}`}
        onChange={e => { const f = e.target.files?.[0]; if (f) void upload(f); }} />
      <p className="ape-imgup-hint">Click image to change · JPEG / PNG / WebP · max 10 MB</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN EDITOR COMPONENT
────────────────────────────────────────────────────── */
export function AboutPageEditor() {
  const locale = useAdminLocale();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("sections");
  const [content, setContent] = useState<AboutContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Fetch content */
  useEffect(() => {
    fetch("/api/about-content")
      .then(r => r.json())
      .then((json: { data?: AboutContent }) => {
        if (json?.data) setContent(prev => ({ ...prev, ...json.data }));
      })
      .catch(() => setLoadError("Failed to load about content. Showing defaults."))
      .finally(() => setLoading(false));
  }, []);

  /* Save */
  const handleSave = async () => {
    setSaving(true); setSaveError("");
    try {
      const res = await fetch("/api/about-content", {
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

  const set = useCallback(<K extends keyof AboutContent>(k: K, v: AboutContent[K]) => {
    setContent(prev => ({ ...prev, [k]: v }));
    setSaved(false);
  }, []);

  const vw = { desktop: "100%", tablet: "768px", mobile: "390px" };

  return (
    <div className="ape-root">

      {/* ── TOPBAR ── */}
      <div className="ape-topbar">
        <div className="ape-topbar-left">
          <span className="ape-topbar-title">{locale === "km" ? "កែសម្រួលទំព័រអំពីសាលា" : "Edit About Page"}</span>
          <a href="/en/about" target="_blank" rel="noopener noreferrer" className="ape-topbar-link">
            <ExternalLink className="h-3.5 w-3.5" />{locale === "km" ? "មើលទំព័រ" : "View page"}
          </a>
        </div>
        <div className="ape-vp-group" role="group">
          {(["desktop", "tablet", "mobile"] as const).map(vp => {
            const Ic = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[vp];
            return (
              <button key={vp} type="button" onClick={() => setViewport(vp)}
                aria-pressed={viewport === vp} aria-label={vp}
                className={cn("ape-vp-btn", viewport === vp && "ape-vp-btn--on")}>
                <Ic className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div className="ape-topbar-right">
          <button type="button" onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }} className="ape-icon-btn">
            <RefreshCw className="h-4 w-4" />
          </button>
          {saved && <span className="ape-saved-tag"><Check className="h-3.5 w-3.5" />{locale === "km" ? "បានរក្សាទុក" : "Published!"}</span>}
          {saveError && <span className="ape-err-tag"><AlertCircle className="h-3.5 w-3.5" />{saveError}</span>}
          <button type="button" onClick={handleSave} disabled={saving || loading} className="ape-save-btn">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? (locale === "km" ? "កំពុងរក្សា…" : "Saving…") : (locale === "km" ? "រក្សាទុក" : "Publish")}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="ape-body">

        {/* ── LEFT PANEL ── */}
        <aside className="ape-panel">
          {loading && (
            <div className="ape-loading">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              <span>{locale === "km" ? "កំពុងផ្ទុក…" : "Loading…"}</span>
            </div>
          )}
          {loadError && <div className="ape-load-err"><AlertCircle className="h-4 w-4" />{loadError}</div>}

          {!loading && (
            <div className="ape-panel-inner">

              {/* ── 1. SECTIONS ── */}
              <AccordionPanel panelKey="sections" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Layout} title={locale === "km" ? "ផ្នែកទំព័រ" : "Page Sections"}>
                <p className="ape-panel-desc">{locale === "km" ? "បើក/បិទផ្នែកនៅលើទំព័រអំពីសាលា" : "Toggle which sections appear on the about page."}</p>
                <div className="ape-sections-list">
                  {sectionMeta.map(s => {
                    const SIcon = s.icon;
                    const enabled = content[s.key] as boolean;
                    return (
                      <div key={s.key} className={cn("ape-section-row", !enabled && "ape-section-row--off")}>
                        <GripVertical className="ape-grip" />
                        <SIcon className="ape-section-icon" />
                        <span className="ape-section-name">{locale === "km" ? s.name.km : s.name.en}</span>
                        <button type="button" role="switch" aria-checked={enabled}
                          onClick={() => set(s.key, !enabled as AboutContent[typeof s.key])}
                          className={cn("ape-toggle", enabled ? "ape-toggle--on" : "ape-toggle--off")}>
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
                <div className="ape-fields">
                  <ImgUp label={locale === "km" ? "រូបភាពបដា" : "Banner Image"}
                    currentUrl={content.heroImageUrl} fieldKey="heroImageUrl" onUploaded={url => set("heroImageUrl", url)} />
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Eyebrow"><TI value={content.heroEyebrowEn} onChange={v => set("heroEyebrowEn", v)} /></F>
                  <F label="Title"><TI value={content.heroTitleEn} onChange={v => set("heroTitleEn", v)} /></F>
                  <F label="Description"><TA value={content.heroDescEn} onChange={v => set("heroDescEn", v)} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ពាក្យលើ"><TI value={content.heroEyebrowKm} onChange={v => set("heroEyebrowKm", v)} /></F>
                  <F label="ចំណងជើង"><TI value={content.heroTitleKm} onChange={v => set("heroTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នា"><TA value={content.heroDescKm} onChange={v => set("heroDescKm", v)} /></F>
                </div>
              </AccordionPanel>

              {/* ── 3. ABOUT OVERVIEW ── */}
              <AccordionPanel panelKey="about" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Info} title={locale === "km" ? "ព័ត៌មានទូទៅ" : "About Overview"}>
                <div className="ape-fields">
                  <ImgUp label={locale === "km" ? "រូបភាព" : "Overview Image"}
                    currentUrl={content.aboutImageUrl} fieldKey="aboutImageUrl" onUploaded={url => set("aboutImageUrl", url)} />
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Eyebrow"><TI value={content.aboutEyebrowEn} onChange={v => set("aboutEyebrowEn", v)} /></F>
                  <F label="Title"><TI value={content.aboutTitleEn} onChange={v => set("aboutTitleEn", v)} /></F>
                  <F label="Description"><TA value={content.aboutDescEn} onChange={v => set("aboutDescEn", v)} rows={4} /></F>
                  
                  <F label="Years Count"><TI value={String(content.aboutYearsCount)} onChange={v => set("aboutYearsCount", Number(v) || 0)} /></F>
                  <F label="Years Badge Text (EN)"><TI value={content.aboutYearsLabelEn} onChange={v => set("aboutYearsLabelEn", v)} /></F>
                  
                  <F label="Highlight Bullet 1 (EN)"><TI value={content.aboutPoint1En} onChange={v => set("aboutPoint1En", v)} /></F>
                  <F label="Highlight Bullet 2 (EN)"><TI value={content.aboutPoint2En} onChange={v => set("aboutPoint2En", v)} /></F>
                  <F label="Highlight Bullet 3 (EN)"><TI value={content.aboutPoint3En} onChange={v => set("aboutPoint3En", v)} /></F>
                  <F label="Sub-highlight Badge Text (EN)"><TI value={content.aboutBadgeTextEn} onChange={v => set("aboutBadgeTextEn", v)} /></F>
                  <F label="Primary Button Text (EN)"><TI value={content.aboutCtaTextEn} onChange={v => set("aboutCtaTextEn", v)} /></F>
                  <F label="Secondary Link Text (EN)"><TI value={content.aboutSecondaryLinkEn} onChange={v => set("aboutSecondaryLinkEn", v)} /></F>

                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ពាក្យលើ"><TI value={content.aboutEyebrowKm} onChange={v => set("aboutEyebrowKm", v)} /></F>
                  <F label="ចំណងជើង"><TI value={content.aboutTitleKm} onChange={v => set("aboutTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នា"><TA value={content.aboutDescKm} onChange={v => set("aboutDescKm", v)} rows={4} /></F>
                  <F label="អត្ថបទស្លាកឆ្នាំ (KM)"><TI value={content.aboutYearsLabelKm} onChange={v => set("aboutYearsLabelKm", v)} /></F>
                  <F label="ចំណុចសំខាន់ ១ (KM)"><TI value={content.aboutPoint1Km} onChange={v => set("aboutPoint1Km", v)} /></F>
                  <F label="ចំណុចសំខាន់ ២ (KM)"><TI value={content.aboutPoint2Km} onChange={v => set("aboutPoint2Km", v)} /></F>
                  <F label="ចំណុចសំខាន់ ៣ (KM)"><TI value={content.aboutPoint3Km} onChange={v => set("aboutPoint3Km", v)} /></F>
                  <F label="អត្ថបទសមិទ្ធផល (KM)"><TI value={content.aboutBadgeTextKm} onChange={v => set("aboutBadgeTextKm", v)} /></F>
                  <F label="ប៊ូតុងសំខាន់ (KM)"><TI value={content.aboutCtaTextKm} onChange={v => set("aboutCtaTextKm", v)} /></F>
                  <F label="តំណភ្ជាប់ទីពីរ (KM)"><TI value={content.aboutSecondaryLinkKm} onChange={v => set("aboutSecondaryLinkKm", v)} /></F>
                </div>
              </AccordionPanel>

              {/* ── 4. FEATURES ── */}
              <AccordionPanel panelKey="features" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Zap} title={locale === "km" ? "លក្ខណៈពិសេស" : "Why Choose Us"}>
                <div className="ape-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Section Heading Title"><TI value={content.featuresTitleEn} onChange={v => set("featuresTitleEn", v)} /></F>
                  <F label="Section Heading Description"><TA value={content.featuresDescEn} onChange={v => set("featuresDescEn", v)} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ចំណងជើងផ្នែក"><TI value={content.featuresTitleKm} onChange={v => set("featuresTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នាផ្នែក"><TA value={content.featuresDescKm} onChange={v => set("featuresDescKm", v)} /></F>

                  <p className="ape-subheading">Feature Cards (4 Items)</p>
                  {([1, 2, 3, 4] as const).map(n => (
                    <div key={n} className="ape-feature-block">
                      <p className="ape-feature-label">Card {n}</p>
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

              {/* ── 5. CAMPUS ── */}
              <AccordionPanel panelKey="campus" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Building2} title={locale === "km" ? "បរិវេណសាលា" : "Campus Facilities"}>
                <div className="ape-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Eyebrow"><TI value={content.campusEyebrowEn} onChange={v => set("campusEyebrowEn", v)} /></F>
                  <F label="Title"><TI value={content.campusTitleEn} onChange={v => set("campusTitleEn", v)} /></F>
                  <F label="Description"><TA value={content.campusDescEn} onChange={v => set("campusDescEn", v)} /></F>
                  
                  <F label="Stat 1 Number"><TI value={content.campusStat1Num} onChange={v => set("campusStat1Num", v)} /></F>
                  <F label="Stat 1 Label (EN)"><TI value={content.campusStat1LabelEn} onChange={v => set("campusStat1LabelEn", v)} /></F>

                  <F label="Stat 2 Number"><TI value={content.campusStat2Num} onChange={v => set("campusStat2Num", v)} /></F>
                  <F label="Stat 2 Label (EN)"><TI value={content.campusStat2LabelEn} onChange={v => set("campusStat2LabelEn", v)} /></F>

                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ពាក្យលើ"><TI value={content.campusEyebrowKm} onChange={v => set("campusEyebrowKm", v)} /></F>
                  <F label="ចំណងជើង"><TI value={content.campusTitleKm} onChange={v => set("campusTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នា"><TA value={content.campusDescKm} onChange={v => set("campusDescKm", v)} /></F>
                  <F label="ស្លាកស្ថិតិ ១ (KM)"><TI value={content.campusStat1LabelKm} onChange={v => set("campusStat1LabelKm", v)} /></F>
                  <F label="ស្លាកស្ថិតិ ២ (KM)"><TI value={content.campusStat2LabelKm} onChange={v => set("campusStat2LabelKm", v)} /></F>

                  <p className="ape-subheading">Facility Cards (6 Items)</p>
                  {([1, 2, 3, 4, 5, 6] as const).map(n => (
                    <div key={n} className="ape-feature-block">
                      <p className="ape-feature-label">Facility Card {n}</p>
                      <LangTag flag="🇺🇸" lang="English" />
                      <F label="Title"><TI value={content[`fac${n}TitleEn`]} onChange={v => set(`fac${n}TitleEn`, v)} /></F>
                      <F label="Description"><TA value={content[`fac${n}DescEn`]} onChange={v => set(`fac${n}DescEn`, v)} rows={2} /></F>
                      <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                      <F label="ចំណងជើង"><TI value={content[`fac${n}TitleKm`]} onChange={v => set(`fac${n}TitleKm`, v)} /></F>
                      <F label="ការពិពណ៌នា"><TA value={content[`fac${n}DescKm`]} onChange={v => set(`fac${n}DescKm`, v)} rows={2} /></F>
                    </div>
                  ))}
                </div>
              </AccordionPanel>

              {/* ── 6. CTA ── */}
              <AccordionPanel panelKey="cta" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Phone} title={locale === "km" ? "ប្លុកអំពាវនាវ" : "Call to Action"}>
                <div className="ape-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Title"><TI value={content.ctaTitleEn} onChange={v => set("ctaTitleEn", v)} /></F>
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
        <div className="ape-preview-area">
          <div className="ape-iframe-wrap" style={{ maxWidth: vw[viewport] }}>
            <iframe ref={iframeRef} src="/en/about" title="About page preview"
              className="ape-iframe" sandbox="allow-same-origin allow-scripts allow-forms" />
            <div className="ape-preview-badge">
              {locale === "km" ? "ការមើលជាមុន" : "Preview"} · {viewport}
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        .ape-root { display:flex; flex-direction:column; height:calc(100vh - 64px); font-family:var(--font-sans,system-ui,sans-serif); background:#f1f5f9; overflow:hidden; }
        .ape-topbar { display:flex; align-items:center; gap:.75rem; padding:0 1rem; height:52px; background:#0f172a; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0; z-index:20; }
        .ape-topbar-left { display:flex; align-items:center; gap:.75rem; flex:1; min-width:0; }
        .ape-topbar-title { font-size:.82rem; font-weight:700; color:#fff; white-space:nowrap; }
        .ape-topbar-link { display:inline-flex; align-items:center; gap:.35rem; font-size:.75rem; font-weight:500; color:rgba(255,255,255,.5); text-decoration:none; transition:color .15s; white-space:nowrap; }
        .ape-topbar-link:hover { color:rgba(255,255,255,.85); }
        .ape-topbar-right { display:flex; align-items:center; gap:.6rem; flex-shrink:0; }
        .ape-vp-group { display:flex; border:1px solid rgba(255,255,255,.12); border-radius:8px; overflow:hidden; }
        .ape-vp-btn { display:flex; align-items:center; justify-content:center; padding:.4rem .65rem; background:transparent; border:none; cursor:pointer; color:rgba(255,255,255,.45); transition:background .15s,color .15s; }
        .ape-vp-btn:hover { color:rgba(255,255,255,.8); }
        .ape-vp-btn--on { background:rgba(255,255,255,.12); color:#fff; }
        .ape-icon-btn { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:7px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); cursor:pointer; color:rgba(255,255,255,.6); transition:background .15s,color .15s; }
        .ape-icon-btn:hover { background:rgba(255,255,255,.14); color:#fff; }
        .ape-saved-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#34d399; white-space:nowrap; }
        .ape-err-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#f87171; white-space:nowrap; }
        .ape-save-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.45rem 1rem; border-radius:8px; border:none; background:#f59e0b; color:#000; font-size:.8rem; font-weight:700; cursor:pointer; transition:opacity .15s,transform .15s; white-space:nowrap; }
        .ape-save-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .ape-save-btn:disabled { opacity:.5; cursor:not-allowed; }
        .ape-body { display:flex; flex:1; overflow:hidden; }
        .ape-panel { width:320px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; overflow-y:auto; display:flex; flex-direction:column; }
        .ape-loading { display:flex; flex-direction:column; align-items:center; gap:.75rem; padding:3rem 1rem; color:#94a3b8; font-size:.82rem; }
        .ape-load-err { display:flex; align-items:center; gap:.5rem; margin:.75rem; padding:.65rem .85rem; border-radius:8px; background:#fef2f2; border:1px solid #fecaca; color:#dc2626; font-size:.76rem; font-weight:500; }
        .ape-panel-inner { padding:.75rem; display:flex; flex-direction:column; gap:.5rem; }
        .ape-panel-desc { font-size:.75rem; color:#64748b; margin:0 0 .75rem; line-height:1.5; }
        .ape-subheading { font-size:.74rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:.05em; margin-top:.75rem; }
        .ape-accordion { border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .ape-accordion-trigger { display:flex; align-items:center; gap:.6rem; width:100%; padding:.7rem .85rem; background:#f8fafc; border:none; cursor:pointer; text-align:left; transition:background .15s; }
        .ape-accordion-trigger:hover { background:#f1f5f9; }
        .ape-acc-icon-wrap { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:7px; background:#0f172a; flex-shrink:0; }
        .ape-acc-icon { width:14px; height:14px; color:#fff; }
        .ape-acc-title { font-size:.82rem; font-weight:700; color:#0f172a; flex:1; }
        .ape-acc-chevron { width:15px; height:15px; color:#94a3b8; flex-shrink:0; }
        .ape-accordion-body { padding:.85rem; border-top:1px solid #e2e8f0; background:#fff; }
        .ape-sections-list { display:flex; flex-direction:column; gap:.35rem; }
        .ape-section-row { display:flex; align-items:center; gap:.55rem; padding:.5rem .6rem; border-radius:8px; border:1.5px solid #e2e8f0; background:#fff; transition:opacity .2s; }
        .ape-section-row--off { opacity:.45; background:#f8fafc; }
        .ape-grip { width:14px; height:14px; color:#cbd5e1; cursor:grab; flex-shrink:0; }
        .ape-section-icon { width:14px; height:14px; color:#64748b; flex-shrink:0; }
        .ape-section-name { flex:1; font-size:.8rem; font-weight:600; color:#334155; }
        .ape-toggle { display:flex; align-items:center; justify-content:center; width:30px; height:22px; border-radius:6px; border:1px solid transparent; cursor:pointer; flex-shrink:0; transition:background .2s; }
        .ape-toggle--on { background:#0f172a; border-color:#0f172a; color:#fff; }
        .ape-toggle--off { background:#f1f5f9; border-color:#e2e8f0; color:#94a3b8; }
        .ape-fields { display:flex; flex-direction:column; gap:.65rem; }
        .ape-lang-tag { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#475569; padding:.4rem 0 .1rem; border-top:1px solid #f1f5f9; margin-top:.3rem; }
        .ape-lang-km { color:#1e3a5f; }
        .ape-field { display:flex; flex-direction:column; gap:.25rem; }
        .ape-label { font-size:.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.06em; }
        .ape-input, .ape-textarea { width:100%; padding:.5rem .7rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:.82rem; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s; box-sizing:border-box; font-family:inherit; resize:vertical; }
        .ape-input:focus, .ape-textarea:focus { border-color:#0f172a; box-shadow:0 0 0 3px rgba(15,23,42,.08); background:#fff; }
        .ape-textarea { min-height:56px; }
        .ape-imgup { display:flex; flex-direction:column; gap:.35rem; }
        .ape-imgup-preview { position:relative; width:100%; height:120px; border:2px dashed #e2e8f0; border-radius:10px; overflow:hidden; cursor:pointer; background:#f8fafc; transition:border-color .15s; }
        .ape-imgup-preview:hover { border-color:#94a3b8; }
        .ape-imgup-img { object-fit:cover; }
        .ape-imgup-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:.4rem; color:#94a3b8; font-size:.78rem; font-weight:500; }
        .ape-imgup-empty-icon { width:22px; height:22px; }
        .ape-imgup-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(15,23,42,.45); opacity:0; transition:opacity .2s; }
        .ape-imgup-preview:hover .ape-imgup-overlay { opacity:1; }
        .ape-imgup-err { display:flex; align-items:center; gap:.3rem; font-size:.72rem; font-weight:500; color:#dc2626; }
        .ape-imgup-hint { font-size:.68rem; color:#94a3b8; margin:0; }
        .ape-feature-block { padding:.65rem; border:1.5px solid #f1f5f9; border-radius:8px; background:#fafbfc; display:flex; flex-direction:column; gap:.5rem; }
        .ape-feature-label { font-size:.72rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:.08em; }
        .ape-preview-area { flex:1; overflow:auto; display:flex; align-items:flex-start; justify-content:center; padding:1rem; background:#e2e8f0; }
        .ape-iframe-wrap { position:relative; width:100%; min-height:calc(100vh - 64px); background:#fff; border-radius:12px; overflow:hidden; shadow:0 20px 25px -5px rgba(0,0,0,.1); transition:max-width .3s ease; display:flex; flex-direction:column; }
        .ape-iframe { width:100%; height:100%; flex:1; min-height:calc(100vh - 84px); border:none; }
        .ape-preview-badge { position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,.85); backdrop-filter:blur(8px); color:#fff; font-size:.7rem; font-weight:600; padding:.3rem .65rem; border-radius:20px; pointer-events:none; }
      `}</style>
    </div>
  );
}
