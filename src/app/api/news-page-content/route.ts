import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { getDatabase } from "@/lib/server/mongodb";
import { revalidatePath } from "next/cache";
import { hasMongoConfig } from "@/lib/server/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DOC_ID = "singleton";
const COLLECTION = "news-page-content";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }
  try {
    const db = await getDatabase();
    const doc = await db.collection(COLLECTION).findOne({ id: DOC_ID });
    if (!doc) return NextResponse.json({ data: null });
    const raw = doc as Record<string, unknown>;
    const { _id, ...rest } = raw;
    void _id;
    return NextResponse.json({ data: rest });
  } catch {
    return NextResponse.json({ error: "Unable to load news page content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const db = await getDatabase();
    const payload = { ...(body as Record<string, unknown>), id: DOC_ID };
    const payloadObj = payload as Record<string, unknown>;
    delete payloadObj["_id"];
    await db.collection(COLLECTION).updateOne(
      { id: DOC_ID },
      { $set: payload },
      { upsert: true },
    );
    revalidatePath("/en/news");
    revalidatePath("/km/news");
    return NextResponse.json({ data: payload });
  } catch {
    return NextResponse.json({ error: "Unable to save news page content" }, { status: 500 });
  }
}
