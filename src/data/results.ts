import type { StudentResult } from "@/data/types";

export const academicYears = ["2025-2026", "2024-2025", "2023-2024"];

export const gradeOptions = ["12", "11", "10", "9", "8", "7"];

export const classOptions = ["A", "B", "C", "D", "E", "F"];

const subjects = [
  { en: "Khmer", km: "ភាសាខ្មែរ" },
  { en: "Morality", km: "ក្រមសីលធម៌" },
  { en: "History", km: "ប្រវត្តិវិទ្យា" },
  { en: "Geography", km: "ភូមិវិទ្យា" },
  { en: "Mathematics", km: "គណិតវិទ្យា" },
  { en: "Physics", km: "រូបវិទ្យា" },
  { en: "Chemistry", km: "គីមីវិទ្យា" },
  { en: "Biology", km: "ជីវវិទ្យា" },
  { en: "Earth Science", km: "វិទ្យាសាស្ត្រផែនដី" },
  { en: "English", km: "ភាសាអង់គ្លេស" },
];

/* Real records from kp-tralach.org — first-semester exam scores, academic year 2025-2026 */
type Raw = [string, string, string, string, string, number[], number];

const raw: Raw[] = [
  ["4240000001", "Aen Chenta", "អេន ចិន្តា", "9", "D", [63, 25, 33, 32, 28, 32, 17, 35, 25, 30], 34.04],
  ["4240000002", "Heng Leeza", "ហេង លីហ្សា", "9", "C", [56, 11, 24, 27, 39, 18, 12, 32, 12, 17], 26.38],
  ["4240000003", "Kon Chantha", "គន ចន្ថា", "9", "B", [15, 8, 17, 10, 20, 19, 17, 6, 4, 30], 14.56],
  ["4240000005", "Sok Channira", "សុខ ច័ន្ទនីរ៉ា", "9", "C", [43, 10, 26, 16, 14, 22, 8, 17, 11, 25], 20.43],
  ["4240000006", "Keng Haipitu", "កេង ហៃពិទូ", "9", "A", [61, 31, 32, 31, 40, 16, 25, 22, 24, 37], 33.94],
  ["4240000007", "Chieng Ritthy", "ឈៀង រិទ្ធី", "9", "B", [67, 35, 33, 28, 30, 31, 25, 35, 23, 23], 35.11],
  ["4240000008", "Touch David", "ទូច ដេវីដ", "9", "B", [46, 8, 28, 27, 42, 25, 12, 26, 20, 23], 27.34],
  ["4240000009", "Meng Sopha", "ម៉េង សុផា", "9", "C", [50, 12, 28, 29, 15, 14, 8, 27, 22, 27], 24.68],
  ["4240000011", "Chim Maria", "ជៀម ម៉ារៀ", "9", "B", [91, 35, 30, 32, 73, 35, 25, 35, 25, 27], 43.4],
  ["4240000012", "Heng Phakdey", "ហៀង ភក្តី", "9", "A", [88, 31, 32, 32, 85, 35, 25, 35, 25, 49], 46.49],
  ["4240000013", "Sok Sovann Sreyti", "សុខ សុវណ្ណស្រីតី", "9", "C", [52, 16, 26, 28, 13, 20, 11, 13, 20, 19], 23.19],
];

export const studentResults: StudentResult[] = raw.map(
  ([id, nameEn, nameKm, grade, className, scores, average]) => ({
    id,
    name: { en: nameEn, km: nameKm },
    grade,
    className,
    academicYear: "2025-2026",
    subjects: subjects.map((subject, i) => ({ subject, score: scores[i] })),
    average,
  }),
);

export function getStudentResults(filters: {
  academicYear?: string;
  grade?: string;
  className?: string;
  query?: string;
}): StudentResult[] {
  let rows = studentResults;
  if (filters.academicYear) {
    rows = rows.filter((r) => r.academicYear === filters.academicYear);
  }
  if (filters.grade) {
    rows = rows.filter((r) => r.grade === filters.grade);
  }
  if (filters.className) {
    rows = rows.filter((r) => r.className === filters.className);
  }
  if (filters.query && filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.en.toLowerCase().includes(q) ||
        r.name.km.toLowerCase().includes(q),
    );
  }
  return rows;
}