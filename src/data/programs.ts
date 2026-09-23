import type { AcademicProgram } from "@/data/types";

const khmer = { en: "Khmer Language", km: "ភាសាខ្មែរ" };
const morality = { en: "Morality and Citizenship", km: "សីលធម៌ពលរដ្ឋ" };
const history = { en: "History", km: "ប្រវត្តិវិទ្យា" };
const geography = { en: "Geography", km: "ភូមិវិទ្យា" };
const mathematics = { en: "Mathematics", km: "គណិតវិទ្យា" };
const physics = { en: "Physics", km: "រូបវិទ្យា" };
const chemistry = { en: "Chemistry", km: "គីមីវិទ្យា" };
const biology = { en: "Biology", km: "ជីវវិទ្យា" };
const earthScience = { en: "Earth Science", km: "ផែនដីវិទ្យា" };
const english = { en: "English", km: "ភាសាអង់គ្លេស" };
const sports = { en: "Physical Education", km: "កីឡា" };
const agriculture = { en: "Agriculture", km: "កសិកម្ម" };
const technology = { en: "Technology", km: "បច្ចេកវិទ្យា" };
const lifeSkills = { en: "Life Skills", km: "បំណិនជីវិត" };
const health = { en: "Health Education", km: "សុខភាព" };

/* All subjects taught at the school (from the official student records page) */
export const allSubjects = [
  khmer,
  morality,
  history,
  geography,
  mathematics,
  physics,
  chemistry,
  biology,
  earthScience,
  english,
  sports,
  agriculture,
  technology,
  lifeSkills,
  health,
];

export const subjectsByTrack = {
  general: allSubjects,
  /* Baccalaureate core subjects by track (from the official Bac II standard) */
  science: [khmer, mathematics, physics, chemistry, biology, history],
  social: [khmer, mathematics, morality, history, geography, earthScience],
} as const;

export const academicPrograms: AcademicProgram[] = [
  {
    id: "grade-7",
    grade: { en: "Grade 7", km: "ថ្នាក់ទី ៧" },
    title: { en: "Lower Secondary — Foundation Years", km: "ថ្នាក់អនុវិទ្យាល័យ — ឆ្នាំគ្រឹះ" },
    description: {
      en: "Students build strong foundations in Khmer, mathematics and science while developing study habits for the years ahead.",
      km: "សិស្សានុសិស្សកសាងមូលដ្ឋានរឹងមាំក្នុងភាសាខ្មែរ គណិតវិទ្យា និងវិទ្យាសាស្ត្រ ជាមួយការបណ្តុះទម្លាប់សិក្សាសម្រាប់ឆ្នាំបន្តបន្ទាប់។",
    },
    image: "/images/academics/grade-7.svg",
    subjects: [...subjectsByTrack.general],
  },
  {
    id: "grade-8",
    grade: { en: "Grade 8", km: "ថ្នាក់ទី ៨" },
    title: { en: "Lower Secondary — Growing Skills", km: "ថ្នាក់អនុវិទ្យាល័យ — ការអភិវឌ្ឍជំនាញ" },
    description: {
      en: "A deeper dive into core subjects with more group work, projects and practical experiments.",
      km: "ការសិក្សាស៊ីជម្រៅលើមុខវិជ្ជាស្នូល ជាមួយការងារជាក្រុម គម្រោង និងការពិសោធន៍ជាក់ស្តែងបន្ថែមទៀត។",
    },
    image: "/images/academics/grade-8.svg",
    subjects: [...subjectsByTrack.general],
  },
  {
    id: "grade-9",
    grade: { en: "Grade 9", km: "ថ្នាក់ទី ៩" },
    title: { en: "Lower Secondary — Exam Ready", km: "ថ្នាក់អនុវិទ្យាល័យ — ត្រៀមប្រឡង" },
    description: {
      en: "Focused preparation for the Grade 9 national examination with rigorous revision classes.",
      km: "ការរៀបចំផ្តោតសំខាន់សម្រាប់ការប្រឡងជាតិថ្នាក់ទី ៩ ជាមួយថ្នាក់រៀនសង្ខេបខ្លឹមសារយ៉ាងយកចិត្តទុកដាក់។",
    },
    image: "/images/academics/grade-9.svg",
    subjects: [...subjectsByTrack.general],
  },
  {
    id: "grade-10",
    grade: { en: "Grade 10", km: "ថ្នាក់ទី ១០" },
    title: { en: "Upper Secondary — New Horizons", km: "ថ្នាក់វិទ្យាល័យ — ជើងមេឃថ្មី" },
    description: {
      en: "The transition to upper secondary with science and social science tracks and new subjects.",
      km: "ការផ្លាស់ប្តូរទៅថ្នាក់វិទ្យាល័យ ជាមួយវិថីវិទ្យាសាស្ត្រ និងវិទ្យាសាស្ត្រសង្គម និងមុខវិជ្ជាថ្មីៗ។",
    },
    image: "/images/academics/grade-10.svg",
    subjects: [...subjectsByTrack.general],
  },
  {
    id: "grade-11",
    grade: { en: "Grade 11", km: "ថ្នាក់ទី ១១" },
    title: { en: "Upper Secondary — Deep Specialisation", km: "ថ្នាក់វិទ្យាល័យ — ជំនាញស៊ីជម្រៅ" },
    description: {
      en: "Students specialise in science or social sciences in preparation for the Baccalaureate.",
      km: "សិស្សានុសិស្សជ្រើសរើសជំនាញវិទ្យាសាស្ត្រ ឬវិទ្យាសាស្ត្រសង្គម ដើម្បីត្រៀមប្រលងបាក់ឌុប។",
    },
    image: "/images/academics/grade-11.svg",
    subjects: [...subjectsByTrack.general],
  },
  {
    id: "grade-12",
    grade: { en: "Grade 12", km: "ថ្នាក់ទី ១២" },
    title: { en: "Baccalaureate & Beyond", km: "បាក់ឌុប និងលើសពីនេះ" },
    description: {
      en: "Intensive final-year preparation for the national Baccalaureate and university admission.",
      km: "ការរៀបចំដែលពឹងផ្អែកខ្លាំងនៅឆ្នាំចុងក្រោយ សម្រាប់ការប្រឡងបាក់ឌុបជាតិ និងការចូលសាកលវិទ្យាល័យ។",
    },
    image: "/images/academics/grade-12.svg",
    subjects: [...subjectsByTrack.general],
  },
];