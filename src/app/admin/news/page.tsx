import type { Metadata } from "next";
import { NewsManager } from "@/components/admin/NewsManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { NewsItem } from "@/data/types";

export const metadata: Metadata = { title: "Admin News", robots: { index: false } };

export default async function AdminNewsPage() {
  const initialData = await getAdminCollection<NewsItem>("news");
  return <NewsManager initialData={initialData} />;
}
