import type { Metadata } from "next";
import { ResultsManager } from "@/components/admin/ResultsManager";
import { getAdminCollection } from "@/lib/server/admin-content";
import type { ResultItem } from "@/components/admin/ResultsManager";

export const metadata: Metadata = { title: "Admin Results", robots: { index: false } };

export default async function AdminResultsPage() {
  const initialData = await getAdminCollection<ResultItem>("admin-results");
  return <ResultsManager initialData={initialData} />;
}
