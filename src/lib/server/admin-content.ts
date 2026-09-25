import { redirect } from "next/navigation";
import { hasAdminSession, isAdminAuthConfigured } from "@/lib/server/admin-auth";
import { listCollection, type CollectionName } from "@/lib/server/collections";
import { hasMongoConfig } from "@/lib/server/env";

export async function getAdminCollection<T extends { id: string }>(
  name: CollectionName,
): Promise<T[] | undefined> {
  if (!isAdminAuthConfigured()) return undefined;
  if (!(await hasAdminSession())) redirect("/admin/login");
  if (!hasMongoConfig()) return undefined;

  try {
    return await listCollection<T>(name);
  } catch {
    return undefined;
  }
}
