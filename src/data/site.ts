import type { StatItem, Facility, ActivityCategory } from "@/data/types";

export const stats: StatItem[] = [
  { id: "students", value: 1200, label: { en: "Students", km: "សិស្សានុសិស្ស" } },
  { id: "teachers", value: 45, label: { en: "Teachers & Staff", km: "គ្រូបង្រៀន និងមន្ត្រី" } },
  { id: "grades", value: 6, label: { en: "Grades 7–12", km: "ថ្នាក់ទី ៧–១២" } },
  { id: "years", value: 22, suffix: "+", label: { en: "Years of Excellence", km: "ឆ្នាំនៃមោទនភាព" } },
];

export const facilities: Facility[] = [
  {
    id: "classrooms",
    name: { en: "Classrooms", km: "បន្ទប់រៀន" },
    description: {
      en: "Bright, spacious classrooms equipped for effective learning in every subject.",
      km: "បន្ទប់រៀនធំទូលាយ និងភ្លឺច្បាស់ បំពាក់បរិការៈសម្រាប់ការរៀនសូត្រប្រកបដោយប្រសិទ្ធភាពលើគ្រប់មុខវិជ្ជា។",
    },
    image: "/images/campus/classrooms.svg",
  },
  {
    id: "library",
    name: { en: "Library", km: "បណ្ណាល័យ" },
    description: {
      en: "A quiet reading space with books in Khmer, English and science for all grades.",
      km: "កន្លែងអានសៀវភៅស្ងប់ស្ងាត់ មានសៀវភៅជាភាសាខ្មែរ អង់គ្លេស និងវិទ្យាសាស្ត្រ សម្រាប់គ្រប់ថ្នាក់។",
    },
    image: "/images/campus/library.svg",
  },
  {
    id: "computer-room",
    name: { en: "Computer Room", km: "បន្ទប់កុំព្យូទ័រ" },
    description: {
      en: "Digital literacy classes with computer access for students of all levels.",
      km: "ថ្នាក់រៀនជំនាញឌីជីថល ជាមួយការប្រើប្រាស់កុំព្យូទ័រសម្រាប់សិស្សគ្រប់កម្រិត។",
    },
    image: "/images/campus/computer-room.svg",
  },
  {
    id: "science",
    name: { en: "Science Facilities", km: "បន្ទប់ពិសោធន៍វិទ្យាសាស្ត្រ" },
    description: {
      en: "Laboratories where students perform experiments in physics, chemistry and biology.",
      km: "មន្ទីរពិសោធន៍ ដែលសិស្សានុសិស្សធ្វើការពិសោធន៍រូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា។",
    },
    image: "/images/campus/science.svg",
  },
  {
    id: "sports",
    name: { en: "Sports Area", km: "ទីលានកីឡា" },
    description: {
      en: "Football and volleyball courts that keep our students active and healthy.",
      km: "ទីលានបាល់ទាត់ និងបាល់ទះ ដែលរក្សាសិស្សានុសិស្សឱ្យសកម្ម និងមានសុខភាពល្អ។",
    },
    image: "/images/campus/sports-area.svg",
  },
  {
    id: "student-areas",
    name: { en: "Student Areas", km: "តំបន់សិស្សានុសិស្ស" },
    description: {
      en: "Open spaces where students relax, study together and build friendships.",
      km: "កន្លែងធំទូលាយ ដែលសិស្សានុសិស្សសម្រាក សិក្សាជាមួយគ្នា និងកសាងមិត្តភាព។",
    },
    image: "/images/campus/student-areas.svg",
  },
];

export const activityCategories: ActivityCategory[] = [
  {
    id: "sports",
    title: { en: "Sports", km: "កីឡា" },
    description: {
      en: "Football, volleyball and athletics teams representing our school with pride.",
      km: "ក្រុមបាល់ទាត់ បាល់ទះ និងអត្តពលកម្ម ដែលតំណាងសាលារបស់យើងដោយមោទនភាព។",
    },
    image: "/images/students/sports.svg",
  },
  {
    id: "clubs",
    title: { en: "Clubs", km: "ក្លឹប" },
    description: {
      en: "English, music, art and debate clubs that spark creativity and confidence.",
      km: "ក្លឹបភាសាអង់គ្លេស តន្ត្រី សិល្បៈ និងការពិភាក្សា ដែលបំផុសគំនិតច្នៃប្រឌិត និងទំនុកចិត្ត។",
    },
    image: "/images/students/clubs.svg",
  },
  {
    id: "cultural",
    title: { en: "Cultural Activities", km: "សកម្មភាពវប្បធម៌" },
    description: {
      en: "Traditional dance, music and Khmer heritage events celebrated together.",
      km: "របាំប្រពៃណី តន្ត្រី និងពិធីវប្បធម៌ខ្មែរ ដែលប្រារព្ធរួមគ្នា។",
    },
    image: "/images/students/cultural.svg",
  },
  {
    id: "academic",
    title: { en: "Academic Activities", km: "សកម្មភាពសិក្សា" },
    description: {
      en: "Science fairs, math competitions and study groups that push students further.",
      km: "ពិព័រណ៍វិទ្យាសាស្ត្រ ការប្រកួតគណិតវិទ្យា និងក្រុមសិក្សា ដែលជំរុញសិស្សឱ្យខិតខំបន្ថែមទៀត។",
    },
    image: "/images/students/academic.svg",
  },
  {
    id: "community",
    title: { en: "Community Activities", km: "សកម្មភាពសហគមន៍" },
    description: {
      en: "Students give back by joining clean-ups, tree planting and charity drives.",
      km: "សិស្សានុសិស្សចូលរួមធ្វើអំពើល្អ ដោយរៀបចំសកម្មភាពសម្អាត ដាំដើមឈើ និងការបរិច្ចាគ។",
    },
    image: "/images/students/community.svg",
  },
  {
    id: "leadership",
    title: { en: "Leadership", km: "ភាពជាអ្នកដឹកនាំ" },
    description: {
      en: "Student councils and class monitors that build responsibility and teamwork.",
      km: "ក្រុមប្រឹក្សាសិស្ស និងសិស្សឆ្នើមប្រចាំថ្នាក់ ដែលកសាងទំនួលខុសត្រូវ និងការធ្វើការជាក្រុម។",
    },
    image: "/images/students/leadership.svg",
  },
];

export const features = [
  {
    id: "feat-1",
    title: { en: "Quality Education", km: "ការអប់រំមានគុណភាព" },
    description: {
      en: "A strong national curriculum delivered by professional teachers in every subject.",
      km: "កម្មវិធីសិក្សាជាតិរឹងមាំ បង្រៀនដោយគ្រូជំនាញគ្រប់មុខវិជ្ជា។",
    },
  },
  {
    id: "feat-2",
    title: { en: "Modern Facilities", km: "បរិការៈទំនើប" },
    description: {
      en: "Libraries, computer rooms and science laboratories support hands-on learning.",
      km: "បណ្ណាល័យ បន្ទប់កុំព្យូទ័រ និងមន្ទីរពិសោធន៍វិទ្យាសាស្ត្រ គាំទ្រការរៀនតាមបទពិសោធន៍ជាក់ស្តែង។",
    },
  },
  {
    id: "feat-3",
    title: { en: "Sports & Clubs", km: "កីឡា និងក្លឹប" },
    description: {
      en: "Football, volleyball and youth clubs help students grow beyond the classroom.",
      km: "បាល់ទាត់ បាល់ទះ និងក្លឹបយុវជន ជួយសិស្សឱ្យលូតលាស់លើសពីការរៀនក្នុងថ្នាក់។",
    },
  },
  {
    id: "feat-4",
    title: { en: "Safe Environment", km: "បរិយាកាសសុវត្ថិភាព" },
    description: {
      en: "A respectful and supportive culture where every student feels valued.",
      km: "វប្បធម៌គោរព និងគាំទ្រគ្នាទៅវិញទៅមក ដែលសិស្សគ្រប់រូបមានអារម្មណ៍ថាខ្លួនមានតម្លៃ។",
    },
  },
];

export const galleryStats = {
  photos: 120,
  events: 30,
  achievements: 40,
};