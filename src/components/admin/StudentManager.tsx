"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, Upload, Download, Eye } from "lucide-react";
import Link from "next/link";
import Papa from "papaparse";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { StudentFormSheet, type StudentClassOption } from "@/components/admin/StudentFormSheet";
import type { Student } from "@/lib/student-types";
import { useCollection } from "@/hooks/use-collection";

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
    addressCity: "Phnom Penh",
    addressCountry: "Cambodia",
    previousSchool: "Preah Sisowath High School",
  },
];

export function StudentManager({ 
  initialData = mockStudents,
  availableClasses = []
}: { 
  initialData?: Student[];
  availableClasses?: StudentClassOption[];
}) {
  const locale = useAdminLocale();
  const { items: students, create, update, remove } = useCollection<Student>(
    "admin-students",
    initialData,
    { loadOnMount: false },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const deleteStudent = async (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await remove(id);
      } catch (requestError) {
        window.alert(requestError instanceof Error ? requestError.message : "Unable to delete student");
      }
    }
  };

  const handleSubmit = async (values: Partial<Student>) => {
    if (editingStudent) {
      await update(editingStudent.id, values);
    } else {
      await create({
        ...(values as Student),
        studentId: Math.floor(1000000 + Math.random() * 9000000).toString(),
      });
    }
  };

  const handleExport = () => {
    const csv = Papa.unparse(students.map(s => {
      const { id, photo, ...rest } = s;
      return rest;
    }));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rows = results.data as Partial<Student>[];
          for (const row of rows) {
            await create({
              ...row,
              studentId: row.studentId || Math.floor(1000000 + Math.random() * 9000000).toString(),
              photo: row.photo || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            });
          }
          alert("Import successful!");
        } catch (error) {
          alert("Error importing students.");
        }
      },
      error: () => {
        alert("Error parsing CSV.");
      }
    });
    e.target.value = "";
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
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            {locale === "km" ? "នាំចូល" : "Import CSV"}
            <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
          </label>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            {locale === "km" ? "នាំចេញ" : "Export CSV"}
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {locale === "km" ? "បន្ថែមសិស្សថ្មី" : "Add Student"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[1100px] text-left text-sm">
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
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Address</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Old School</th>
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
                <td className="px-5 py-3.5 text-muted-foreground truncate max-w-[150px]" title={[student.addressVillage, student.addressCity, student.addressProvince, student.addressCountry].filter(Boolean).join(", ")}>
                  {[student.addressVillage, student.addressCity, student.addressProvince, student.addressCountry].filter(Boolean).join(", ") || "-"}
                </td>
                <td className="px-5 py-3.5 text-muted-foreground truncate max-w-[150px]" title={student.previousSchool}>{student.previousSchool || "-"}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/students/${student.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-slate-100 hover:text-black"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
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


      <StudentFormSheet
        open={isModalOpen}
        student={editingStudent}
        availableClasses={availableClasses}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
