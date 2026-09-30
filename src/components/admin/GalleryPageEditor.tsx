"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Tablet, Smartphone,
  Check, RefreshCw,
  ExternalLink, ChevronDown, ChevronRight,
  Type, Save, Upload, Loader2, AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";

export interface GalleryPageContent {
  id?: string;
  heroEyebrowEn: string; heroEyebrowKm: string;
  heroTitleEn: string; heroTitleKm: string;
  heroDescEn: string; heroDescKm: string;
  heroImageUrl: string;
}

const defaults: GalleryPageContent = {
  heroEyebrowEn: "Moments & Memories", heroEyebrowKm: "ពេលវេលា និងការចងចាំ",
  heroTitleEn: "Photo Gallery", heroTitleKm: "វិចិត្រសាលរូបភាព",
  heroDescEn: "Explore moments from our classrooms, school events, sports days, and community activities.",
  heroDescKm: "ស្វែងយល់ពីពេលវេលាពីថ្នាក់រៀន ព្រឹត្តិការណ៍សាលា ទិវាកីឡា និងសកម្មភាពសហគមន៍។",
  heroImageUrl: "/images/gallery/g-1.svg",
};

type PanelKey = "hero";

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
      fd.append("file", file); fd.append("folder", "gallery");
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

export function GalleryPageEditor() {
  const locale = useAdminLocale();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("hero");
  const [content, setContent] = useState<GalleryPageContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetch("/api/gallery-page-content")
      .then(r => r.json())
      .then((json: { data?: GalleryPageContent }) => {
        if (json?.data) setContent(prev => ({ ...prev, ...json.data }));
      })
      .catch(() => setLoadError("Failed to load gallery page content. Showing defaults."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true); setSaveError("");
    try {
      const res = await fetch("/api/gallery-page-content", {
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

  const set = useCallback(<K extends keyof GalleryPageContent>(k: K, v: GalleryPageContent[K]) => {
    setContent(prev => ({ ...prev, [k]: v }));
    setSaved(false);
  }, []);

  const vw = { desktop: "100%", tablet: "768px", mobile: "390px" };

  return (
    <div className="ape-root">
      <div className="ape-topbar">
        <div className="ape-topbar-left">
          <span className="ape-topbar-title">{locale === "km" ? "កែសម្រួលទំព័រវិចិត្រសាល" : "Edit Gallery Page"}</span>
          <a href="/en/gallery" target="_blank" rel="noopener noreferrer" className="ape-topbar-link">
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

      <div className="ape-body">
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
            </div>
          )}
        </aside>

        <div className="ape-preview-area">
          <div className="ape-iframe-wrap" style={{ maxWidth: vw[viewport] }}>
            <iframe ref={iframeRef} src="/en/gallery" title="Gallery page preview"
              className="ape-iframe" sandbox="allow-same-origin allow-scripts allow-forms" />
            <div className="ape-preview-badge">
              {locale === "km" ? "ការមើលជាមុន" : "Preview"} · {viewport}
            </div>
          </div>
        </div>
      </div>

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
        .ape-accordion { border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .ape-accordion-trigger { display:flex; align-items:center; gap:.6rem; width:100%; padding:.7rem .85rem; background:#f8fafc; border:none; cursor:pointer; text-align:left; transition:background .15s; }
        .ape-accordion-trigger:hover { background:#f1f5f9; }
        .ape-acc-icon-wrap { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:7px; background:#0f172a; flex-shrink:0; }
        .ape-acc-icon { width:14px; height:14px; color:#fff; }
        .ape-acc-title { font-size:.82rem; font-weight:700; color:#0f172a; flex:1; }
        .ape-acc-chevron { width:15px; height:15px; color:#94a3b8; flex-shrink:0; }
        .ape-accordion-body { padding:.85rem; border-top:1px solid #e2e8f0; background:#fff; }
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
        .ape-preview-area { flex:1; overflow:auto; display:flex; align-items:flex-start; justify-content:center; padding:1rem; background:#e2e8f0; }
        .ape-iframe-wrap { position:relative; width:100%; min-height:calc(100vh - 64px); background:#fff; border-radius:12px; overflow:hidden; shadow:0 20px 25px -5px rgba(0,0,0,.1); transition:max-width .3s ease; display:flex; flex-direction:column; }
        .ape-iframe { width:100%; height:100%; flex:1; min-height:calc(100vh - 84px); border:none; }
        .ape-preview-badge { position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,.85); backdrop-filter:blur(8px); color:#fff; font-size:.7rem; font-weight:600; padding:.3rem .65rem; border-radius:20px; pointer-events:none; }
      `}</style>
    </div>
  );
}
