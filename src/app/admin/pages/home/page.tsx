import type { Metadata } from "next";
import { HomePageEditor } from "@/components/admin/HomePageEditor";

export const metadata: Metadata = {
  title: "Edit Home Page",
  robots: { index: false },
};

export default function AdminHomePageEditor() {
  return <HomePageEditor />;
}
