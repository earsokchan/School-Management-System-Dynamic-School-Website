"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";

export type StudentType = "Technology" | "Society";

export interface Student {
  id: string;
  photo: string;
  studentId: string;
  name: string;
  phone: string;
  className: string;
  grade: string;
  type: StudentType;
  gender: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    photo: "https://i.pravatar.cc/150?img=11",
    studentId: "9076353",
    name: "Sok San",
    phone: "012 345 678",
    className: "12A",
    grade: "12",
    type: "Technology",
    gender: "Male",
  },
  {
    id: "2",
    photo: "https://i.pravatar.cc/150?img=32",
    studentId: "9076354",
    name: "Chan Minea",
    phone: "098 765 432",
    className: "11B",
    grade: "11",
    type: "Society",
    gender: "Female",
  },
];

export function StudentManager() {
  const locale = useAdminLocale();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    phone: "",
    className: "",
    grade: "",
    type: "Technology",
    gender: "Male",
    photo: "https://i.pravatar.cc/150?img=1",
  });

  const openAddModal = () => {
    setFormData({
      name: "",
      phone: "",
      className: "",
      grade: "",
      type: "Technology",
      gender: "Male",
      photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    });
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setFormData({ ...student });
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const deleteStudent = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...s, ...formData } as Student : s
        )
      );
    } else {
      const newStudent: Student = {
        ...(formData as Student),
        id: Date.now().toString(),
        studentId: Math.floor(1000000 + Math.random() * 9000000).toString(),
      };
      setStudents([newStudent, ...students]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Header with Add Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "សិស្សានុសិស្ស" : "Students"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងទិន្នន័យសិស្ស" : "Manage student records"}
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {locale === "km" ? "បន្ថែមសិស្សថ្មី" : "Add Student"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Photo</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Student ID</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Name</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Gender</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Phone</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Grade</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Class</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Type</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="transition-colors hover:bg-slate-50/60">
                <td className="px-5 py-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
                    <Image src={student.photo} alt={student.name} fill sizes="40px" className="object-cover" />
                  </div>
                </td>
                <td className="px-5 py-3.5 font-mono text-muted-foreground">{student.studentId}</td>
                <td className="px-5 py-3.5 font-semibold text-foreground">{student.name}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    student.gender === "Female" 
                      ? "bg-pink-50 text-pink-700" 
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {student.gender}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{student.phone}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{student.grade}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{student.className}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      student.type === "Technology"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {student.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(student)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-black"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
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
        {students.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No students found.
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
              {editingStudent ? "Edit Student" : "Add New Student"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-1">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Grade</label>
                  <select
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  >
                    <option value="" disabled>Select Grade</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Class</label>
                  <select
                    required
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  >
                    <option value="" disabled>Select Class</option>
                    <option value="10A">10A</option>
                    <option value="10B">10B</option>
                    <option value="11A">11A</option>
                    <option value="11B">11B</option>
                    <option value="12A">12A</option>
                    <option value="12B">12B</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as StudentType })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Society">Society</option>
                  </select>
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
                  {editingStudent ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
