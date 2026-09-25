"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, X, GraduationCap } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { useCollection } from "@/hooks/use-collection";

export interface ClassItem {
  id: string;
  name: string;
  grade: string;
}

export interface GradeItem {
  id: string;
  name: string;
  type: "grade";
}

const mockGrades = ["10", "11", "12"];
const initialGrades: GradeItem[] = mockGrades.map((name) => ({ id: `grade-${name}`, name, type: "grade" }));
const mockClasses: ClassItem[] = [
  { id: "1", name: "10A", grade: "10" },
  { id: "2", name: "10B", grade: "10" },
  { id: "3", name: "11A", grade: "11" },
  { id: "4", name: "11B", grade: "11" },
  { id: "5", name: "12A", grade: "12" },
  { id: "6", name: "12B", grade: "12" },
];

export function ClassesManager({
  initialClasses = mockClasses,
  initialGradeItems = initialGrades,
}: {
  initialClasses?: ClassItem[];
  initialGradeItems?: GradeItem[];
}) {
  const locale = useAdminLocale();

  const { items: classes, create: createClass, remove: removeClass } = useCollection<ClassItem>(
    "classes",
    initialClasses,
    { loadOnMount: false },
  );
  const { items: gradeItems, create: createGrade, remove: removeGrade } = useCollection<GradeItem>(
    "settings",
    initialGradeItems,
    { loadOnMount: false },
  );
  const grades = Array.from(
    new Set(gradeItems.filter((grade) => grade.type === "grade").map((grade) => grade.name)),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Grade" | "Class" | null>(null);
  
  const [gradeName, setGradeName] = useState("");
  
  // For Class modal
  const [editingGradeGroup, setEditingGradeGroup] = useState<string | null>(null);
  const [classNames, setClassNames] = useState<string[]>([]);
  const [classNameInput, setClassNameInput] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const openGradeModal = () => {
    setModalType("Grade");
    setGradeName("");
    setIsModalOpen(true);
  };

  const openClassModal = (gradeString?: string) => {
    setModalType("Class");
    if (gradeString) {
      const existingClasses = classes.filter(c => c.grade === gradeString).map(c => c.name);
      setEditingGradeGroup(gradeString);
      setClassNames(existingClasses);
      setClassNameInput("");
      setSelectedGrade(gradeString);
    } else {
      setEditingGradeGroup(null);
      setClassNames([]);
      setClassNameInput("");
      setSelectedGrade(grades[0] || "");
    }
    setIsModalOpen(true);
  };

  const handleDeleteClassGroup = async (gradeString: string) => {
    if (!confirm(`Are you sure you want to delete all classes in Grade ${gradeString}?`)) return;
    try {
      await Promise.all(classes.filter((item) => item.grade === gradeString).map((item) => removeClass(item.id)));
      const grade = gradeItems.find((item) => item.name === gradeString);
      if (grade) await removeGrade(grade.id);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to delete grade");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (modalType === "Grade") {
        if (!gradeName.trim() || grades.includes(gradeName.trim())) return;
        await createGrade({
          id: `grade-${gradeName.trim()}`,
          name: gradeName.trim(),
          type: "grade",
        });
      } else if (modalType === "Class") {
        const pendingValue = classNameInput.trim().replace(/,/g, "");
        const allNewClasses = [...classNames];
        if (pendingValue && !classNames.includes(pendingValue)) {
          allNewClasses.push(pendingValue);
        }
        if (allNewClasses.length === 0 || !selectedGrade) return;

        if (editingGradeGroup) {
          await Promise.all(
            classes
              .filter((item) => item.grade === editingGradeGroup)
              .map((item) => removeClass(item.id)),
          );
        }
        await Promise.all(
          allNewClasses.map((name, index) =>
            createClass({
              id: `${selectedGrade}-${name}-${Date.now()}-${index}`,
              name,
              grade: selectedGrade,
            }),
          ),
        );
      }
      setIsModalOpen(false);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to save classes");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Submit form if it's enter and input is empty
    if (e.key === "Enter" && !classNameInput.trim()) {
      return; 
    }
    
    // Add tag on Space, Comma, or Enter
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const val = classNameInput.trim().replace(/,/g, "");
      if (val && !classNames.includes(val)) {
        setClassNames([...classNames, val]);
      }
      setClassNameInput("");
    } else if (e.key === "Backspace" && !classNameInput && classNames.length > 0) {
      setClassNames(classNames.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setClassNames(classNames.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "ថ្នាក់ និងកម្រិត" : "Classes & Grades"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងថ្នាក់រៀន និងកម្រិតថ្នាក់" : "Manage grades and classes"}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={openGradeModal}
            className="flex items-center gap-1.5 text-sm font-semibold bg-white border border-border text-foreground px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <GraduationCap className="h-4 w-4" /> Add Grade
          </button>
          <button 
            onClick={() => openClassModal()}
            className="flex items-center gap-1.5 text-sm font-semibold bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Class
          </button>
        </div>
      </div>

      {/* Datatable */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/50">
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Classes</th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Grade</th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-slate-500 text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {grades.map(grade => {
              const gradeClasses = classes.filter(c => c.grade === grade);
              if (gradeClasses.length === 0) return null;
              
              return (
                <tr key={grade} className="transition-colors hover:bg-slate-50/50 group">
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {gradeClasses.map(c => (
                        <span key={c.id} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    Grade {grade}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openClassModal(grade)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-black hover:text-white transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClassGroup(grade)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {classes.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No classes found.
          </div>
        )}
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && modalType && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm h-full bg-white p-8 shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {modalType === "Grade" 
                ? "Add New Grade" 
                : editingGradeGroup ? "Edit Classes" : "Add New Classes"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
              
              {modalType === "Grade" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Grade Level</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={gradeName}
                    onChange={(e) => setGradeName(e.target.value)}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="e.g. 10"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">Assign Grade</label>
                    <select
                      required
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a grade</option>
                      {grades.map(g => (
                        <option key={g} value={g}>Grade {g}</option>
                      ))}
                    </select>
                    {grades.length === 0 && (
                      <p className="mt-1.5 text-xs text-red-500">Please add a Grade first.</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">
                      Classes
                    </label>
                    <div className="flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-xl border border-border bg-white p-1.5 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                      {classNames.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-sm font-medium text-slate-700"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={classNameInput}
                        onChange={(e) => setClassNameInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground min-w-[120px]"
                        placeholder={classNames.length === 0 ? "Type and press space..." : ""}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">Press Space or Enter to add a class tag.</p>
                  </div>
                </>
              )}

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
                  {modalType === "Grade" ? "Add Grade" : editingGradeGroup ? "Save Changes" : "Add Classes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
