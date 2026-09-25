"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { useCollection } from "@/hooks/use-collection";

const DAYS = [
  { id: "Mon", en: "Monday", km: "ច័ន្ទ" },
  { id: "Tue", en: "Tuesday", km: "អង្គារ" },
  { id: "Wed", en: "Wednesday", km: "ពុធ" },
  { id: "Thu", en: "Thursday", km: "ព្រហស្បតិ៍" },
  { id: "Fri", en: "Friday", km: "សុក្រ" },
  { id: "Sat", en: "Saturday", km: "សៅរ៍" },
];

const TIME_SLOTS = [
  { id: "T1", label: "07:00 - 08:00", prefix: "ព្រឹក ១" },
  { id: "T2", label: "08:00 - 09:00", prefix: "ព្រឹក ២" },
  { id: "T3", label: "09:00 - 10:00", prefix: "ព្រឹក ៣" },
  { id: "T4", label: "10:00 - 11:00", prefix: "ព្រឹក ៤" },
  { id: "T5", label: "11:00 - 12:00", prefix: "ព្រឹក ៥" },
  { id: "T6", label: "14:00 - 15:00", prefix: "ល្ងាច ១" },
  { id: "T7", label: "15:00 - 16:00", prefix: "ល្ងាច ២" },
  { id: "T8", label: "16:00 - 17:00", prefix: "ល្ងាច ៣" },
];

const SUBJECT_COLORS: Record<string, string> = {
  "Mathematics": "bg-green-300 text-green-900",
  "Physics": "bg-blue-300 text-blue-900",
  "Chemistry": "bg-purple-300 text-purple-900",
  "Biology": "bg-emerald-300 text-emerald-900",
  "Khmer": "bg-yellow-300 text-yellow-900",
  "History": "bg-red-300 text-red-900",
  "Geography": "bg-orange-300 text-orange-900",
  "English": "bg-cyan-300 text-cyan-900",
  "Sports": "bg-pink-300 text-pink-900",
};

const AVAILABLE_CLASSES = ["10A", "10B", "11A", "11B", "12A", "12B"];
const AVAILABLE_TEACHERS = [
  "M1 • នន ប៊ុណ្ណារិទ្ធ",
  "P1 • សុខ សាន",
  "K1 • អូន ហេង",
  "C1 • ចាន់ តារា",
  "H1 • មាស សុខា"
];

export interface TimetableEntry {
  id: string;
  classId: string;
  dayId: string;
  slotId: string;
  subject: string;
  teacher: string;
}

const mockEntries: TimetableEntry[] = [
  { id: "tt-1", classId: "12A", dayId: "Mon", slotId: "T1", subject: "Mathematics", teacher: "M1 • នន ប៊ុណ្ណារិទ្ធ" },
  { id: "tt-2", classId: "12A", dayId: "Tue", slotId: "T1", subject: "Physics", teacher: "P1 • សុខ សាន" },
  { id: "tt-3", classId: "12A", dayId: "Mon", slotId: "T2", subject: "Mathematics", teacher: "M1 • នន ប៊ុណ្ណារិទ្ធ" },
  { id: "tt-4", classId: "12A", dayId: "Wed", slotId: "T3", subject: "Khmer", teacher: "K1 • អូន ហេង" },
  { id: "tt-5", classId: "12B", dayId: "Thu", slotId: "T1", subject: "Chemistry", teacher: "C1 • ចាន់ តារា" },
  { id: "tt-6", classId: "12A", dayId: "Fri", slotId: "T4", subject: "History", teacher: "H1 • មាស សុខា" },
];

export function TimetableManager({ initialData = mockEntries }: { initialData?: TimetableEntry[] }) {
  const locale = useAdminLocale();
  const [viewMode, setViewMode] = useState<"class" | "teacher">("class");
  const [selectedClass, setSelectedClass] = useState("12A");
  const [selectedTeacher, setSelectedTeacher] = useState("M1 • នន ប៊ុណ្ណារិទ្ធ");
  const { items: entries, create, update, remove } = useCollection<TimetableEntry>(
    "timetable",
    initialData,
    { loadOnMount: false },
  );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{dayId: string, slotId: string} | null>(null);
  
  const [formData, setFormData] = useState({
    subject: "Mathematics",
    teacher: "",
    classId: selectedClass
  });

  const getEntry = (dayId: string, slotId: string) => {
    if (viewMode === "class") {
      return entries.find(e => e.classId === selectedClass && e.dayId === dayId && e.slotId === slotId);
    } else {
      return entries.find(e => e.teacher === selectedTeacher && e.dayId === dayId && e.slotId === slotId);
    }
  };

  const handleCellClick = (dayId: string, slotId: string) => {
    const existing = getEntry(dayId, slotId);
    if (existing) {
      setFormData({ subject: existing.subject, teacher: existing.teacher, classId: existing.classId });
    } else {
      setFormData({ 
        subject: "Mathematics", 
        teacher: viewMode === "teacher" ? selectedTeacher : "", 
        classId: viewMode === "class" ? selectedClass : AVAILABLE_CLASSES[0] 
      });
    }
    setSelectedCell({ dayId, slotId });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCell) return;

    const existing = getEntry(selectedCell.dayId, selectedCell.slotId);
    const value = {
      classId: formData.classId,
      dayId: selectedCell.dayId,
      slotId: selectedCell.slotId,
      subject: formData.subject,
      teacher: formData.teacher,
    };

    if (!value.subject || !value.teacher) return;
    try {
      if (existing) {
        await update(existing.id, value);
      } else {
        await create({ id: `tt-${Date.now()}`, ...value });
      }
      setIsModalOpen(false);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to save schedule");
    }
  };

  const handleDelete = async () => {
    if (!selectedCell) return;
    const existing = getEntry(selectedCell.dayId, selectedCell.slotId);
    if (!existing) return;
    try {
      await remove(existing.id);
      setIsModalOpen(false);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to remove schedule");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "កាលវិភាគ" : "Timetable"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "រៀបចំកាលវិភាគសិក្សាសម្រាប់សិស្សនិងគ្រូ" : "Manage class schedules for students and teachers"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              type="button"
              onClick={() => setViewMode("class")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${viewMode === "class" ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-black"}`}
            >
              By Class
            </button>
            <button 
              type="button"
              onClick={() => setViewMode("teacher")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${viewMode === "teacher" ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-black"}`}
            >
              By Teacher
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-foreground">
              {locale === "km" ? "ជ្រើសរើស៖" : "Select:"}
            </label>
            {viewMode === "class" ? (
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                {AVAILABLE_CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            ) : (
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black max-w-[200px]"
              >
                {AVAILABLE_TEACHERS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[1000px] border-collapse text-center">
          <thead>
            <tr className="bg-slate-50 border-b border-border">
              <th className="border-r border-border p-4 font-bold text-slate-600 w-32">
                {locale === "km" ? "ម៉ោង" : "Time"}
              </th>
              {DAYS.map(day => (
                <th key={day.id} className="border-r border-border p-4 font-bold text-slate-700 w-40 last:border-r-0">
                  {locale === "km" ? day.km : day.en}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(slot => (
              <tr key={slot.id} className="border-b border-border last:border-b-0">
                <td className="border-r border-border p-3 bg-slate-50/50">
                  <div className="text-xs font-bold text-slate-700 mb-1">{locale === "km" ? slot.prefix : slot.id}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{slot.label}</div>
                </td>
                {DAYS.map(day => {
                  const entry = getEntry(day.id, slot.id);
                  const colorClass = entry ? (SUBJECT_COLORS[entry.subject] || "bg-slate-200 text-slate-800") : "bg-white hover:bg-slate-50";
                  
                  return (
                    <td 
                      key={`${day.id}-${slot.id}`} 
                      className={`border-r border-border p-2 last:border-r-0 cursor-pointer transition-colors h-24 ${entry ? colorClass : colorClass}`}
                      onClick={() => handleCellClick(day.id, slot.id)}
                    >
                      {entry ? (
                        <div className="flex flex-col items-center justify-center h-full w-full rounded-md p-1">
                          <div className="font-bold text-sm mb-1">{entry.subject}</div>
                          <div className="text-[11px] opacity-80 max-w-[140px] truncate">
                            {viewMode === "class" ? entry.teacher : `Class ${entry.classId}`}
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Plus className="h-5 w-5 text-slate-300" />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedCell && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-bold text-foreground mb-4">
              {getEntry(selectedCell.dayId, selectedCell.slotId) ? "Edit Schedule" : "Add Schedule"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Class</label>
                <select
                  required
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                >
                  {AVAILABLE_CLASSES.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Subject</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                >
                  {Object.keys(SUBJECT_COLORS).map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground uppercase tracking-wider text-slate-500">Teacher Name & Code</label>
                <input
                  type="text"
                  required
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="e.g. M1 • នន ប៊ុណ្ណារិទ្ធ"
                />
              </div>

              <div className="pt-4 flex justify-between gap-3">
                {getEntry(selectedCell.dayId, selectedCell.slotId) ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                ) : <div />}
                <div className="flex gap-2">
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
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
