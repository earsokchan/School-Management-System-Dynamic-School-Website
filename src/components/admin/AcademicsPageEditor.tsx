"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Tablet, Smartphone,
  Eye, EyeOff, Check, RefreshCw,
  ExternalLink, ChevronDown, ChevronRight,
  Layout, Type, BookOpen, Phone, Plus, Trash2,
  GripVertical, Save, Upload, Loader2, AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";
import type { AcademicProgram } from "@/data/types";
import { academicPrograms as defaultPrograms } from "@/data/programs";

/* ──────────────────────────────────────────────────────
   TYPE & DEFAULTS
────────────────────────────────────────────────────── */
export interface AcademicsContent {
  id?: string;
  /* Hero */
  heroEyebrowEn: string; heroEyebrowKm: string;
  heroTitleEn: string; heroTitleKm: string;
  heroDescEn: string; heroDescKm: string;
  heroImageUrl: string;
  /* CTA */
  ctaTitleEn: string; ctaTitleKm: string;
  ctaDescEn: string; ctaDescKm: string;
  ctaPrimaryEn: string; ctaPrimaryKm: string;
  ctaSecondaryEn: string; ctaSecondaryKm: string;
  /* Toggles */
  sectionHero: boolean;
  sectionPrograms: boolean;
  sectionCta: boolean;
}

const defaults: AcademicsContent = {
  heroEyebrowEn: "Our Educational Offerings", heroEyebrowKm: "កម្មវិធីសិក្សារបស់យើង",
  heroTitleEn: "Academic Programs", heroTitleKm: "កម្មវិធីសិក្សា",
  heroDescEn: "From Grade 7 through Grade 12, we prepare students for academic success, national examinations, and life beyond secondary school.",
  heroDescKm: "ចាប់ពីថ្នាក់ទី ៧ ដល់ថ្នាក់ទី ១២ យើងរៀបចំសិស្សានុសិស្សសម្រាប់ជោគជ័យក្នុងការសិក្សា ការប្រឡងជាតិ និងជីវិតទៅថ្ងៃអនាគត។",
  heroImageUrl: "/images/academics/grade-12.svg",

  ctaTitleEn: "Ready to Enroll in Our Programs?", ctaTitleKm: "រួចរាល់ដើម្បីចុះឈ្មោះចូលរៀន?",
  ctaDescEn: "Learn how to register for the upcoming academic year. Contact our school administration office today.", ctaDescKm: "ស្វែងយល់ពីរបៀបចុះឈ្មោះសម្រាប់ឆ្នាំសិក្សាថ្មី។ ទាក់ទងការិយាល័យរដ្ឋបាលសាលាយើងឥឡូវនេះ។",
  ctaPrimaryEn: "Contact Office", ctaPrimaryKm: "ទាក់ទងការិយាល័យ",
  ctaSecondaryEn: "School Location", ctaSecondaryKm: "ទីតាំងសាលា",

  sectionHero: true,
  sectionPrograms: true,
  sectionCta: true,
};

const sectionMeta: { key: keyof AcademicsContent; icon: React.ElementType; name: { en: string; km: string } }[] = [
  { key: "sectionHero",     icon: Type,     name: { en: "Hero Banner",        km: "បដាខាងលើ" } },
  { key: "sectionPrograms", icon: BookOpen, name: { en: "Academic Programs",  km: "កម្មវិធីសិក្សា" } },
  { key: "sectionCta",      icon: Phone,    name: { en: "Call to Action",     km: "ប្លុកអំពាវនាវ" } },
];

type PanelKey = "sections" | "hero" | "programs" | "cta";

/* ──────────────────────────────────────────────────────
   UI HELPERS
────────────────────────────────────────────────────── */
function AccordionPanel({ panelKey, openPanel, setOpenPanel, icon: Icon, title, children }: {
  panelKey: PanelKey; openPanel: PanelKey | null; setOpenPanel: (p: PanelKey | null) => void;
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  const open = openPanel === panelKey;
  return (
    <div className="acp-accordion">
      <button type="button" onClick={() => setOpenPanel(open ? null : panelKey)}
        className="acp-accordion-trigger" aria-expanded={open}>
        <span className="acp-acc-icon-wrap"><Icon className="acp-acc-icon" /></span>
        <span className="acp-acc-title">{title}</span>
        {open ? <ChevronDown className="acp-acc-chevron" /> : <ChevronRight className="acp-acc-chevron" />}
      </button>
      {open && <div className="acp-accordion-body">{children}</div>}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="acp-field"><label className="acp-label">{label}</label>{children}</div>;
}
function TI({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="acp-input" />;
}
function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="acp-textarea" />;
}
function LangTag({ flag, lang, km }: { flag: string; lang: string; km?: boolean }) {
  return <p className={cn("acp-lang-tag", km && "acp-lang-km")}>{flag} {lang}</p>;
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
      fd.append("file", file); fd.append("folder", "academics");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json() as { data?: { url: string } };
      if (!res.ok || !json.data) throw new Error();
      onUploaded(json.data.url);
    } catch { setErr("Upload failed. Try again."); }
    finally { setUploading(false); }
  };

  return (
    <div className="acp-imgup">
      <label className="acp-label">{label}</label>
      <div className="acp-imgup-preview" onClick={() => !uploading && ref.current?.click()}>
        {currentUrl
          ? <Image src={currentUrl} alt={label} fill className="acp-imgup-img" unoptimized />
          : <div className="acp-imgup-empty"><Upload className="acp-imgup-empty-icon" /><span>Upload image</span></div>}
        <div className="acp-imgup-overlay">
          {uploading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : <Upload className="h-5 w-5 text-white" />}
        </div>
      </div>
      {err && <p className="acp-imgup-err"><AlertCircle className="h-3.5 w-3.5" />{err}</p>}
      <input ref={ref} type="file" accept="image/*" className="sr-only" id={`img-${fieldKey}`}
        onChange={e => { const f = e.target.files?.[0]; if (f) void upload(f); }} />
      <p className="acp-imgup-hint">Click image to change · JPEG / PNG / WebP · max 10 MB</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────── */
export function AcademicsPageEditor() {
  const locale = useAdminLocale();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("sections");
  const [content, setContent] = useState<AcademicsContent>(defaults);
  const [programs, setPrograms] = useState<AcademicProgram[]>(defaultPrograms);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Load Page Settings & Programs List */
  useEffect(() => {
    Promise.all([
      fetch("/api/academics-content").then(r => r.json()),
      fetch("/api/content/academic-programs").then(r => r.json()),
    ])
      .then(([pageRes, progsRes]: [{ data?: AcademicsContent }, { data?: AcademicProgram[] }]) => {
        if (pageRes?.data) setContent(prev => ({ ...prev, ...pageRes.data }));
        if (progsRes?.data && Array.isArray(progsRes.data) && progsRes.data.length > 0) {
          setPrograms(progsRes.data);
        }
      })
      .catch(() => setLoadError("Failed to load content. Showing defaults."))
      .finally(() => setLoading(false));
  }, []);

  /* Save Page Content & Programs */
  const handleSave = async () => {
    setSaving(true); setSaveError("");
    try {
      /* Save page content settings */
      const pageRes = await fetch("/api/academics-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!pageRes.ok) throw new Error("Failed to save page settings");

      /* Save each academic program document */
      for (const prog of programs) {
        if (prog.id) {
          await fetch(`/api/content/academic-programs/${prog.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prog),
          });
        } else {
          await fetch(`/api/content/academic-programs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prog),
          });
        }
      }

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

  const set = useCallback(<K extends keyof AcademicsContent>(k: K, v: AcademicsContent[K]) => {
    setContent(prev => ({ ...prev, [k]: v }));
    setSaved(false);
  }, []);

  const updateProgram = (index: number, updated: AcademicProgram) => {
    setPrograms(prev => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
    setSaved(false);
  };

  const addProgram = () => {
    const newProg: AcademicProgram = {
      id: `grade-${programs.length + 7}`,
      grade: { en: `Grade ${programs.length + 7}`, km: `ថ្នាក់ទី ${programs.length + 7}` },
      title: { en: "New Academic Program", km: "កម្មវិធីសិក្សាថ្មី" },
      description: { en: "Program description here...", km: "ការពិពណ៌នាកម្មវិធីសិក្សា..." },
      image: "/images/academics/grade-12.svg",
      subjects: [
        { en: "Khmer Language", km: "ភាសាខ្មែរ" },
        { en: "Mathematics", km: "គណិតវិទ្យា" },
        { en: "English", km: "ភាសាអង់គ្លេស" },
      ],
    };
    setPrograms(prev => [...prev, newProg]);
    setSaved(false);
  };

  const deleteProgram = async (index: number) => {
    const prog = programs[index];
    if (prog?.id) {
      try {
        await fetch(`/api/content/academic-programs/${prog.id}`, { method: "DELETE" });
      } catch { /* ignore */ }
    }
    setPrograms(prev => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const vw = { desktop: "100%", tablet: "768px", mobile: "390px" };

  return (
    <div className="acp-root">

      {/* ── TOPBAR ── */}
      <div className="acp-topbar">
        <div className="acp-topbar-left">
          <span className="acp-topbar-title">{locale === "km" ? "កែសម្រួលទំព័រកម្មវិធីសិក្សា" : "Edit Academics Page"}</span>
          <a href="/en/academics" target="_blank" rel="noopener noreferrer" className="acp-topbar-link">
            <ExternalLink className="h-3.5 w-3.5" />{locale === "km" ? "មើលទំព័រ" : "View page"}
          </a>
        </div>
        <div className="acp-vp-group" role="group">
          {(["desktop", "tablet", "mobile"] as const).map(vp => {
            const Ic = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[vp];
            return (
              <button key={vp} type="button" onClick={() => setViewport(vp)}
                aria-pressed={viewport === vp} aria-label={vp}
                className={cn("acp-vp-btn", viewport === vp && "acp-vp-btn--on")}>
                <Ic className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div className="acp-topbar-right">
          <button type="button" onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }} className="acp-icon-btn">
            <RefreshCw className="h-4 w-4" />
          </button>
          {saved && <span className="acp-saved-tag"><Check className="h-3.5 w-3.5" />{locale === "km" ? "បានរក្សាទុក" : "Published!"}</span>}
          {saveError && <span className="acp-err-tag"><AlertCircle className="h-3.5 w-3.5" />{saveError}</span>}
          <button type="button" onClick={handleSave} disabled={saving || loading} className="acp-save-btn">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? (locale === "km" ? "កំពុងរក្សា…" : "Saving…") : (locale === "km" ? "រក្សាទុក" : "Publish")}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="acp-body">

        {/* ── LEFT PANEL ── */}
        <aside className="acp-panel">
          {loading && (
            <div className="acp-loading">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              <span>{locale === "km" ? "កំពុងផ្ទុក…" : "Loading…"}</span>
            </div>
          )}
          {loadError && <div className="acp-load-err"><AlertCircle className="h-4 w-4" />{loadError}</div>}

          {!loading && (
            <div className="acp-panel-inner">

              {/* ── 1. SECTIONS ── */}
              <AccordionPanel panelKey="sections" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Layout} title={locale === "km" ? "ផ្នែកទំព័រ" : "Page Sections"}>
                <p className="acp-panel-desc">{locale === "km" ? "បើក/បិទផ្នែកនៅលើទំព័រកម្មវិធីសិក្សា" : "Toggle which sections appear on the academics page."}</p>
                <div className="acp-sections-list">
                  {sectionMeta.map(s => {
                    const SIcon = s.icon;
                    const enabled = content[s.key] as boolean;
                    return (
                      <div key={s.key} className={cn("acp-section-row", !enabled && "acp-section-row--off")}>
                        <GripVertical className="acp-grip" />
                        <SIcon className="acp-section-icon" />
                        <span className="acp-section-name">{locale === "km" ? s.name.km : s.name.en}</span>
                        <button type="button" role="switch" aria-checked={enabled}
                          onClick={() => set(s.key, !enabled as AcademicsContent[typeof s.key])}
                          className={cn("acp-toggle", enabled ? "acp-toggle--on" : "acp-toggle--off")}>
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
                <div className="acp-fields">
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

              {/* ── 3. ACADEMIC PROGRAMS ── */}
              <AccordionPanel panelKey="programs" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={BookOpen} title={locale === "km" ? "កម្មវិធីសិក្សា" : "Academic Programs"}>
                <div className="acp-fields">
                  <p className="acp-panel-desc">{locale === "km" ? "កែសម្រួលកម្មវិធីសិក្សាតាមថ្នាក់ ឬបន្ថែមកម្មវិធីថ្មី" : "Edit individual grade programs, subjects and images."}</p>
                  
                  {programs.map((prog, idx) => (
                    <div key={prog.id || idx} className="acp-program-card">
                      <div className="acp-prog-header">
                        <span className="acp-prog-badge">{prog.grade?.en || `Program ${idx + 1}`}</span>
                        <button type="button" onClick={() => void deleteProgram(idx)} className="acp-del-btn" title="Delete program">
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </button>
                      </div>

                      <ImgUp label="Program Image" currentUrl={prog.image} fieldKey={`prog-${idx}`}
                        onUploaded={url => updateProgram(idx, { ...prog, image: url })} />

                      <LangTag flag="🇺🇸" lang="English" />
                      <F label="Grade Badge"><TI value={prog.grade?.en || ""} onChange={v => updateProgram(idx, { ...prog, grade: { ...prog.grade, en: v } })} /></F>
                      <F label="Title"><TI value={prog.title?.en || ""} onChange={v => updateProgram(idx, { ...prog, title: { ...prog.title, en: v } })} /></F>
                      <F label="Description"><TA value={prog.description?.en || ""} onChange={v => updateProgram(idx, { ...prog, description: { ...prog.description, en: v } })} rows={3} /></F>

                      <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                      <F label="ស្លាកថ្នាក់"><TI value={prog.grade?.km || ""} onChange={v => updateProgram(idx, { ...prog, grade: { ...prog.grade, km: v } })} /></F>
                      <F label="ចំណងជើង"><TI value={prog.title?.km || ""} onChange={v => updateProgram(idx, { ...prog, title: { ...prog.title, km: v } })} /></F>
                      <F label="ការពិពណ៌នា"><TA value={prog.description?.km || ""} onChange={v => updateProgram(idx, { ...prog, description: { ...prog.description, km: v } })} rows={3} /></F>
                    </div>
                  ))}

                  <button type="button" onClick={addProgram} className="acp-add-btn">
                    <Plus className="h-4 w-4" /> {locale === "km" ? "បន្ថែមកម្មវិធីសិក្សា" : "Add Academic Program"}
                  </button>
                </div>
              </AccordionPanel>

              {/* ── 4. CTA ── */}
              <AccordionPanel panelKey="cta" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Phone} title={locale === "km" ? "ប្លុកអំពាវនាវ" : "Call to Action"}>
                <div className="acp-fields">
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
        <div className="acp-preview-area">
          <div className="acp-iframe-wrap" style={{ maxWidth: vw[viewport] }}>
            <iframe ref={iframeRef} src="/en/academics" title="Academics page preview"
              className="acp-iframe" sandbox="allow-same-origin allow-scripts allow-forms" />
            <div className="acp-preview-badge">
              {locale === "km" ? "ការមើលជាមុន" : "Preview"} · {viewport}
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        .acp-root { display:flex; flex-direction:column; height:calc(100vh - 64px); font-family:var(--font-sans,system-ui,sans-serif); background:#f1f5f9; overflow:hidden; }
        .acp-topbar { display:flex; align-items:center; gap:.75rem; padding:0 1rem; height:52px; background:#0f172a; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0; z-index:20; }
        .acp-topbar-left { display:flex; align-items:center; gap:.75rem; flex:1; min-width:0; }
        .acp-topbar-title { font-size:.82rem; font-weight:700; color:#fff; white-space:nowrap; }
        .acp-topbar-link { display:inline-flex; align-items:center; gap:.35rem; font-size:.75rem; font-weight:500; color:rgba(255,255,255,.5); text-decoration:none; transition:color .15s; white-space:nowrap; }
        .acp-topbar-link:hover { color:rgba(255,255,255,.85); }
        .acp-topbar-right { display:flex; align-items:center; gap:.6rem; flex-shrink:0; }
        .acp-vp-group { display:flex; border:1px solid rgba(255,255,255,.12); border-radius:8px; overflow:hidden; }
        .acp-vp-btn { display:flex; align-items:center; justify-content:center; padding:.4rem .65rem; background:transparent; border:none; cursor:pointer; color:rgba(255,255,255,.45); transition:background .15s,color .15s; }
        .acp-vp-btn:hover { color:rgba(255,255,255,.8); }
        .acp-vp-btn--on { background:rgba(255,255,255,.12); color:#fff; }
        .acp-icon-btn { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:7px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); cursor:pointer; color:rgba(255,255,255,.6); transition:background .15s,color .15s; }
        .acp-icon-btn:hover { background:rgba(255,255,255,.14); color:#fff; }
        .acp-saved-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#34d399; white-space:nowrap; }
        .acp-err-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#f87171; white-space:nowrap; }
        .acp-save-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.45rem 1rem; border-radius:8px; border:none; background:#f59e0b; color:#000; font-size:.8rem; font-weight:700; cursor:pointer; transition:opacity .15s,transform .15s; white-space:nowrap; }
        .acp-save-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .acp-save-btn:disabled { opacity:.5; cursor:not-allowed; }
        .acp-body { display:flex; flex:1; overflow:hidden; }
        .acp-panel { width:320px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; overflow-y:auto; display:flex; flex-direction:column; }
        .acp-loading { display:flex; flex-direction:column; align-items:center; gap:.75rem; padding:3rem 1rem; color:#94a3b8; font-size:.82rem; }
        .acp-load-err { display:flex; align-items:center; gap:.5rem; margin:.75rem; padding:.65rem .85rem; border-radius:8px; background:#fef2f2; border:1px solid #fecaca; color:#dc2626; font-size:.76rem; font-weight:500; }
        .acp-panel-inner { padding:.75rem; display:flex; flex-direction:column; gap:.5rem; }
        .acp-panel-desc { font-size:.75rem; color:#64748b; margin:0 0 .75rem; line-height:1.5; }
        .acp-accordion { border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .acp-accordion-trigger { display:flex; align-items:center; gap:.6rem; width:100%; padding:.7rem .85rem; background:#f8fafc; border:none; cursor:pointer; text-align:left; transition:background .15s; }
        .acp-accordion-trigger:hover { background:#f1f5f9; }
        .acp-acc-icon-wrap { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:7px; background:#0f172a; flex-shrink:0; }
        .acp-acc-icon { width:14px; height:14px; color:#fff; }
        .acp-acc-title { font-size:.82rem; font-weight:700; color:#0f172a; flex:1; }
        .acp-acc-chevron { width:15px; height:15px; color:#94a3b8; flex-shrink:0; }
        .acp-accordion-body { padding:.85rem; border-top:1px solid #e2e8f0; background:#fff; }
        .acp-sections-list { display:flex; flex-direction:column; gap:.35rem; }
        .acp-section-row { display:flex; align-items:center; gap:.55rem; padding:.5rem .6rem; border-radius:8px; border:1.5px solid #e2e8f0; background:#fff; transition:opacity .2s; }
        .acp-section-row--off { opacity:.45; background:#f8fafc; }
        .acp-grip { width:14px; height:14px; color:#cbd5e1; cursor:grab; flex-shrink:0; }
        .acp-section-icon { width:14px; height:14px; color:#64748b; flex-shrink:0; }
        .acp-section-name { flex:1; font-size:.8rem; font-weight:600; color:#334155; }
        .acp-toggle { display:flex; align-items:center; justify-content:center; width:30px; height:22px; border-radius:6px; border:1px solid transparent; cursor:pointer; flex-shrink:0; transition:background .2s; }
        .acp-toggle--on { background:#0f172a; border-color:#0f172a; color:#fff; }
        .acp-toggle--off { background:#f1f5f9; border-color:#e2e8f0; color:#94a3b8; }
        .acp-fields { display:flex; flex-direction:column; gap:.65rem; }
        .acp-lang-tag { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#475569; padding:.4rem 0 .1rem; border-top:1px solid #f1f5f9; margin-top:.3rem; }
        .acp-lang-km { color:#1e3a5f; }
        .acp-field { display:flex; flex-direction:column; gap:.25rem; }
        .acp-label { font-size:.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.06em; }
        .acp-input, .acp-textarea { width:100%; padding:.5rem .7rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:.82rem; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s; box-sizing:border-box; font-family:inherit; resize:vertical; }
        .acp-input:focus, .acp-textarea:focus { border-color:#0f172a; box-shadow:0 0 0 3px rgba(15,23,42,.08); background:#fff; }
        .acp-textarea { min-height:56px; }
        .acp-imgup { display:flex; flex-direction:column; gap:.35rem; }
        .acp-imgup-preview { position:relative; width:100%; height:120px; border:2px dashed #e2e8f0; border-radius:10px; overflow:hidden; cursor:pointer; background:#f8fafc; transition:border-color .15s; }
        .acp-imgup-preview:hover { border-color:#94a3b8; }
        .acp-imgup-img { object-fit:cover; }
        .acp-imgup-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:.4rem; color:#94a3b8; font-size:.78rem; font-weight:500; }
        .acp-imgup-empty-icon { width:22px; height:22px; }
        .acp-imgup-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(15,23,42,.45); opacity:0; transition:opacity .2s; }
        .acp-imgup-preview:hover .acp-imgup-overlay { opacity:1; }
        .acp-imgup-err { display:flex; align-items:center; gap:.3rem; font-size:.72rem; font-weight:500; color:#dc2626; }
        .acp-imgup-hint { font-size:.68rem; color:#94a3b8; margin:0; }
        .acp-program-card { padding:.75rem; border:1.5px solid #e2e8f0; border-radius:10px; background:#fafbfc; display:flex; flex-direction:column; gap:.5rem; }
        .acp-prog-header { display:flex; align-items:center; justify-space-between:space-between; }
        .acp-prog-badge { font-size:.7rem; font-weight:800; color:#0f172a; text-transform:uppercase; background:#e2e8f0; padding:.2rem .5rem; border-radius:6px; }
        .acp-del-btn { padding:.3rem; border:none; background:transparent; cursor:pointer; border-radius:6px; transition:background .15s; margin-left:auto; }
        .acp-del-btn:hover { background:#fee2e2; }
        .acp-add-btn { display:flex; align-items:center; justify-content:center; gap:.4rem; width:100%; padding:.6rem; border:2px dashed #cbd5e1; border-radius:8px; background:#fff; font-size:.78rem; font-weight:700; color:#0f172a; cursor:pointer; transition:border-color .15s,background .15s; }
        .acp-add-btn:hover { border-color:#0f172a; background:#f8fafc; }
        .acp-preview-area { flex:1; overflow:auto; display:flex; align-items:flex-start; justify-content:center; padding:1rem; background:#e2e8f0; }
        .acp-iframe-wrap { position:relative; width:100%; min-height:calc(100vh - 64px); background:#fff; border-radius:12px; overflow:hidden; shadow:0 20px 25px -5px rgba(0,0,0,.1); transition:max-width .3s ease; display:flex; flex-direction:column; }
        .acp-iframe { width:100%; height:100%; flex:1; min-height:calc(100vh - 84px); border:none; }
        .acp-preview-badge { position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,.85); backdrop-filter:blur(8px); color:#fff; font-size:.7rem; font-weight:600; padding:.3rem .65rem; border-radius:20px; pointer-events:none; }
      `}</style>
    </div>
  );
}
