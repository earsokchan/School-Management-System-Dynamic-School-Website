import type { Metadata } from "next";
import { ResultsManager } from "@/components/admin/ResultsManager";

export const metadata: Metadata = { title: "Admin Results", robots: { index: false } };

export default function AdminResultsPage() {
  return (
    <>
      <ResultsManager />
    </>
  );
}