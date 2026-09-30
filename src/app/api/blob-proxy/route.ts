import { NextResponse } from "next/server";
import { getBlobToken } from "@/lib/server/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  let blobUrl: URL;
  try {
    blobUrl = new URL(rawUrl);
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  // Security check: only proxy requests to vercel-storage.com domains
  if (!blobUrl.hostname.endsWith(".vercel-storage.com")) {
    return new NextResponse("Forbidden domain", { status: 403 });
  }

  const token = getBlobToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(blobUrl.toString(), {
      headers,
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return new NextResponse(`Blob fetch failed with status ${response.status}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const cacheControl = response.headers.get("cache-control") || "public, max-age=31536000, immutable";
    const body = response.body;

    return new NextResponse(body as any, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (error: any) {
    console.error("Error proxying Vercel Blob image:", error);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
