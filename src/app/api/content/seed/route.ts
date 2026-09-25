import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { hasMongoConfig } from "@/lib/server/env";
import { seedPublicCollections } from "@/lib/server/seed";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }

  try {
    return NextResponse.json({ data: await seedPublicCollections() });
  } catch {
    return NextResponse.json({ error: "Unable to seed the database" }, { status: 500 });
  }
}
