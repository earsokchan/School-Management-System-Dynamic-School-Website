import type { GalleryItem } from "@/data/types";

export const gallery: GalleryItem[] = [
  { id: "g-1", title: { en: "Main School Building", km: "អាគារសំខាន់របស់សាលា" }, category: "campus", image: "/images/gallery/g-1.svg" },
  { id: "g-2", title: { en: "Morning Assembly", km: "ពិធីស្វាគមន៍ពេលព្រឹក" }, category: "students", image: "/images/gallery/g-2.svg" },
  { id: "g-3", title: { en: "Khmer New Year Performance", km: "ការសម្តែងចូលឆ្នាំខ្មែរ" }, category: "events", image: "/images/gallery/g-3.svg" },
  { id: "g-4", title: { en: "Football Practice", km: "ការហ្វឹកហាត់បាល់ទាត់" }, category: "sports", image: "/images/gallery/g-4.svg" },
  { id: "g-5", title: { en: "Library Reading Hour", km: "ម៉ោងអានសៀវភៅក្នុងបណ្ណាល័យ" }, category: "activities", image: "/images/gallery/g-5.svg" },
  { id: "g-6", title: { en: "School Garden", km: "សួនសាលា" }, category: "campus", image: "/images/gallery/g-6.svg" },
  { id: "g-7", title: { en: "Volleyball Tournament", km: "ការប្រកួតបាល់ទះ" }, category: "sports", image: "/images/gallery/g-7.svg" },
  { id: "g-8", title: { en: "Computer Class", km: "ថ្នាក់កុំព្យូទ័រ" }, category: "activities", image: "/images/gallery/g-8.svg" },
  { id: "g-9", title: { en: "Science Experiment", km: "ការពិសោធន៍វិទ្យាសាស្ត្រ" }, category: "students", image: "/images/gallery/g-9.svg" },
  { id: "g-10", title: { en: "Independence Day Parade", km: "ពិធីដង្ហែទិវាឯករាជ្យ" }, category: "events", image: "/images/gallery/g-10.svg" },
  { id: "g-11", title: { en: "Music Club Rehearsal", km: "ការហាត់សមរបស់ក្លឹបតន្ត្រី" }, category: "activities", image: "/images/gallery/g-11.svg" },
  { id: "g-12", title: { en: "Sports Field", km: "ទីលានកីឡា" }, category: "campus", image: "/images/gallery/g-12.svg" },
];

export const galleryCategories: { id: GalleryItem["category"]; label: { en: string; km: string } }[] = [
  { id: "all", label: { en: "All", km: "ទាំងអស់" } },
  { id: "campus", label: { en: "Campus", km: "បរិវេណសាលា" } },
  { id: "students", label: { en: "Students", km: "សិស្សានុសិស្ស" } },
  { id: "events", label: { en: "Events", km: "ព្រឹត្តិការណ៍" } },
  { id: "sports", label: { en: "Sports", km: "កីឡា" } },
  { id: "activities", label: { en: "Activities", km: "សកម្មភាព" } },
];