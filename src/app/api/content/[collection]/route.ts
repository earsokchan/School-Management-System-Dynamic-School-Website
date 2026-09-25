import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { createCollectionDocument, isCollectionName, listCollection } from "@/lib/server/collections";
import { ContentValidationError, parseDocumentPayload } from "@/lib/server/content-validation";
import { hasMongoConfig } from "@/lib/server/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ collection: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }

  const { collection } = await context.params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    return NextResponse.json({ data: await listCollection(collection) });
  } catch {
    return NextResponse.json({ error: "Unable to read the collection" }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }

  const { collection } = await context.params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  try {
    const payload = parseDocumentPayload(body);
    return NextResponse.json({ data: await createCollectionDocument(collection, payload) }, { status: 201 });
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to create the document" }, { status: 500 });
  }
}
