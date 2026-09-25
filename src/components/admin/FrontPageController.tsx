"use client";

import { useState } from "react";
import { Layout, GripVertical, Check } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { cn } from "@/lib/cn";

interface Section {
  id: string;
  name: { en: string; km: string };
  enabled: boolean;
}

const initialSections: Section[] = [
  { id: "hero", name: { en: "Hero Banner", km: "បដាខាងលើ" }, enabled: true },
  { id: "stats", name: { en: "School Statistics", km: "ស្ថិតិសាលា" }, enabled: true },
  { id: "about", name: { en: "About School", km: "អំពីសាលា" }, enabled: true },
  { id: "features", name: { en: "Key Features", km: "លក្ខណៈពិសេស" }, enabled: true },
  { id: "academics", name: { en: "Academic Programs", km: "កម្មវិធីសិក្សា" }, enabled: true },
  { id: "results", name: { en: "Student Results", km: "លទ្ធផលសិស្ស" }, enabled: true },
  { id: "news", name: { en: "Latest News", km: "ព័ត៌មានថ្មីៗ" }, enabled: true },
  { id: "events", name: { en: "Upcoming Events", km: "ព្រឹត្តិការណ៍" }, enabled: true },
  { id: "teachers", name: { en: "Teachers Directory", km: "លោកគ្រូ អ្នកគ្រូ" }, enabled: false },
  { id: "gallery", name: { en: "Photo Gallery", km: "វិចិត្រសាលរូបភាព" }, enabled: true },
];

export function FrontPageController() {
  const locale = useAdminLocale();
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [saved, setSaved] = useState(false);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app, save to backend here.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="rounded-xl border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground font-sans">
            <Layout className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            {locale === "km" ? "គ្រប់គ្រងទំព័រដើម" : "Front Page Sections"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            {locale === "km" 
              ? "បិទឬបើកផ្នែកនានាដើម្បីបង្ហាញនៅលើទំព័រមុខនៃគេហទំព័រ។" 
              : "Toggle sections to show or hide them on the public home page."}
          </p>
        </div>
        
        <div className="divide-y divide-border/50">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className={cn(
                "flex items-center justify-between p-4 px-6 transition-colors hover:bg-slate-50",
                !section.enabled && "opacity-60 bg-slate-50/50"
              )}
            >
              <div className="flex items-center gap-4">
                <GripVertical className="h-4 w-4 cursor-grab text-slate-300" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground font-sans">
                    {locale === "km" ? section.name.km : section.name.en}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">ID: {section.id}</p>
                </div>
              </div>
              
              <button
                type="button"
                role="switch"
                aria-checked={section.enabled}
                onClick={() => toggleSection(section.id)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                  section.enabled ? "bg-black" : "bg-slate-200"
                )}
              >
                <span className="sr-only">Toggle {section.name.en}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    section.enabled ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 animate-in fade-in slide-in-from-right-4 font-sans">
            <Check className="h-4 w-4" />
            {locale === "km" ? "បានរក្សាទុកដោយជោគជ័យ" : "Saved successfully!"}
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 font-sans"
        >
          {locale === "km" ? "រក្សាទុកការផ្លាស់ប្តូរ" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
