"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/hooks/use-collection";
import type { Student, StudentType } from "@/components/admin/StudentManager";

export interface StudentClassOption {
  id: string;
  name: string;
  grade: string;
}

function emptyForm(): Partial<Student> {
  return {
    name: "",
    phone: "",
    className: "",
    grade: "",
    type: "Technology",
    gender: "Male",
    addressCountry: "",
    addressCity: "",
    addressProvince: "",
    addressVillage: "",
    previousSchool: "",
    photo: "",
  };
}

const inputClass =
  "w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

export function StudentFormSheet({
  open,
  student,
  availableClasses,
  onClose,
  onSubmit,
}: {
  open: boolean;
  student: Student | null;
  availableClasses: StudentClassOption[];
  onClose: () => void;
  onSubmit: (values: Partial<Student>) => Promise<void>;
}) {
  const [formData, setFormData] = useState<Partial<Student>>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setFormData(student ? { ...student } : emptyForm());
  }, [open, student]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const grades = Array.from(new Set(availableClasses.map((item) => item.grade))).sort();
  const classes = availableClasses.filter((item) => item.grade === formData.grade);

  const setField = <K extends keyof Student>(key: K, value: Student[K]) =>
    setFormData((current) => ({ ...current, [key]: value }));

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploaded = await uploadImage(file, "students");
      setField("photo", uploaded.url);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to upload image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to save student");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="mb-6 text-xl font-bold text-foreground">
          {student ? "Edit Student" : "Add New Student"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-4">
          <div className="mb-4 flex flex-col items-center">
            <div className="group relative">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50 shadow-sm transition-all group-hover:border-slate-200">
                {formData.photo ? (
                  <Image
                    src={formData.photo}
                    alt="Profile preview"
                    fill
                    sizes="112px"
                    className={`object-cover transition-opacity ${uploading ? "opacity-50" : "opacity-100"}`}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
                    {(formData.name || "?").trim().charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-white shadow-sm transition-colors hover:bg-slate-50">
                <Upload className="h-4 w-4 text-slate-600" />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  disabled={uploading}
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            {uploading ? (
              <p className="mt-3 animate-pulse text-xs font-medium text-muted-foreground">Uploading...</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                required
                value={formData.name ?? ""}
                onChange={(event) => setField("name", event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select
                required
                value={formData.gender ?? ""}
                onChange={(event) => setField("gender", event.target.value)}
                className={inputClass}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                required
                value={formData.phone ?? ""}
                onChange={(event) => setField("phone", event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Grade</label>
              <select
                required
                value={formData.grade ?? ""}
                onChange={(event) => setFormData((current) => ({ ...current, grade: event.target.value, className: "" }))}
                className={inputClass}
              >
                <option value="" disabled>
                  Select Grade
                </option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Class</label>
              <select
                required
                value={formData.className ?? ""}
                onChange={(event) => setField("className", event.target.value)}
                className={inputClass}
                disabled={!formData.grade}
              >
                <option value="" disabled>
                  Select Class
                </option>
                {classes.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select
                value={formData.type ?? "Technology"}
                onChange={(event) => setField("type", event.target.value as StudentType)}
                className={inputClass}
              >
                <option value="Technology">Technology</option>
                <option value="Society">Society</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Country</label>
              <input
                type="text"
                value={formData.addressCountry ?? ""}
                onChange={(event) => setField("addressCountry", event.target.value)}
                className={inputClass}
                placeholder="Country"
              />
            </div>
            <div>
              <label className={labelClass}>Province</label>
              <input
                type="text"
                value={formData.addressProvince ?? ""}
                onChange={(event) => setField("addressProvince", event.target.value)}
                className={inputClass}
                placeholder="Province"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>City</label>
              <input
                type="text"
                value={formData.addressCity ?? ""}
                onChange={(event) => setField("addressCity", event.target.value)}
                className={inputClass}
                placeholder="City"
              />
            </div>
            <div>
              <label className={labelClass}>Village</label>
              <input
                type="text"
                value={formData.addressVillage ?? ""}
                onChange={(event) => setField("addressVillage", event.target.value)}
                className={inputClass}
                placeholder="Village"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>From Old School</label>
            <input
              type="text"
              value={formData.previousSchool ?? ""}
              onChange={(event) => setField("previousSchool", event.target.value)}
              className={inputClass}
              placeholder="Previous school name"
            />
          </div>

          <div className="mt-auto flex justify-end gap-3 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
            >
              {student ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
