"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Tablet, Smartphone,
  Eye, EyeOff, Check, RefreshCw,
  ExternalLink, ChevronDown, ChevronRight,
  Layout, Type, Heart, Trophy, Camera, Phone,
  GripVertical, Save, Upload, Loader2, AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";

/* ──────────────────────────────────────────────────────
   TYPE & DEFAULTS
────────────────────────────────────────────────────── */
export interface StudentsContent {
  id?: string;
  /* Hero */
  heroEyebrowEn: string; heroEyebrowKm: string;
  heroTitleEn: string; heroTitleKm: string;
  heroDescEn: string; heroDescKm: string;
  heroImageUrl: string;

  /* Student Life */
  studentLifeEyebrowEn: string; studentLifeEyebrowKm: string;
  studentLifeTitleEn: string; studentLifeTitleKm: string;
  studentLifeDescEn: string; studentLifeDescKm: string;

  /* 6 Activity Categories */
  cat1TitleEn: string; cat1TitleKm: string; cat1DescEn: string; cat1DescKm: string;
  cat2TitleEn: string; cat2TitleKm: string; cat2DescEn: string; cat2DescKm: string;
  cat3TitleEn: string; cat3TitleKm: string; cat3DescEn: string; cat3DescKm: string;
  cat4TitleEn: string; cat4TitleKm: string; cat4DescEn: string; cat4DescKm: string;
  cat5TitleEn: string; cat5TitleKm: string; cat5DescEn: string; cat5DescKm: string;
  cat6TitleEn: string; cat6TitleKm: string; cat6DescEn: string; cat6DescKm: string;

  /* Results Section */
  resultsTitleEn: string; resultsTitleKm: string;
  resultsDescEn: string; resultsDescKm: string;

  /* Gallery Section */
  galleryTitleEn: string; galleryTitleKm: string;
  galleryDescEn: string; galleryDescKm: string;

  /* CTA */
  ctaTitleEn: string; ctaTitleKm: string;
  ctaDescEn: string; ctaDescKm: string;
  ctaPrimaryEn: string; ctaPrimaryKm: string;
  ctaSecondaryEn: string; ctaSecondaryKm: string;

  /* Toggles */
  sectionHero: boolean;
  sectionStudentLife: boolean;
  sectionResults: boolean;
  sectionGallery: boolean;
  sectionCta: boolean;
}

const defaults: StudentsContent = {
  heroEyebrowEn: "Vibrant Campus Life", heroEyebrowKm: "ជីវិតសិស្សដ៏រស់រវើក",
  heroTitleEn: "Student Life & Achievements", heroTitleKm: "ជីវិត និងសមិទ្ធផលរបស់សិស្សានុសិស្ស",
  heroDescEn: "Explore our rich extracurricular activities, sports clubs, academic achievements, and student community.",
  heroDescKm: "ស្វែងយល់ពីសកម្មភាពក្រៅផ្លូវការ ក្លឹបកីឡា សមិទ្ធផលសិក្សា និងសហគមន៍សិស្សានុសិស្ស។",
  heroImageUrl: "/images/students/sports.svg",

  studentLifeEyebrowEn: "Beyond The Classroom", studentLifeEyebrowKm: "លើសពីការរៀនក្នុងថ្នាក់",
  studentLifeTitleEn: "More Than a Classroom", studentLifeTitleKm: "លើសពីការរៀនក្នុងថ្នាក់",
  studentLifeDescEn: "Our students grow through sports, clubs, culture and leadership.", studentLifeDescKm: "សិស្សានុសិស្សរបស់យើងលូតលាស់តាមរយៈកីឡា ក្លឹប វប្បធម៌ និងភាពជាអ្នកដឹកនាំ។",

  cat1TitleEn: "Sports", cat1TitleKm: "កីឡា",
  cat1DescEn: "Football, volleyball and athletics teams representing our school with pride.", cat1DescKm: "ក្រុមបាល់ទាត់ បាល់ទះ និងអត្តពលកម្ម ដែលតំណាងសាលារបស់យើងដោយមោទនភាព។",
  cat2TitleEn: "Clubs", cat2TitleKm: "ក្លឹប",
  cat2DescEn: "English, music, art and debate clubs that spark creativity and confidence.", cat2DescKm: "ក្លឹបភាសាអង់គ្លេស តន្ត្រី សិល្បៈ និងការពិភាក្សា ដែលបំផុសគំនិតច្នៃប្រឌិត និងទំនុកចិត្ត។",
  cat3TitleEn: "Cultural Activities", cat3TitleKm: "សកម្មភាពវប្បធម៌",
  cat3DescEn: "Traditional dance, music and Khmer heritage events celebrated together.", cat3DescKm: "របាំប្រពៃណី តន្ត្រី និងពិធីវប្បធម៌ខ្មែរ ដែលប្រារព្ធរួមគ្នា។",
  cat4TitleEn: "Academic Activities", cat4TitleKm: "សកម្មភាពសិក្សា",
  cat4DescEn: "Science fairs, math competitions and study groups that push students further.", cat4DescKm: "ពិព័រណ៍វិទ្យាសាស្ត្រ ការប្រកួតគណិតវិទ្យា និងក្រុមសិក្សា ដែលជំរុញសិស្សឱ្យខិតខំបន្ថែមទៀត។",
  cat5TitleEn: "Community Activities", cat5TitleKm: "សកម្មភាពសហគមន៍",
  cat5DescEn: "Students give back by joining clean-ups, tree planting and charity drives.", cat5DescKm: "សិស្សានុសិស្សចូលរួមធ្វើអំពើល្អ ដោយរៀបចំសកម្មភាពសម្អាត ដាំដើមឈើ និងការបរិច្ចាគ។",
  cat6TitleEn: "Leadership", cat6TitleKm: "ភាពជាអ្នកដឹកនាំ",
  cat6DescEn: "Student councils and class monitors that build responsibility and teamwork.", cat6DescKm: "ក្រុមប្រឹក្សាសិស្ស និងសិស្សឆ្នើមប្រចាំថ្នាក់ ដែលកសាងទំនួលខុសត្រូវ និងការធ្វើការជាក្រុម។",

  resultsTitleEn: "Student Academic Results", resultsTitleKm: "លទ្ធផលសិក្សារបស់សិស្ស",
  resultsDescEn: "Search student results securely by academic year, evaluation period, student ID and date of birth.", resultsDescKm: "ស្វែងរកលទ្ធផលសិក្សាតាមឆ្នាំសិក្សា ការវាយតម្លៃ អត្តលេខ និងថ្ងៃខែឆ្នាំកំណើត។",

  galleryTitleEn: "Student Life Gallery", galleryTitleKm: "វិចិត្រសាលរូបថតសិស្ស",
  galleryDescEn: "A look inside our classrooms, campus events, sports competitions, and student community.", galleryDescKm: "ទស្សនារូបភាពក្នុងថ្នាក់រៀន ព្រឹត្តិការណ៍សាលា ការប្រកួតកីឡា និងសហគមន៍សិស្ស។",

  ctaTitleEn: "Want to Join Our Student Community?", ctaTitleKm: "ចង់ក្លាយជាផ្នែកមួយនៃសហគមន៍សិស្សយើង?",
  ctaDescEn: "Enrollment for the new academic year is open. Contact our administration to get started.", ctaDescKm: "ការចុះឈ្មោះចូលរៀនសម្រាប់ឆ្នាំសិក្សាថ្មី បានបើកហើយ។ ទាក់ទងរដ្ឋបាលយើងដើម្បីចាប់ផ្តើម។",
  ctaPrimaryEn: "Contact Office", ctaPrimaryKm: "ទាក់ទងការិយាល័យ",
  ctaSecondaryEn: "School Rules", ctaSecondaryKm: "បទបញ្ជាសាលា",

  sectionHero: true,
  sectionStudentLife: true,
  sectionResults: true,
  sectionGallery: true,
  sectionCta: true,
};

const sectionMeta: { key: keyof StudentsContent; icon: React.ElementType; name: { en: string; km: string } }[] = [
  { key: "sectionHero",        icon: Type,   name: { en: "Hero Banner",        km: "បដាខាងលើ" } },
  { key: "sectionStudentLife", icon: Heart,  name: { en: "Student Life",       km: "ជីវិតសិស្ស" } },
  { key: "sectionResults",     icon: Trophy, name: { en: "Academic Results",   km: "លទ្ធផលសិក្សា" } },
  { key: "sectionGallery",     icon: Camera, name: { en: "Photo Gallery",      km: "វិចិត្រសាល" } },
  { key: "sectionCta",         icon: Phone,  name: { en: "Call to Action",     km: "ប្លុកអំពាវនាវ" } },
];

type PanelKey = "sections" | "hero" | "studentlife" | "results" | "gallery" | "cta";

/* ──────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────── */
function AccordionPanel({ panelKey, openPanel, setOpenPanel, icon: Icon, title, children }: {
  panelKey: PanelKey; openPanel: PanelKey | null; setOpenPanel: (p: PanelKey | null) => void;
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  const open = openPanel === panelKey;
  return (
    <div className="stp-accordion">
      <button type="button" onClick={() => setOpenPanel(open ? null : panelKey)}
        className="stp-accordion-trigger" aria-expanded={open}>
        <span className="stp-acc-icon-wrap"><Icon className="stp-acc-icon" /></span>
        <span className="stp-acc-title">{title}</span>
        {open ? <ChevronDown className="stp-acc-chevron" /> : <ChevronRight className="stp-acc-chevron" />}
      </button>
      {open && <div className="stp-accordion-body">{children}</div>}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="stp-field"><label className="stp-label">{label}</label>{children}</div>;
}
function TI({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="stp-input" />;
}
function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="stp-textarea" />;
}
function LangTag({ flag, lang, km }: { flag: string; lang: string; km?: boolean }) {
  return <p className={cn("stp-lang-tag", km && "stp-lang-km")}>{flag} {lang}</p>;
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
      fd.append("file", file); fd.append("folder", "students");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json() as { data?: { url: string } };
      if (!res.ok || !json.data) throw new Error();
      onUploaded(json.data.url);
    } catch { setErr("Upload failed. Try again."); }
    finally { setUploading(false); }
  };

  return (
    <div className="stp-imgup">
      <label className="stp-label">{label}</label>
      <div className="stp-imgup-preview" onClick={() => !uploading && ref.current?.click()}>
        {currentUrl
          ? <Image src={currentUrl} alt={label} fill className="stp-imgup-img" unoptimized />
          : <div className="stp-imgup-empty"><Upload className="stp-imgup-empty-icon" /><span>Upload image</span></div>}
        <div className="stp-imgup-overlay">
          {uploading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : <Upload className="h-5 w-5 text-white" />}
        </div>
      </div>
      {err && <p className="stp-imgup-err"><AlertCircle className="h-3.5 w-3.5" />{err}</p>}
      <input ref={ref} type="file" accept="image/*" className="sr-only" id={`img-${fieldKey}`}
        onChange={e => { const f = e.target.files?.[0]; if (f) void upload(f); }} />
      <p className="stp-imgup-hint">Click image to change · JPEG / PNG / WebP · max 10 MB</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────── */
export function StudentsPageEditor() {
  const locale = useAdminLocale();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("sections");
  const [content, setContent] = useState<StudentsContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Load Content */
  useEffect(() => {
    fetch("/api/students-content")
      .then(r => r.json())
      .then((json: { data?: StudentsContent }) => {
        if (json?.data) setContent(prev => ({ ...prev, ...json.data }));
      })
      .catch(() => setLoadError("Failed to load content. Showing defaults."))
      .finally(() => setLoading(false));
  }, []);

  /* Save Content */
  const handleSave = async () => {
    setSaving(true); setSaveError("");
    try {
      const res = await fetch("/api/students-content", {
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

  const set = useCallback(<K extends keyof StudentsContent>(k: K, v: StudentsContent[K]) => {
    setContent(prev => ({ ...prev, [k]: v }));
    setSaved(false);
  }, []);

  const vw = { desktop: "100%", tablet: "768px", mobile: "390px" };

  return (
    <div className="stp-root">

      {/* ── TOPBAR ── */}
      <div className="stp-topbar">
        <div className="stp-topbar-left">
          <span className="stp-topbar-title">{locale === "km" ? "កែសម្រួលទំព័រសិស្សានុសិស្ស" : "Edit Students Page"}</span>
          <a href="/en/students" target="_blank" rel="noopener noreferrer" className="stp-topbar-link">
            <ExternalLink className="h-3.5 w-3.5" />{locale === "km" ? "មើលទំព័រ" : "View page"}
          </a>
        </div>
        <div className="stp-vp-group" role="group">
          {(["desktop", "tablet", "mobile"] as const).map(vp => {
            const Ic = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[vp];
            return (
              <button key={vp} type="button" onClick={() => setViewport(vp)}
                aria-pressed={viewport === vp} aria-label={vp}
                className={cn("stp-vp-btn", viewport === vp && "stp-vp-btn--on")}>
                <Ic className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div className="stp-topbar-right">
          <button type="button" onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }} className="stp-icon-btn">
            <RefreshCw className="h-4 w-4" />
          </button>
          {saved && <span className="stp-saved-tag"><Check className="h-3.5 w-3.5" />{locale === "km" ? "បានរក្សាទុក" : "Published!"}</span>}
          {saveError && <span className="stp-err-tag"><AlertCircle className="h-3.5 w-3.5" />{saveError}</span>}
          <button type="button" onClick={handleSave} disabled={saving || loading} className="stp-save-btn">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? (locale === "km" ? "កំពុងរក្សា…" : "Saving…") : (locale === "km" ? "រក្សាទុក" : "Publish")}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="stp-body">

        {/* ── LEFT PANEL ── */}
        <aside className="stp-panel">
          {loading && (
            <div className="stp-loading">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              <span>{locale === "km" ? "កំពុងផ្ទុក…" : "Loading…"}</span>
            </div>
          )}
          {loadError && <div className="stp-load-err"><AlertCircle className="h-4 w-4" />{loadError}</div>}

          {!loading && (
            <div className="stp-panel-inner">

              {/* ── 1. SECTIONS ── */}
              <AccordionPanel panelKey="sections" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Layout} title={locale === "km" ? "ផ្នែកទំព័រ" : "Page Sections"}>
                <p className="stp-panel-desc">{locale === "km" ? "បើក/បិទផ្នែកនៅលើទំព័រសិស្សានុសិស្ស" : "Toggle which sections appear on the students page."}</p>
                <div className="stp-sections-list">
                  {sectionMeta.map(s => {
                    const SIcon = s.icon;
                    const enabled = content[s.key] as boolean;
                    return (
                      <div key={s.key} className={cn("stp-section-row", !enabled && "stp-section-row--off")}>
                        <GripVertical className="stp-grip" />
                        <SIcon className="stp-section-icon" />
                        <span className="stp-section-name">{locale === "km" ? s.name.km : s.name.en}</span>
                        <button type="button" role="switch" aria-checked={enabled}
                          onClick={() => set(s.key, !enabled as StudentsContent[typeof s.key])}
                          className={cn("stp-toggle", enabled ? "stp-toggle--on" : "stp-toggle--off")}>
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
                <div className="stp-fields">
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

              {/* ── 3. STUDENT LIFE ── */}
              <AccordionPanel panelKey="studentlife" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Heart} title={locale === "km" ? "ជីវិតសិស្ស" : "Student Life Activities"}>
                <div className="stp-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Section Eyebrow"><TI value={content.studentLifeEyebrowEn} onChange={v => set("studentLifeEyebrowEn", v)} /></F>
                  <F label="Section Title"><TI value={content.studentLifeTitleEn} onChange={v => set("studentLifeTitleEn", v)} /></F>
                  <F label="Section Description"><TA value={content.studentLifeDescEn} onChange={v => set("studentLifeDescEn", v)} /></F>
                  
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ពាក្យលើផ្នែក"><TI value={content.studentLifeEyebrowKm} onChange={v => set("studentLifeEyebrowKm", v)} /></F>
                  <F label="ចំណងជើងផ្នែក"><TI value={content.studentLifeTitleKm} onChange={v => set("studentLifeTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នាផ្នែក"><TA value={content.studentLifeDescKm} onChange={v => set("studentLifeDescKm", v)} /></F>

                  <p className="stp-subheading">Activity Category Cards (6 Items)</p>
                  {([1, 2, 3, 4, 5, 6] as const).map(n => (
                    <div key={n} className="stp-feature-block">
                      <p className="stp-feature-label">Activity Card {n}</p>
                      <LangTag flag="🇺🇸" lang="English" />
                      <F label="Title"><TI value={content[`cat${n}TitleEn`]} onChange={v => set(`cat${n}TitleEn`, v)} /></F>
                      <F label="Description"><TA value={content[`cat${n}DescEn`]} onChange={v => set(`cat${n}DescEn`, v)} rows={2} /></F>
                      <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                      <F label="ចំណងជើង"><TI value={content[`cat${n}TitleKm`]} onChange={v => set(`cat${n}TitleKm`, v)} /></F>
                      <F label="ការពិពណ៌នា"><TA value={content[`cat${n}DescKm`]} onChange={v => set(`cat${n}DescKm`, v)} rows={2} /></F>
                    </div>
                  ))}
                </div>
              </AccordionPanel>

              {/* ── 4. RESULTS HEADING ── */}
              <AccordionPanel panelKey="results" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Trophy} title={locale === "km" ? "លទ្ធផលសិក្សា" : "Student Results Section"}>
                <div className="stp-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Section Title"><TI value={content.resultsTitleEn} onChange={v => set("resultsTitleEn", v)} /></F>
                  <F label="Section Description"><TA value={content.resultsDescEn} onChange={v => set("resultsDescEn", v)} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ចំណងជើងផ្នែក"><TI value={content.resultsTitleKm} onChange={v => set("resultsTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នាផ្នែក"><TA value={content.resultsDescKm} onChange={v => set("resultsDescKm", v)} /></F>
                </div>
              </AccordionPanel>

              {/* ── 5. GALLERY HEADING ── */}
              <AccordionPanel panelKey="gallery" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Camera} title={locale === "km" ? "វិចិត្រសាល" : "Photo Gallery Section"}>
                <div className="stp-fields">
                  <LangTag flag="🇺🇸" lang="English" />
                  <F label="Section Title"><TI value={content.galleryTitleEn} onChange={v => set("galleryTitleEn", v)} /></F>
                  <F label="Section Description"><TA value={content.galleryDescEn} onChange={v => set("galleryDescEn", v)} /></F>
                  <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                  <F label="ចំណងជើងផ្នែក"><TI value={content.galleryTitleKm} onChange={v => set("galleryTitleKm", v)} /></F>
                  <F label="ការពិពណ៌នាផ្នែក"><TA value={content.galleryDescKm} onChange={v => set("galleryDescKm", v)} /></F>
                </div>
              </AccordionPanel>

              {/* ── 6. CTA ── */}
              <AccordionPanel panelKey="cta" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Phone} title={locale === "km" ? "ប្លុកអំពាវនាវ" : "Call to Action"}>
                <div className="stp-fields">
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
        <div className="stp-preview-area">
          <div className="stp-iframe-wrap" style={{ maxWidth: vw[viewport] }}>
            <iframe ref={iframeRef} src="/en/students" title="Students page preview"
              className="stp-iframe" sandbox="allow-same-origin allow-scripts allow-forms" />
            <div className="stp-preview-badge">
              {locale === "km" ? "ការមើលជាមុន" : "Preview"} · {viewport}
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        .stp-root { display:flex; flex-direction:column; height:calc(100vh - 64px); font-family:var(--font-sans,system-ui,sans-serif); background:#f1f5f9; overflow:hidden; }
        .stp-topbar { display:flex; align-items:center; gap:.75rem; padding:0 1rem; height:52px; background:#0f172a; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0; z-index:20; }
        .stp-topbar-left { display:flex; align-items:center; gap:.75rem; flex:1; min-width:0; }
        .stp-topbar-title { font-size:.82rem; font-weight:700; color:#fff; white-space:nowrap; }
        .stp-topbar-link { display:inline-flex; align-items:center; gap:.35rem; font-size:.75rem; font-weight:500; color:rgba(255,255,255,.5); text-decoration:none; transition:color .15s; white-space:nowrap; }
        .stp-topbar-link:hover { color:rgba(255,255,255,.85); }
        .stp-topbar-right { display:flex; align-items:center; gap:.6rem; flex-shrink:0; }
        .stp-vp-group { display:flex; border:1px solid rgba(255,255,255,.12); border-radius:8px; overflow:hidden; }
        .stp-vp-btn { display:flex; align-items:center; justify-content:center; padding:.4rem .65rem; background:transparent; border:none; cursor:pointer; color:rgba(255,255,255,.45); transition:background .15s,color .15s; }
        .stp-vp-btn:hover { color:rgba(255,255,255,.8); }
        .stp-vp-btn--on { background:rgba(255,255,255,.12); color:#fff; }
        .stp-icon-btn { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:7px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); cursor:pointer; color:rgba(255,255,255,.6); transition:background .15s,color .15s; }
        .stp-icon-btn:hover { background:rgba(255,255,255,.14); color:#fff; }
        .stp-saved-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#34d399; white-space:nowrap; }
        .stp-err-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#f87171; white-space:nowrap; }
        .stp-save-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.45rem 1rem; border-radius:8px; border:none; background:#f59e0b; color:#000; font-size:.8rem; font-weight:700; cursor:pointer; transition:opacity .15s,transform .15s; white-space:nowrap; }
        .stp-save-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .stp-save-btn:disabled { opacity:.5; cursor:not-allowed; }
        .stp-body { display:flex; flex:1; overflow:hidden; }
        .stp-panel { width:320px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; overflow-y:auto; display:flex; flex-direction:column; }
        .stp-loading { display:flex; flex-direction:column; align-items:center; gap:.75rem; padding:3rem 1rem; color:#94a3b8; font-size:.82rem; }
        .stp-load-err { display:flex; align-items:center; gap:.5rem; margin:.75rem; padding:.65rem .85rem; border-radius:8px; background:#fef2f2; border:1px solid #fecaca; color:#dc2626; font-size:.76rem; font-weight:500; }
        .stp-panel-inner { padding:.75rem; display:flex; flex-direction:column; gap:.5rem; }
        .stp-panel-desc { font-size:.75rem; color:#64748b; margin:0 0 .75rem; line-height:1.5; }
        .stp-subheading { font-size:.74rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:.05em; margin-top:.75rem; }
        .stp-accordion { border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .stp-accordion-trigger { display:flex; align-items:center; gap:.6rem; width:100%; padding:.7rem .85rem; background:#f8fafc; border:none; cursor:pointer; text-align:left; transition:background .15s; }
        .stp-accordion-trigger:hover { background:#f1f5f9; }
        .stp-acc-icon-wrap { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:7px; background:#0f172a; flex-shrink:0; }
        .stp-acc-icon { width:14px; height:14px; color:#fff; }
        .stp-acc-title { font-size:.82rem; font-weight:700; color:#0f172a; flex:1; }
        .stp-acc-chevron { width:15px; height:15px; color:#94a3b8; flex-shrink:0; }
        .stp-accordion-body { padding:.85rem; border-top:1px solid #e2e8f0; background:#fff; }
        .stp-sections-list { display:flex; flex-direction:column; gap:.35rem; }
        .stp-section-row { display:flex; align-items:center; gap:.55rem; padding:.5rem .6rem; border-radius:8px; border:1.5px solid #e2e8f0; background:#fff; transition:opacity .2s; }
        .stp-section-row--off { opacity:.45; background:#f8fafc; }
        .stp-grip { width:14px; height:14px; color:#cbd5e1; cursor:grab; flex-shrink:0; }
        .stp-section-icon { width:14px; height:14px; color:#64748b; flex-shrink:0; }
        .stp-section-name { flex:1; font-size:.8rem; font-weight:600; color:#334155; }
        .stp-toggle { display:flex; align-items:center; justify-content:center; width:30px; height:22px; border-radius:6px; border:1px solid transparent; cursor:pointer; flex-shrink:0; transition:background .2s; }
        .stp-toggle--on { background:#0f172a; border-color:#0f172a; color:#fff; }
        .stp-toggle--off { background:#f1f5f9; border-color:#e2e8f0; color:#94a3b8; }
        .stp-fields { display:flex; flex-direction:column; gap:.65rem; }
        .stp-lang-tag { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#475569; padding:.4rem 0 .1rem; border-top:1px solid #f1f5f9; margin-top:.3rem; }
        .stp-lang-km { color:#1e3a5f; }
        .stp-field { display:flex; flex-direction:column; gap:.25rem; }
        .stp-label { font-size:.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.06em; }
        .stp-input, .stp-textarea { width:100%; padding:.5rem .7rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:.82rem; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s; box-sizing:border-box; font-family:inherit; resize:vertical; }
        .stp-input:focus, .stp-textarea:focus { border-color:#0f172a; box-shadow:0 0 0 3px rgba(15,23,42,.08); background:#fff; }
        .stp-textarea { min-height:56px; }
        .stp-imgup { display:flex; flex-direction:column; gap:.35rem; }
        .stp-imgup-preview { position:relative; width:100%; height:120px; border:2px dashed #e2e8f0; border-radius:10px; overflow:hidden; cursor:pointer; background:#f8fafc; transition:border-color .15s; }
        .stp-imgup-preview:hover { border-color:#94a3b8; }
        .stp-imgup-img { object-fit:cover; }
        .stp-imgup-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:.4rem; color:#94a3b8; font-size:.78rem; font-weight:500; }
        .stp-imgup-empty-icon { width:22px; height:22px; }
        .stp-imgup-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(15,23,42,.45); opacity:0; transition:opacity .2s; }
        .stp-imgup-preview:hover .stp-imgup-overlay { opacity:1; }
        .stp-imgup-err { display:flex; align-items:center; gap:.3rem; font-size:.72rem; font-weight:500; color:#dc2626; }
        .stp-imgup-hint { font-size:.68rem; color:#94a3b8; margin:0; }
        .stp-feature-block { padding:.65rem; border:1.5px solid #f1f5f9; border-radius:8px; background:#fafbfc; display:flex; flex-direction:column; gap:.5rem; }
        .stp-feature-label { font-size:.72rem; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:.08em; }
        .stp-preview-area { flex:1; overflow:auto; display:flex; align-items:flex-start; justify-content:center; padding:1rem; background:#e2e8f0; }
        .stp-iframe-wrap { position:relative; width:100%; min-height:calc(100vh - 64px); background:#fff; border-radius:12px; overflow:hidden; shadow:0 20px 25px -5px rgba(0,0,0,.1); transition:max-width .3s ease; display:flex; flex-direction:column; }
        .stp-iframe { width:100%; height:100%; flex:1; min-height:calc(100vh - 84px); border:none; }
        .stp-preview-badge { position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,.85); backdrop-filter:blur(8px); color:#fff; font-size:.7rem; font-weight:600; padding:.3rem .65rem; border-radius:20px; pointer-events:none; }
      `}</style>
    </div>
  );
}
