"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Tablet, Smartphone,
  Eye, EyeOff, Check, RefreshCw,
  ExternalLink, ChevronDown, ChevronRight,
  Layout, Type, Users, Phone,
  GripVertical, Save, Upload, Loader2, AlertCircle,
  Plus, Trash2, Edit3, UserCheck,
} from "lucide-react";
import Image from "next/image";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";
import type { Teacher } from "@/data/types";

/* ──────────────────────────────────────────────────────
   TYPE & DEFAULTS
────────────────────────────────────────────────────── */
export interface TeachersContent {
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
  sectionTeachers: boolean;
  sectionCta: boolean;
}

const defaults: TeachersContent = {
  heroEyebrowEn: "Our Educators", heroEyebrowKm: "លោកគ្រូ អ្នកគ្រូ",
  heroTitleEn: "Teaching Staff & Faculty", heroTitleKm: "គណៈគ្រូបង្រៀន និងបុគ្គលិកអប់រំ",
  heroDescEn: "Meet the dedicated teachers and mentors who inspire academic excellence and guide our students every day.",
  heroDescKm: "ជួបជាមួយលោកគ្រូអ្នកគ្រូដែលមានបេះដូងអប់រំ និងការប្តេជ្ញាចិត្តខ្ពស់ក្នុងការបណ្តុះបណ្តាលសិស្សានុសិស្ស។",
  heroImageUrl: "/images/teachers/teacher-1.svg",

  ctaTitleEn: "Interested in Joining Our Faculty?", ctaTitleKm: "ចាប់អារម្មណ៍ចូលរួមជាមួយក្រុមការងារអប់រំយើង?",
  ctaDescEn: "We welcome qualified and passion-driven educators to join Hun Sen Kompong Tralach High School.",
  ctaDescKm: "យើងស្វាគមន៍លោកគ្រូអ្នកគ្រូដែលមានសមត្ថភាព និងឆន្ទៈខ្ពស់ មកចូលរួមជាមួយវិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច។",
  ctaPrimaryEn: "Apply Now", ctaPrimaryKm: "ដាក់ពាក្យឥឡូវនេះ",
  ctaSecondaryEn: "Contact Office", ctaSecondaryKm: "ទាក់ទងការិយាល័យ",

  sectionHero: true,
  sectionTeachers: true,
  sectionCta: true,
};

const sectionMeta: { key: keyof TeachersContent; icon: React.ElementType; name: { en: string; km: string } }[] = [
  { key: "sectionHero",     icon: Type,  name: { en: "Hero Banner",    km: "បដាខាងលើ" } },
  { key: "sectionTeachers", icon: Users, name: { en: "Teachers List",  km: "បញ្ជីលោកគ្រូអ្នកគ្រូ" } },
  { key: "sectionCta",      icon: Phone, name: { en: "Call to Action", km: "ប្លុកអំពាវនាវ" } },
];

type PanelKey = "sections" | "hero" | "teachers" | "cta";

/* ──────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────── */
function AccordionPanel({ panelKey, openPanel, setOpenPanel, icon: Icon, title, children }: {
  panelKey: PanelKey; openPanel: PanelKey | null; setOpenPanel: (p: PanelKey | null) => void;
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  const open = openPanel === panelKey;
  return (
    <div className="tcp-accordion">
      <button type="button" onClick={() => setOpenPanel(open ? null : panelKey)}
        className="tcp-accordion-trigger" aria-expanded={open}>
        <span className="tcp-acc-icon-wrap"><Icon className="tcp-acc-icon" /></span>
        <span className="tcp-acc-title">{title}</span>
        {open ? <ChevronDown className="tcp-acc-chevron" /> : <ChevronRight className="tcp-acc-chevron" />}
      </button>
      {open && <div className="tcp-accordion-body">{children}</div>}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="tcp-field"><label className="tcp-label">{label}</label>{children}</div>;
}
function TI({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="tcp-input" />;
}
function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="tcp-textarea" />;
}
function LangTag({ flag, lang, km }: { flag: string; lang: string; km?: boolean }) {
  return <p className={cn("tcp-lang-tag", km && "tcp-lang-km")}>{flag} {lang}</p>;
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
      fd.append("file", file); fd.append("folder", "teachers");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json() as { data?: { url: string } };
      if (!res.ok || !json.data) throw new Error();
      onUploaded(json.data.url);
    } catch { setErr("Upload failed. Try again."); }
    finally { setUploading(false); }
  };

  return (
    <div className="tcp-imgup">
      <label className="tcp-label">{label}</label>
      <div className="tcp-imgup-preview" onClick={() => !uploading && ref.current?.click()}>
        {currentUrl
          ? <Image src={currentUrl} alt={label} fill className="tcp-imgup-img" unoptimized />
          : <div className="tcp-imgup-empty"><Upload className="tcp-imgup-empty-icon" /><span>Upload image</span></div>}
        <div className="tcp-imgup-overlay">
          {uploading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : <Upload className="h-5 w-5 text-white" />}
        </div>
      </div>
      {err && <p className="tcp-imgup-err"><AlertCircle className="h-3.5 w-3.5" />{err}</p>}
      <input ref={ref} type="file" accept="image/*" className="sr-only" id={`img-${fieldKey}`}
        onChange={e => { const f = e.target.files?.[0]; if (f) void upload(f); }} />
      <p className="tcp-imgup-hint">Click image to change · JPEG / PNG / WebP · max 10 MB</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────── */
export function TeachersPageEditor() {
  const locale = useAdminLocale();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("sections");
  const [content, setContent] = useState<TeachersContent>(defaults);
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Load Page Content & Teachers Collection */
  useEffect(() => {
    Promise.all([
      fetch("/api/teachers-content").then(r => r.json()),
      fetch("/api/collections/public-teachers").then(r => r.json())
    ]).then(([contentRes, teachersRes]) => {
      if (contentRes?.data) setContent(prev => ({ ...prev, ...contentRes.data }));
      if (teachersRes?.data && Array.isArray(teachersRes.data)) {
        setTeachersList(teachersRes.data);
      }
    })
    .catch(() => setLoadError("Failed to load content. Showing defaults."))
    .finally(() => setLoading(false));
  }, []);

  /* Save Content & Teachers */
  const handleSave = async () => {
    setSaving(true); setSaveError("");
    try {
      // 1. Save page level config
      const res = await fetch("/api/teachers-content", {
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

  const set = useCallback(<K extends keyof TeachersContent>(k: K, v: TeachersContent[K]) => {
    setContent(prev => ({ ...prev, [k]: v }));
    setSaved(false);
  }, []);

  /* Teacher Item Handlers */
  const handleAddTeacher = async () => {
    const newId = `teacher-${Date.now()}`;
    const newTeacher: Teacher = {
      id: newId,
      name: { en: "New Teacher", km: "លោកគ្រូ/អ្នកគ្រូ ថ្មី" },
      subject: { en: "Subject Teacher", km: "គ្រូបង្រៀនមុខវិជ្ជា" },
      position: { en: "Grade 7 — Class A", km: "ថ្នាក់ទី ៧ A" },
      photo: "/images/teachers/teacher-1.svg",
    };
    try {
      const res = await fetch("/api/collections/public-teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });
      if (res.ok) {
        setTeachersList(prev => [...prev, newTeacher]);
        setEditingTeacherId(newId);
        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
      }
    } catch {
      /* ignore */
    }
  };

  const handleUpdateTeacher = async (id: string, updated: Teacher) => {
    setTeachersList(prev => prev.map(t => (t.id === id ? updated : t)));
    try {
      await fetch(`/api/collections/public-teachers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
    } catch {
      /* ignore */
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    setTeachersList(prev => prev.filter(t => t.id !== id));
    if (editingTeacherId === id) setEditingTeacherId(null);
    try {
      await fetch(`/api/collections/public-teachers/${id}`, { method: "DELETE" });
      if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
    } catch {
      /* ignore */
    }
  };

  const vw = { desktop: "100%", tablet: "768px", mobile: "390px" };

  return (
    <div className="tcp-root">

      {/* ── TOPBAR ── */}
      <div className="tcp-topbar">
        <div className="tcp-topbar-left">
          <span className="tcp-topbar-title">{locale === "km" ? "កែសម្រួលទំព័រលោកគ្រូអ្នកគ្រូ" : "Edit Teachers Page"}</span>
          <a href="/en/teachers" target="_blank" rel="noopener noreferrer" className="tcp-topbar-link">
            <ExternalLink className="h-3.5 w-3.5" />{locale === "km" ? "មើលទំព័រ" : "View page"}
          </a>
        </div>
        <div className="tcp-vp-group" role="group">
          {(["desktop", "tablet", "mobile"] as const).map(vp => {
            const Ic = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[vp];
            return (
              <button key={vp} type="button" onClick={() => setViewport(vp)}
                aria-pressed={viewport === vp} aria-label={vp}
                className={cn("tcp-vp-btn", viewport === vp && "tcp-vp-btn--on")}>
                <Ic className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div className="tcp-topbar-right">
          <button type="button" onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }} className="tcp-icon-btn">
            <RefreshCw className="h-4 w-4" />
          </button>
          {saved && <span className="tcp-saved-tag"><Check className="h-3.5 w-3.5" />{locale === "km" ? "បានរក្សាទុក" : "Published!"}</span>}
          {saveError && <span className="tcp-err-tag"><AlertCircle className="h-3.5 w-3.5" />{saveError}</span>}
          <button type="button" onClick={handleSave} disabled={saving || loading} className="tcp-save-btn">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? (locale === "km" ? "កំពុងរក្សា…" : "Saving…") : (locale === "km" ? "រក្សាទុក" : "Publish")}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="tcp-body">

        {/* ── LEFT PANEL ── */}
        <aside className="tcp-panel">
          {loading && (
            <div className="tcp-loading">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              <span>{locale === "km" ? "កំពុងផ្ទុក…" : "Loading…"}</span>
            </div>
          )}
          {loadError && <div className="tcp-load-err"><AlertCircle className="h-4 w-4" />{loadError}</div>}

          {!loading && (
            <div className="tcp-panel-inner">

              {/* ── 1. SECTIONS ── */}
              <AccordionPanel panelKey="sections" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Layout} title={locale === "km" ? "ផ្នែកទំព័រ" : "Page Sections"}>
                <p className="tcp-panel-desc">{locale === "km" ? "បើក/បិទផ្នែកនៅលើទំព័រលោកគ្រូអ្នកគ្រូ" : "Toggle which sections appear on the teachers page."}</p>
                <div className="tcp-sections-list">
                  {sectionMeta.map(s => {
                    const SIcon = s.icon;
                    const enabled = content[s.key] as boolean;
                    return (
                      <div key={s.key} className={cn("tcp-section-row", !enabled && "tcp-section-row--off")}>
                        <GripVertical className="tcp-grip" />
                        <SIcon className="tcp-section-icon" />
                        <span className="tcp-section-name">{locale === "km" ? s.name.km : s.name.en}</span>
                        <button type="button" role="switch" aria-checked={enabled}
                          onClick={() => set(s.key, !enabled as TeachersContent[typeof s.key])}
                          className={cn("tcp-toggle", enabled ? "tcp-toggle--on" : "tcp-toggle--off")}>
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
                <div className="tcp-fields">
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

              {/* ── 3. TEACHERS LIST (CRUD) ── */}
              <AccordionPanel panelKey="teachers" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Users} title={locale === "km" ? `បញ្ជីលោកគ្រូអ្នកគ្រូ (${teachersList.length})` : `Teachers Staff (${teachersList.length})`}>
                <div className="tcp-fields">
                  <div className="tcp-add-header">
                    <p className="tcp-panel-desc m-0">{locale === "km" ? "បន្ថែម ឬកែប្រែព័ត៌មានលោកគ្រូអ្នកគ្រូ" : "Manage and edit teaching staff members."}</p>
                    <button type="button" onClick={handleAddTeacher} className="tcp-add-btn">
                      <Plus className="h-3.5 w-3.5" />{locale === "km" ? "បន្ថែមថ្មី" : "Add Teacher"}
                    </button>
                  </div>

                  <div className="tcp-teachers-list">
                    {teachersList.map((tItem) => {
                      const isEditing = editingTeacherId === tItem.id;
                      return (
                        <div key={tItem.id} className="tcp-teacher-card">
                          <div className="tcp-teacher-card-head" onClick={() => setEditingTeacherId(isEditing ? null : tItem.id)}>
                            <div className="tcp-teacher-avatar">
                              <Image src={tItem.photo} alt={tItem.name.en} fill className="object-cover" unoptimized />
                            </div>
                            <div className="tcp-teacher-info">
                              <p className="tcp-teacher-name">{locale === "km" ? tItem.name.km : tItem.name.en}</p>
                              <p className="tcp-teacher-sub">{locale === "km" ? tItem.position.km : tItem.position.en}</p>
                            </div>
                            <button type="button" className="tcp-icon-btn-sm" onClick={e => { e.stopPropagation(); setEditingTeacherId(isEditing ? null : tItem.id); }}>
                              <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                            </button>
                            <button type="button" className="tcp-icon-btn-sm" onClick={e => { e.stopPropagation(); void handleDeleteTeacher(tItem.id); }}>
                              <Trash2 className="h-3.5 w-3.5 text-red-500" />
                            </button>
                          </div>

                          {isEditing && (
                            <div className="tcp-teacher-card-body">
                              <ImgUp label={locale === "km" ? "រូបថតលោកគ្រូ/អ្នកគ្រូ" : "Teacher Photo"}
                                currentUrl={tItem.photo} fieldKey={`photo-${tItem.id}`}
                                onUploaded={url => handleUpdateTeacher(tItem.id, { ...tItem, photo: url })} />
                              
                              <LangTag flag="🇺🇸" lang="English" />
                              <F label="Name (EN)"><TI value={tItem.name.en} onChange={v => handleUpdateTeacher(tItem.id, { ...tItem, name: { ...tItem.name, en: v } })} /></F>
                              <F label="Role / Subject (EN)"><TI value={tItem.subject.en} onChange={v => handleUpdateTeacher(tItem.id, { ...tItem, subject: { ...tItem.subject, en: v } })} /></F>
                              <F label="Position / Class (EN)"><TI value={tItem.position.en} onChange={v => handleUpdateTeacher(tItem.id, { ...tItem, position: { ...tItem.position, en: v } })} /></F>

                              <LangTag flag="🇰🇭" lang="ភាសាខ្មែរ" km />
                              <F label="ឈ្មោះ (ខ្មែរ)"><TI value={tItem.name.km} onChange={v => handleUpdateTeacher(tItem.id, { ...tItem, name: { ...tItem.name, km: v } })} /></F>
                              <F label="មុខវិជ្ជា/ភារកិច្ច (ខ្មែរ)"><TI value={tItem.subject.km} onChange={v => handleUpdateTeacher(tItem.id, { ...tItem, subject: { ...tItem.subject, km: v } })} /></F>
                              <F label="ថ្នាក់បន្ទុក (ខ្មែរ)"><TI value={tItem.position.km} onChange={v => handleUpdateTeacher(tItem.id, { ...tItem, position: { ...tItem.position, km: v } })} /></F>

                              <button type="button" onClick={() => setEditingTeacherId(null)} className="tcp-done-btn">
                                <UserCheck className="h-3.5 w-3.5" />{locale === "km" ? "រួចរាល់" : "Done"}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionPanel>

              {/* ── 4. CTA ── */}
              <AccordionPanel panelKey="cta" openPanel={openPanel} setOpenPanel={setOpenPanel}
                icon={Phone} title={locale === "km" ? "ប្លុកអំពាវនាវ" : "Call to Action"}>
                <div className="tcp-fields">
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
        <div className="tcp-preview-area">
          <div className="tcp-iframe-wrap" style={{ maxWidth: vw[viewport] }}>
            <iframe ref={iframeRef} src="/en/teachers" title="Teachers page preview"
              className="tcp-iframe" sandbox="allow-same-origin allow-scripts allow-forms" />
            <div className="tcp-preview-badge">
              {locale === "km" ? "ការមើលជាមុន" : "Preview"} · {viewport}
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        .tcp-root { display:flex; flex-direction:column; height:calc(100vh - 64px); font-family:var(--font-sans,system-ui,sans-serif); background:#f1f5f9; overflow:hidden; }
        .tcp-topbar { display:flex; align-items:center; gap:.75rem; padding:0 1rem; height:52px; background:#0f172a; border-bottom:1px solid rgba(255,255,255,.08); flex-shrink:0; z-index:20; }
        .tcp-topbar-left { display:flex; align-items:center; gap:.75rem; flex:1; min-width:0; }
        .tcp-topbar-title { font-size:.82rem; font-weight:700; color:#fff; white-space:nowrap; }
        .tcp-topbar-link { display:inline-flex; align-items:center; gap:.35rem; font-size:.75rem; font-weight:500; color:rgba(255,255,255,.5); text-decoration:none; transition:color .15s; white-space:nowrap; }
        .tcp-topbar-link:hover { color:rgba(255,255,255,.85); }
        .tcp-topbar-right { display:flex; align-items:center; gap:.6rem; flex-shrink:0; }
        .tcp-vp-group { display:flex; border:1px solid rgba(255,255,255,.12); border-radius:8px; overflow:hidden; }
        .tcp-vp-btn { display:flex; align-items:center; justify-content:center; padding:.4rem .65rem; background:transparent; border:none; cursor:pointer; color:rgba(255,255,255,.45); transition:background .15s,color .15s; }
        .tcp-vp-btn:hover { color:rgba(255,255,255,.8); }
        .tcp-vp-btn--on { background:rgba(255,255,255,.12); color:#fff; }
        .tcp-icon-btn { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:7px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); cursor:pointer; color:rgba(255,255,255,.6); transition:background .15s,color .15s; }
        .tcp-icon-btn:hover { background:rgba(255,255,255,.14); color:#fff; }
        .tcp-saved-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#34d399; white-space:nowrap; }
        .tcp-err-tag { display:inline-flex; align-items:center; gap:.3rem; font-size:.74rem; font-weight:600; color:#f87171; white-space:nowrap; }
        .tcp-save-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.45rem 1rem; border-radius:8px; border:none; background:#f59e0b; color:#000; font-size:.8rem; font-weight:700; cursor:pointer; transition:opacity .15s,transform .15s; white-space:nowrap; }
        .tcp-save-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .tcp-save-btn:disabled { opacity:.5; cursor:not-allowed; }
        .tcp-body { display:flex; flex:1; overflow:hidden; }
        .tcp-panel { width:340px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; overflow-y:auto; display:flex; flex-direction:column; }
        .tcp-loading { display:flex; flex-direction:column; align-items:center; gap:.75rem; padding:3rem 1rem; color:#94a3b8; font-size:.82rem; }
        .tcp-load-err { display:flex; align-items:center; gap:.5rem; margin:.75rem; padding:.65rem .85rem; border-radius:8px; background:#fef2f2; border:1px solid #fecaca; color:#dc2626; font-size:.76rem; font-weight:500; }
        .tcp-panel-inner { padding:.75rem; display:flex; flex-direction:column; gap:.5rem; }
        .tcp-panel-desc { font-size:.75rem; color:#64748b; margin:0 0 .75rem; line-height:1.5; }
        .tcp-accordion { border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .tcp-accordion-trigger { display:flex; align-items:center; gap:.6rem; width:100%; padding:.7rem .85rem; background:#f8fafc; border:none; cursor:pointer; text-align:left; transition:background .15s; }
        .tcp-accordion-trigger:hover { background:#f1f5f9; }
        .tcp-acc-icon-wrap { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:7px; background:#0f172a; flex-shrink:0; }
        .tcp-acc-icon { width:14px; height:14px; color:#fff; }
        .tcp-acc-title { font-size:.82rem; font-weight:700; color:#0f172a; flex:1; }
        .tcp-acc-chevron { width:15px; height:15px; color:#94a3b8; flex-shrink:0; }
        .tcp-accordion-body { padding:.85rem; border-top:1px solid #e2e8f0; background:#fff; }
        .tcp-sections-list { display:flex; flex-direction:column; gap:.35rem; }
        .tcp-section-row { display:flex; align-items:center; gap:.55rem; padding:.5rem .6rem; border-radius:8px; border:1.5px solid #e2e8f0; background:#fff; transition:opacity .2s; }
        .tcp-section-row--off { opacity:.45; background:#f8fafc; }
        .tcp-grip { width:14px; height:14px; color:#cbd5e1; cursor:grab; flex-shrink:0; }
        .tcp-section-icon { width:14px; height:14px; color:#64748b; flex-shrink:0; }
        .tcp-section-name { flex:1; font-size:.8rem; font-weight:600; color:#334155; }
        .tcp-toggle { display:flex; align-items:center; justify-content:center; width:30px; height:22px; border-radius:6px; border:1px solid transparent; cursor:pointer; flex-shrink:0; transition:background .2s; }
        .tcp-toggle--on { background:#0f172a; border-color:#0f172a; color:#fff; }
        .tcp-toggle--off { background:#f1f5f9; border-color:#e2e8f0; color:#94a3b8; }
        .tcp-fields { display:flex; flex-direction:column; gap:.65rem; }
        .tcp-lang-tag { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#475569; padding:.4rem 0 .1rem; border-top:1px solid #f1f5f9; margin-top:.3rem; }
        .tcp-lang-km { color:#1e3a5f; }
        .tcp-field { display:flex; flex-direction:column; gap:.25rem; }
        .tcp-label { font-size:.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.06em; }
        .tcp-input, .tcp-textarea { width:100%; padding:.5rem .7rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:.82rem; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s; box-sizing:border-box; font-family:inherit; resize:vertical; }
        .tcp-input:focus, .tcp-textarea:focus { border-color:#0f172a; box-shadow:0 0 0 3px rgba(15,23,42,.08); background:#fff; }
        .tcp-textarea { min-height:56px; }
        .tcp-imgup { display:flex; flex-direction:column; gap:.35rem; }
        .tcp-imgup-preview { position:relative; width:100%; height:120px; border:2px dashed #e2e8f0; border-radius:10px; overflow:hidden; cursor:pointer; background:#f8fafc; transition:border-color .15s; }
        .tcp-imgup-preview:hover { border-color:#94a3b8; }
        .tcp-imgup-img { object-fit:cover; }
        .tcp-imgup-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:.4rem; color:#94a3b8; font-size:.78rem; font-weight:500; }
        .tcp-imgup-empty-icon { width:22px; height:22px; }
        .tcp-imgup-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(15,23,42,.45); opacity:0; transition:opacity .2s; }
        .tcp-imgup-preview:hover .tcp-imgup-overlay { opacity:1; }
        .tcp-imgup-err { display:flex; align-items:center; gap:.3rem; font-size:.72rem; font-weight:500; color:#dc2626; }
        .tcp-imgup-hint { font-size:.68rem; color:#94a3b8; margin:0; }
        
        .tcp-add-header { display:flex; align-items:center; justify-content:space-between; gap:.5rem; margin-bottom:.5rem; }
        .tcp-add-btn { display:inline-flex; align-items:center; gap:.3rem; padding:.35rem .65rem; border-radius:6px; border:none; background:#0f172a; color:#fff; font-size:.74rem; font-weight:700; cursor:pointer; white-space:nowrap; }
        .tcp-add-btn:hover { background:#1e293b; }
        .tcp-teachers-list { display:flex; flex-direction:column; gap:.5rem; }
        .tcp-teacher-card { border:1.5px solid #e2e8f0; border-radius:10px; background:#fff; overflow:hidden; }
        .tcp-teacher-card-head { display:flex; align-items:center; gap:.6rem; padding:.55rem .75rem; cursor:pointer; background:#f8fafc; transition:background .15s; }
        .tcp-teacher-card-head:hover { background:#f1f5f9; }
        .tcp-teacher-avatar { position:relative; width:36px; height:36px; border-radius:50%; overflow:hidden; flex-shrink:0; border:1px solid #cbd5e1; }
        .tcp-teacher-info { flex:1; min-width:0; }
        .tcp-teacher-name { font-size:.8rem; font-weight:700; color:#0f172a; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .tcp-teacher-sub { font-size:.7rem; color:#64748b; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .tcp-icon-btn-sm { display:flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:6px; background:transparent; border:none; cursor:pointer; }
        .tcp-icon-btn-sm:hover { background:#e2e8f0; }
        .tcp-teacher-card-body { padding:.75rem; border-top:1px solid #e2e8f0; background:#fff; display:flex; flex-direction:column; gap:.55rem; }
        .tcp-done-btn { display:inline-flex; align-items:center; justify-content:center; gap:.35rem; padding:.4rem .8rem; border-radius:6px; border:none; background:#0f172a; color:#fff; font-size:.75rem; font-weight:700; cursor:pointer; margin-top:.25rem; }

        .tcp-preview-area { flex:1; overflow:auto; display:flex; align-items:flex-start; justify-content:center; padding:1rem; background:#e2e8f0; }
        .tcp-iframe-wrap { position:relative; width:100%; min-height:calc(100vh - 64px); background:#fff; border-radius:12px; overflow:hidden; shadow:0 20px 25px -5px rgba(0,0,0,.1); transition:max-width .3s ease; display:flex; flex-direction:column; }
        .tcp-iframe { width:100%; height:100%; flex:1; min-height:calc(100vh - 84px); border:none; }
        .tcp-preview-badge { position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,.85); backdrop-filter:blur(8px); color:#fff; font-size:.7rem; font-weight:600; padding:.3rem .65rem; border-radius:20px; pointer-events:none; }
      `}</style>
    </div>
  );
}
