import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { deleteCollectionDocument, isCollectionName, updateCollectionDocument } from "@/lib/server/collections";
import { ContentValidationError, parseDocumentPayload } from "@/lib/server/content-validation";
import { hasMongoConfig } from "@/lib/server/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ collection: string; id: string }>;
};

async function update(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }

  const { collection, id } = await context.params;
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
    const data = await updateCollectionDocument(collection, id, parseDocumentPayload(body));
    if (!data) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to update the document" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  return update(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return update(request, context);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!hasMongoConfig()) {
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }

  const { collection, id } = await context.params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    const deleted = await deleteCollectionDocument(collection, id);
    if (!deleted) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete the document" }, { status: 500 });
  }
}
