import type { NewsItem } from "@/data/types";

export const news: NewsItem[] = [
  {
    id: "news-trophy-parade",
    title: {
      en: "Trophy Parade Celebrating 22 Years of Excellence",
      km: "ពិធីដង្ហែពាន អបអរសាទរខួប ២២ឆ្នាំ នៃការបង្កើតសាលា",
    },
    excerpt: {
      en: "Students, teachers and parents marched through the community carrying the trophies our school won — including the Model School, Clean School, Good Teacher and Sports awards.",
      km: "សិស្សានុសិស្ស លោកគ្រូ អ្នកគ្រូ និងអាណាព្យាបាល បានដង្ហែពានដែលសាលាទទួលបាន ដោយឆ្លងកាត់សហគមន៍ រួមមានពានសាលាគំរូ ពានសាលាស្អាត ពានគ្រូបង្រៀនល្អ និងពានកីឡា។",
    },
    category: { en: "Achievements", km: "សមិទ្ធផល" },
    date: "2026-02-19",
    image: "/images/news/news2.jpg",
    featured: true,
  },
  {
    id: "news-principal-award",
    title: {
      en: "Congratulations Director Ney Mao — National Good Principal Award",
      km: "អបអរសាទរ លោកនាយក នី ម៉ៅ ទទួលបានបណ្ណសរសើរជានាយកសាលាល្អថ្នាក់ជាតិ",
    },
    excerpt: {
      en: "Our school director Mr. Ney Mao received a national certificate of appreciation as a good school principal at a ceremony honoring teachers who successfully completed their subject-teacher training.",
      km: "លោក នី ម៉ៅ នាយកសាលា ត្រូវបានទទួលបណ្ណសរសើរជានាយកសាលាល្អថ្នាក់ជាតិ ក្នុងពិធីជួបសំណេះសំណាល និងប្រគល់បណ្ណសរសើរជូនលោកគ្រូ អ្នកគ្រូ ដែលបានបញ្ចប់ការប្រឡងបណ្តុះបណ្តាលគ្រូមុខវិជ្ជាដោយជោគជ័យ។",
    },
    category: { en: "Achievements", km: "សមិទ្ធផល" },
    date: "2026-02-13",
    image: "/images/news/news1.jpg",
  },
  {
    id: "news-opening-ceremony",
    title: {
      en: "Celebrating the Opening of the New School Year 2025–2026",
      km: "អបអរសាទរពិធីបើកបវេសនកាល ឆ្នាំសិក្សាថ្មី ២០២៥-២០២៦",
    },
    excerpt: {
      en: "A warm welcome to all students for the new school year 2025–2026. The school hosted the opening ceremony under the chairmanship of the school management committee.",
      km: "សូមស្វាគមន៍សិស្សានុសិស្សទាំងអស់ មកកាន់ឆ្នាំសិក្សាថ្មី ២០២៥-២០២៦ ដែលសាលាបានរៀបចំពិធីបើកបវេសនកាល ក្រោមអធិបតីភាពនៃគណៈគ្រប់គ្រងសាលា។",
    },
    category: { en: "School Life", km: "ជីវិតសាលា" },
    date: "2026-03-09",
    image: "/images/news/hero-news.jpg",
  },
];

export function getNewsItem(id: string): NewsItem | undefined {
  return news.find((item) => item.id === id);
}

export const featuredNews: NewsItem[] = news.filter((item) => item.featured);