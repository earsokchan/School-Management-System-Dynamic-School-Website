"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, X, Search } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";

interface SubjectResult {
  subject: string;
  score: string;
}

interface ResultItem {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  examType: string;
  results: SubjectResult[];
}

const mockResults: ResultItem[] = [
  {
    id: "1",
    studentId: "STU-001",
    studentName: "Sok San",
    studentClass: "12A",
    examType: "Mid-term",
    results: [
      { subject: "Mathematics", score: "95" },
      { subject: "Physics", score: "88" },
      { subject: "Chemistry", score: "92" },
    ]
  },
  {
    id: "2",
    studentId: "STU-002",
    studentName: "Chan Dara",
    studentClass: "10B",
    examType: "Monthly",
    results: [
      { subject: "Mathematics", score: "78" },
      { subject: "Biology", score: "85" },
    ]
  },
];

const AVAILABLE_CLASSES = ["10A", "10B", "10C", "11A", "11B", "12A", "12B"];
const EXAM_TYPES = ["Monthly", "Mid-term", "Final Term"];
const AVAILABLE_SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", 
  "Earth Science", "Khmer Literature", "History", 
  "Geography", "Morality & Civics", "English", 
  "Information Technology", "Physical Education"
];

export function ResultsManager() {
  const locale = useAdminLocale();
  const [resultsList, setResultsList] = useState<ResultItem[]>(mockResults);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<ResultItem | null>(null);
  
  const [formData, setFormData] = useState<{
    studentId: string;
    studentName: string;
    studentClass: string;
    examType: string;
    results: SubjectResult[];
  }>({
    studentId: "",
    studentName: "",
    studentClass: AVAILABLE_CLASSES[0],
    examType: EXAM_TYPES[0],
    results: []
  });

  const filteredResults = resultsList.filter(r => 
    r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.studentClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({ 
      studentId: "", 
      studentName: "", 
      studentClass: AVAILABLE_CLASSES[0], 
      examType: EXAM_TYPES[0],
      results: [] 
    });
    setEditingResult(null);
    setIsModalOpen(true);
  };

  const openEditModal = (result: ResultItem) => {
    setFormData({
      studentId: result.studentId,
      studentName: result.studentName,
      studentClass: result.studentClass,
      examType: result.examType || EXAM_TYPES[0],
      results: [...result.results]
    });
    setEditingResult(result);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this result record?")) return;
    setResultsList(resultsList.filter((r) => r.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.studentName) return;

    if (editingResult) {
      setResultsList(
        resultsList.map(r => r.id === editingResult.id ? { ...r, ...formData } : r)
      );
    } else {
      const newResult: ResultItem = {
        id: Date.now().toString(),
        ...formData
      };
      setResultsList([...resultsList, newResult]);
    }
    
    setIsModalOpen(false);
  };

  const addSubjectRow = () => {
    setFormData({
      ...formData,
      results: [...formData.results, { subject: AVAILABLE_SUBJECTS[0], score: "" }]
    });
  };

  const updateSubjectRow = (index: number, field: keyof SubjectResult, value: string) => {
    const newResults = [...formData.results];
    newResults[index][field] = value;
    setFormData({ ...formData, results: newResults });
  };

  const removeSubjectRow = (index: number) => {
    const newResults = [...formData.results];
    newResults.splice(index, 1);
    setFormData({ ...formData, results: newResults });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "លទ្ធផលសិក្សា" : "Academic Results"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងលទ្ធផលសិក្សារបស់សិស្ស" : "Manage student scores and academic results"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Name or Class..."
              className="w-64 rounded-xl border border-border bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-1.5 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Result
          </button>
        </div>
      </div>

      {/* Datatable */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/50">
              <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Student ID</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Student Name</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Class</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Exam Type</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Subjects & Scores</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredResults.map((result) => (
              <tr key={result.id} className="transition-colors hover:bg-slate-50/50 group">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{result.studentId}</td>
                <td className="px-4 py-3 font-semibold text-foreground">{result.studentName}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {result.studentClass}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 font-medium">
                  {result.examType}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {result.results.length > 0 ? result.results.map((r, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                        <span className="font-semibold">{r.subject}:</span> 
                        <span className={Number(r.score) >= 50 ? "text-emerald-600" : "text-red-500"}>{r.score}</span>
                      </span>
                    )) : (
                      <span className="text-xs text-muted-foreground italic">No scores</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(result)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-black hover:text-white transition-colors"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(result.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredResults.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No results found.
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
              {editingResult ? "Edit Results" : "Add Student Results"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Student ID</label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black font-mono"
                    placeholder="e.g. STU-123"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Class</label>
                  <select
                    required
                    value={formData.studentClass}
                    onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  >
                    {AVAILABLE_CLASSES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Student Name</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="e.g. Chan Dara"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Exam Type</label>
                  <select
                    required
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  >
                    {EXAM_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Subjects & Scores</label>
                  <button
                    type="button"
                    onClick={addSubjectRow}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Subject
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.results.map((result, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        value={result.subject}
                        onChange={(e) => updateSubjectRow(idx, "subject", e.target.value)}
                        className="flex-1 rounded-lg border border-border px-2.5 py-1.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                      >
                        {AVAILABLE_SUBJECTS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Score"
                        value={result.score}
                        onChange={(e) => updateSubjectRow(idx, "score", e.target.value)}
                        className="w-24 rounded-lg border border-border px-2.5 py-1.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubjectRow(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {formData.results.length === 0 && (
                    <p className="text-xs text-muted-foreground italic bg-slate-50 p-4 rounded-lg text-center border border-dashed border-border">
                      No subjects added. Click &quot;Add Subject&quot; to enter scores.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto pt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {editingResult ? "Save Changes" : "Save Results"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
