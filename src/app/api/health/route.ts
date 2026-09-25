import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/server/mongodb";
import { hasMongoConfig } from "@/lib/server/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!hasMongoConfig()) {
    return NextResponse.json({ ok: false, mongo: false }, { status: 503 });
  }

  try {
    await getMongoClient();
    return NextResponse.json({ ok: true, mongo: true });
  } catch {
    return NextResponse.json({ ok: false, mongo: false }, { status: 503 });
  }
}
