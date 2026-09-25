"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { uploadImage, useCollection } from "@/hooks/use-collection";

export interface Teacher {
  id: string;
  photo: string;
  teacherId: string;
  name: string;
  gender: string;
  subjects: string[];
  classes: string[];
  grades: string[];
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    photo: "https://i.pravatar.cc/150?img=68",
    teacherId: "T849201",
    name: "Mr. Chea Vuthy",
    gender: "Male",
    subjects: ["Mathematics", "Physics"],
    classes: ["12A", "12B"],
    grades: ["12"],
  },
  {
    id: "2",
    photo: "https://i.pravatar.cc/150?img=47",
    teacherId: "T849202",
    name: "Ms. Tep Sreyneath",
    gender: "Female",
    subjects: ["Biology"],
    classes: ["11A", "11B", "10A"],
    grades: ["10", "11"],
  },
];

const AVAILABLE_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Earth Science",
  "Khmer Literature",
  "History",
  "Geography",
  "Morality & Civics",
  "English",
  "Information Technology",
  "Physical Education"
];
const AVAILABLE_CLASSES = ["10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B", "12C"];
const AVAILABLE_GRADES = ["10", "11", "12"];

export function TeacherManager({ initialData = mockTeachers }: { initialData?: Teacher[] }) {
  const locale = useAdminLocale();
  const { items: teachers, create, update, remove } = useCollection<Teacher>(
    "admin-teachers",
    initialData,
    { loadOnMount: false },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: "",
    gender: "Male",
    photo: "https://i.pravatar.cc/150?img=1",
    subjects: [],
    classes: [],
    grades: [],
  });

  const openAddModal = () => {
    setFormData({
      name: "",
      gender: "Male",
      photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      subjects: [],
      classes: [],
      grades: [],
    });
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const openEditModal = (teacher: Teacher) => {
    setFormData({ ...teacher });
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const deleteTeacher = async (id: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        await remove(id);
      } catch (requestError) {
        window.alert(requestError instanceof Error ? requestError.message : "Unable to delete teacher");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await update(editingTeacher.id, formData);
      } else {
        await create({
          ...(formData as Teacher),
          teacherId: `T${Math.floor(100000 + Math.random() * 900000)}`,
        });
      }
      setIsModalOpen(false);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to save teacher");
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploaded = await uploadImage(file, "teachers");
      setFormData((current) => ({ ...current, photo: uploaded.url }));
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to upload image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const toggleArrayItem = (field: "subjects" | "classes" | "grades", value: string) => {
    const currentArray = formData[field] || [];
    if (currentArray.includes(value)) {
      setFormData({ ...formData, [field]: currentArray.filter((item) => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...currentArray, value] });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "លោកគ្រូ អ្នកគ្រូ" : "Teachers"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងទិន្នន័យគ្រូបង្រៀន" : "Manage teacher profiles"}
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {locale === "km" ? "បន្ថែមគ្រូថ្មី" : "Add Teacher"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Photo</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Teacher ID</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Name</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Gender</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Subjects</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Grades</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Classes</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="transition-colors hover:bg-slate-50/60">
                <td className="px-5 py-2 w-16">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
                    <Image src={teacher.photo} alt={teacher.name} fill sizes="40px" className="object-cover" />
                  </div>
                </td>
                <td className="px-5 py-3.5 font-mono text-muted-foreground">{teacher.teacherId}</td>
                <td className="px-5 py-3.5 font-semibold text-foreground">{teacher.name}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    teacher.gender === "Female" 
                      ? "bg-pink-50 text-pink-700" 
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {teacher.gender}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map(s => (
                      <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {teacher.grades.map(g => (
                      <span key={g} className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">{g}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map(c => (
                      <span key={c} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">{c}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(teacher)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-black"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTeacher(teacher.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {teachers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No teachers found.
          </div>
        )}
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-white p-8 shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
              {/* Photo & Name */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Photo URL</label>
                  <div className="flex gap-4 items-center">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border shrink-0">
                      <Image src={formData.photo || "https://i.pravatar.cc/150"} alt="Preview" fill sizes="48px" className="object-cover" />
                    </div>
                    <input
                      type="url"
                      required
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <label className="mt-3 block text-xs font-semibold text-muted-foreground">Upload to Blob</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    disabled={uploading}
                    onChange={handlePhotoUpload}
                    className="mt-1 block w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                  />
                  {uploading ? <p className="mt-1 text-xs text-muted-foreground">Uploading image…</p> : null}
                </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Gender</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

              {/* Multi Selectors built with clean checkboxes */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SUBJECTS.map(subject => {
                    const isSelected = formData.subjects?.includes(subject);
                    return (
                      <button
                        type="button"
                        key={subject}
                        onClick={() => toggleArrayItem("subjects", subject)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected ? "border-black bg-black text-white" : "border-border bg-white text-muted-foreground hover:border-black"
                        }`}
                      >
                        {subject}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Grades</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_GRADES.map(grade => {
                    const isSelected = formData.grades?.includes(grade);
                    return (
                      <button
                        type="button"
                        key={grade}
                        onClick={() => toggleArrayItem("grades", grade)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected ? "border-black bg-black text-white" : "border-border bg-white text-muted-foreground hover:border-black"
                        }`}
                      >
                        Grade {grade}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Classes</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_CLASSES.map(cls => {
                    const isSelected = formData.classes?.includes(cls);
                    return (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => toggleArrayItem("classes", cls)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected ? "border-black bg-black text-white" : "border-border bg-white text-muted-foreground hover:border-black"
                        }`}
                      >
                        {cls}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {editingTeacher ? "Save Changes" : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
