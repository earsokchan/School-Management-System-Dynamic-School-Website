"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { news } from "@/data/news";
import type { Localized, NewsItem } from "@/data/types";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { uploadImage, useCollection } from "@/hooks/use-collection";
import { formatDate } from "@/lib/format";

type NewsForm = Omit<NewsItem, "id">;
type Language = keyof Localized;

const initialForm: NewsForm = {
  title: { en: "", km: "" },
  excerpt: { en: "", km: "" },
  category: { en: "", km: "" },
  date: "",
  image: "/images/news/news2.jpg",
  featured: false,
};

function cloneForm(item: NewsItem): NewsForm {
  return {
    title: { ...item.title },
    excerpt: { ...item.excerpt },
    category: { ...item.category },
    date: item.date,
    image: item.image,
    featured: item.featured ?? false,
  };
}

export function NewsManager({ initialData = news }: { initialData?: NewsItem[] }) {
  const locale = useAdminLocale();
  const { items, create, update, remove, loading, error } = useCollection<NewsItem>(
    "news",
    initialData,
    { loadOnMount: false },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<NewsForm>({ ...initialForm });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const sortedItems = useMemo(
    () => [...items].sort((left, right) => right.date.localeCompare(left.date)),
    [items],
  );

  const openAddModal = () => {
    setFormData({ ...initialForm, title: { en: "", km: "" }, excerpt: { en: "", km: "" }, category: { en: "", km: "" } });
    setEditingItem(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setFormData(cloneForm(item));
    setEditingItem(item);
    setFormError("");
    setIsModalOpen(true);
  };

  const updateLocalized = (field: "title" | "excerpt" | "category", language: Language, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: { ...current[field], [language]: value },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const value: NewsForm = {
      ...formData,
      title: { en: formData.title.en.trim(), km: formData.title.km.trim() },
      excerpt: { en: formData.excerpt.en.trim(), km: formData.excerpt.km.trim() },
      category: { en: formData.category.en.trim(), km: formData.category.km.trim() },
      image: formData.image.trim(),
    };

    if (!value.title.en || !value.title.km || !value.excerpt.en || !value.excerpt.km || !value.category.en || !value.category.km) {
      setFormError(locale === "km" ? "សូមបញ្ចូលចែកជាភាសាខ្មែរ និងភាសាអង់គ្លេស។" : "Enter both Khmer and English values for all localized fields.");
      return;
    }
    if (!value.date || !value.image) {
      setFormError(locale === "km" ? "សូមបញ្ចូលកាលបរិច្ឆេទ និងរូបភាព។" : "Enter a date and image.");
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        await update(editingItem.id, value);
      } else {
        await create(value);
      }
      setIsModalOpen(false);
    } catch (requestError) {
      setFormError(requestError instanceof Error ? requestError.message : "Unable to save news article");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFormError("");
    try {
      const uploaded = await uploadImage(file, "news");
      setFormData((current) => ({ ...current, image: uploaded.url }));
    } catch (requestError) {
      setFormError(requestError instanceof Error ? requestError.message : "Unable to upload image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!confirm(locale === "km" ? "តើត្រូវលុបអត្ថបទនេះទេ?" : "Delete this news article?")) return;
    try {
      await remove(item.id);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to delete news article");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "ពត៌មាន" : "News"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងអត្ថបទពថត៌មាន" : "Manage school news and featured stories"}
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {locale === "km" ? "បន្ថែមអត្ថបទ" : "Add News"}
        </button>
      </div>

      {error ? <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      {loading ? <p className="mb-3 text-xs text-muted-foreground">{locale === "km" ? "កំពុងផ្ទុកពត៌មាន…" : "Loading news…"}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Image</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sortedItems.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <div className="relative h-12 w-20 overflow-hidden rounded-lg border border-border">
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-foreground">{locale === "km" ? item.title.km : item.title.en}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{locale === "km" ? item.category.km : item.category.en}</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(item.date, locale)}</td>
                <td className="px-5 py-3.5">
                  {item.featured ? (
                    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      {locale === "km" ? "លេចធ្ងន់" : "Featured"}
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {locale === "km" ? "ធម្មតា" : "Standard"}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      aria-label={locale === "km" ? "កែសម្រួល" : "Edit news article"}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item)}
                      aria-label={locale === "km" ? "លុប" : "Delete news article"}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && sortedItems.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">{locale === "km" ? "មិនទាន់មានអត្ថបទពត៌មាន។" : "No news articles found."}</p> : null}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label={locale === "km" ? "បិទ" : "Close"}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-6 text-xl font-bold text-foreground">
              {editingItem ? (locale === "km" ? "កែសម្រួលអត្ថបទពត៌មាន" : "Edit News Article") : locale === "km" ? "បន្ថែមអត្ថបទពត៌មាន" : "Add News Article"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">{locale === "km" ? "ចំណងជើង" : "Title"}</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="text" required value={formData.title.en} onChange={(event) => updateLocalized("title", "en", event.target.value)} placeholder="English title" className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                  <input type="text" required value={formData.title.km} onChange={(event) => updateLocalized("title", "km", event.target.value)} placeholder="ចំណងជើងជាភាសាខ្មែរ" className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">{locale === "km" ? "សេចក្តីសង្ខេប" : "Excerpt"}</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <textarea required rows={4} value={formData.excerpt.en} onChange={(event) => updateLocalized("excerpt", "en", event.target.value)} placeholder="English excerpt" className="w-full resize-y rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                  <textarea required rows={4} value={formData.excerpt.km} onChange={(event) => updateLocalized("excerpt", "km", event.target.value)} placeholder="សេចក្តីសង្ខេបជាភាសាខ្មែរ" className="w-full resize-y rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">{locale === "km" ? "ប្រភេទ" : "Category"}</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="text" required value={formData.category.en} onChange={(event) => updateLocalized("category", "en", event.target.value)} placeholder="Achievements" className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                  <input type="text" required value={formData.category.km} onChange={(event) => updateLocalized("category", "km", event.target.value)} placeholder="សមិទ្ធផល" className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="news-date" className="mb-1.5 block text-sm font-semibold text-foreground">{locale === "km" ? "កាលបរិច្ឆេទ" : "Date"}</label>
                  <input id="news-date" type="date" required value={formData.date} onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))} className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
                <div>
                  <label htmlFor="news-featured" className="mb-1.5 block text-sm font-semibold text-foreground">{locale === "km" ? "ស្លាកសញ្ញាន៍" : "Featured"}</label>
                  <label className="flex h-10 items-center gap-2 rounded-xl border border-border px-3 text-sm text-foreground">
                    <input id="news-featured" type="checkbox" checked={formData.featured ?? false} onChange={(event) => setFormData((current) => ({ ...current, featured: event.target.checked }))} className="h-4 w-4 accent-black" />
                    {locale === "km" ? "បង្ហាញលើទំព័រដើម" : "Show on home page"}
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="news-image" className="mb-1.5 block text-sm font-semibold text-foreground">{locale === "km" ? "រូបភាព" : "Image"}</label>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border">
                    <Image src={formData.image || "/images/news/news2.jpg"} alt="Preview" fill sizes="96px" className="object-cover" />
                  </div>
                  <input id="news-image" type="text" required value={formData.image} onChange={(event) => setFormData((current) => ({ ...current, image: event.target.value }))} className="min-w-0 flex-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
                <label className="mt-3 block text-xs font-semibold text-muted-foreground" htmlFor="news-image-upload">{locale === "km" ? "ផ្ទុករូបភាពទៅ Vercel Blob" : "Upload to Vercel Blob"}</label>
                <input id="news-image-upload" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" disabled={uploading} onChange={handleImageUpload} className="mt-1 block w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
                {uploading ? <p className="mt-1 text-xs text-muted-foreground">{locale === "km" ? "កំពុងផ្ទុករូបភាព…" : "Uploading image…"}</p> : null}
              </div>

              {formError ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p> : null}

              <div className="mt-auto flex justify-end gap-3 pt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                  {locale === "km" ? "បោះបង់" : "Cancel"}
                </button>
                <button type="submit" disabled={saving || uploading} className="rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
                  {saving ? (locale === "km" ? "កំពុងរក្សាទុក…" : "Saving…") : editingItem ? (locale === "km" ? "រក្សាទុកការកែសម្រួល" : "Save Changes") : locale === "km" ? "បន្ថែមអត្ថបទ" : "Add News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
