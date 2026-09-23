import type { SchoolEvent } from "@/data/types";

export const events: SchoolEvent[] = [
  {
    id: "event-1",
    title: {
      en: "Khmer New Year Celebrations",
      km: "ពិធីបុណ្យចូលឆ្នាំខ្មែរ",
    },
    description: {
      en: "Traditional folk games, music and cultural performances to welcome the Khmer New Year.",
      km: "ល្បែងប្រជាប្រិយ តន្ត្រី និងការសម្តែងវប្បធម៌ ដើម្បីស្វាគមន៍ចូលឆ្នាំថ្មីខ្មែរ។",
    },
    date: "2026-04-14",
    time: { en: "8:00 AM – 4:00 PM", km: "៨:០០ ព្រឹក – ៤:០០ ល្ងាច" },
    location: { en: "School Main Yard", km: "ទីធ្លាសាលាធំ" },
    category: { en: "Culture", km: "វប្បធម៌" },
    image: "/images/events/khmer-new-year.svg",
  },
  {
    id: "event-2",
    title: {
      en: "National Sports Competition",
      km: "ការប្រកួតកីឡាជាតិ",
    },
    description: {
      en: "Our students represent the school in football, volleyball and athletics at the district level.",
      km: "សិស្សានុសិស្សរបស់យើងតំណាងឱ្យសាលាក្នុងការប្រកួតបាល់ទាត់ បាល់ទះ និងអត្តពលកម្ម ថ្នាក់ស្រុក។",
    },
    date: "2026-11-18",
    time: { en: "6:00 AM – 6:00 PM", km: "៦:០០ ព្រឹក – ៦:០០ ល្ងាច" },
    location: { en: "District Stadium", km: "ពហុកីឡដ្ឋានស្រុក" },
    category: { en: "Sports", km: "កីឡា" },
    image: "/images/events/sports.svg",
  },
  {
    id: "event-3",
    title: {
      en: "Open House Day",
      km: "ទិវាបើកផ្ទះសម្រាប់ឪពុកម្តាយ",
    },
    description: {
      en: "Families are invited to tour the campus and meet teachers during our annual open house.",
      km: "ក្រុមគ្រួសារត្រូវបានអញ្ជើញឱ្យទស្សនាបរិវេណសាលា និងជួបជាមួយគ្រូបង្រៀន ក្នុងទិវាបើកផ្ទះប្រចាំឆ្នាំ។",
    },
    date: "2026-10-29",
    time: { en: "7:00 AM – 11:00 AM", km: "៧:០០ ព្រឹក – ១១:០០ ព្រឹក" },
    location: { en: "School Campus", km: "បរិវេណសាលា" },
    category: { en: "Community", km: "សហគមន៍" },
    image: "/images/events/open-house.svg",
  },
  {
    id: "event-4",
    title: {
      en: "Ancestors' Day Ceremony",
      km: "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
    },
    description: {
      en: "The school observes Pchum Ben with a morning ceremony led for teachers and students.",
      km: "សាលាប្រារព្ធពិធីបុណ្យភ្ជុំបិណ្ឌ ជាមួយពិធីពេលព្រឹកដឹកនាំដោយលោកគ្រូ អ្នកគ្រូ និងសិស្សានុសិស្ស។",
    },
    date: "2026-09-30",
    time: { en: "6:00 AM – 9:00 AM", km: "៦:០០ ព្រឹក – ៩:០០ ព្រឹក" },
    location: { en: "School Hall", km: "សាលប្រជុំសាលា" },
    category: { en: "Culture", km: "វប្បធម៌" },
    image: "/images/events/pchum-ben.svg",
  },
  {
    id: "event-5",
    title: {
      en: "English Speech Contest",
      km: "ការប្រកួតសុន្ទរកថាភាសាអង់គ្លេស",
    },
    description: {
      en: "Students deliver speeches on education and the future of Cambodia in our annual English contest.",
      km: "សិស្សានុសិស្សថ្លែងសុន្ទរកថាអំពីការអប់រំ និងអនាគតកម្ពុជា ក្នុងការប្រកួតភាសាអង់គ្លេសប្រចាំឆ្នាំ។",
    },
    date: "2026-12-05",
    time: { en: "9:00 AM – 12:00 PM", km: "៩:០០ ព្រឹក – ១២:០០ ថ្ងៃត្រង់" },
    location: { en: "School Hall", km: "សាលប្រជុំសាលា" },
    category: { en: "Academics", km: "ការសិក្សា" },
    image: "/images/events/english-speech.svg",
  },
  {
    id: "event-6",
    title: {
      en: "Water Festival Activities",
      km: "សកម្មភាពបុណ្យអុំទូក",
    },
    description: {
      en: "Students celebrate Bon Om Touk with games, boat racing drawings and cultural lessons.",
      km: "សិស្សានុសិស្សអបអរបុណ្យអុំទូក ជាមួយការប្រកួតកីឡា ការគូររូបការប្រណាំងទូក និងមេរៀនវប្បធម៌។",
    },
    date: "2026-11-10",
    time: { en: "8:00 AM – 5:00 PM", km: "៨:០០ ព្រឹក – ៥:០០ ល្ងាច" },
    location: { en: "School Main Yard", km: "ទីធ្លាសាលាធំ" },
    category: { en: "Culture", km: "វប្បធម៌" },
    image: "/images/events/water-festival.svg",
  },
];

export function getEvent(id: string): SchoolEvent | undefined {
  return events.find((item) => item.id === id);
}