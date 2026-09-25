"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";

interface Subject {
  id: string;
  name: string;
  grades: string[];
}

const mockSubjects: Subject[] = [
  { id: "1", name: "Mathematics", grades: ["10", "11", "12"] },
  { id: "2", name: "Physics", grades: ["10", "11", "12"] },
  { id: "3", name: "Chemistry", grades: ["10", "11", "12"] },
  { id: "4", name: "Earth Science", grades: ["10"] },
];

const AVAILABLE_GRADES = ["10", "11", "12"];

export function SubjectsManager() {
  const locale = useAdminLocale();
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  
  const [formData, setFormData] = useState<{ name: string; grades: string[] }>({
    name: "",
    grades: []
  });

  const openAddModal = () => {
    setFormData({ name: "", grades: [] });
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setFormData({ name: subject.name, grades: [...subject.grades] });
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this subject?")) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingSubject) {
      setSubjects(
        subjects.map(s => s.id === editingSubject.id ? { ...s, ...formData } : s)
      );
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        grades: formData.grades
      };
      setSubjects([...subjects, newSubject]);
    }
    
    setIsModalOpen(false);
  };

  const toggleGrade = (grade: string) => {
    if (formData.grades.includes(grade)) {
      setFormData({ ...formData, grades: formData.grades.filter(g => g !== grade) });
    } else {
      setFormData({ ...formData, grades: [...formData.grades, grade] });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "មុខវិជ្ជា" : "Subjects"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងមុខវិជ្ជាសិក្សា និងកម្រិតថ្នាក់" : "Manage subjects and their assigned grades"}
          </p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Subject
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/50">
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Subject Name</th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Assigned Grades</th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-slate-500 text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {subjects.map((subject) => (
              <tr key={subject.id} className="transition-colors hover:bg-slate-50/50 group">
                <td className="px-4 py-2.5 font-semibold text-foreground">{subject.name}</td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {subject.grades.map(g => (
                      <span key={g} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                        Grade {g}
                      </span>
                    ))}
                    {subject.grades.length === 0 && <span className="text-muted-foreground italic text-[11px]">No grades</span>}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(subject)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-black hover:text-white transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subjects.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No subjects found.
          </div>
        )}
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md h-full bg-white p-8 shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {editingSubject ? "Edit Subject" : "Add New Subject"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">Subject Name</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="e.g. Mathematics"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Assigned Grades</label>
                <p className="text-xs text-muted-foreground mb-3">Select the grades where this subject is taught.</p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_GRADES.map(grade => {
                    const isSelected = formData.grades.includes(grade);
                    return (
                      <button
                        type="button"
                        key={grade}
                        onClick={() => toggleGrade(grade)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                          isSelected ? "border-black bg-black text-white" : "border-border bg-white text-muted-foreground hover:border-black"
                        }`}
                      >
                        Grade {grade}
                      </button>
                    )
                  })}
                </div>
              </div>

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
                  {editingSubject ? "Save Changes" : "Add Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
