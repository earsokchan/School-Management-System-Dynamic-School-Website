import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { ImageUploadError, uploadImage } from "@/lib/server/blob";
import { hasBlobConfig } from "@/lib/server/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "An image file is required" }, { status: 400 });
    }
    const folderValue = formData.get("folder");
    const folder = typeof folderValue === "string" ? folderValue : "images";
    const result = await uploadImage(file, folder);
    return NextResponse.json({
      data: {
        url: result.url,
        pathname: result.pathname,
        contentType: file.type || "image/jpeg",
        size: file.size,
      },
    });
  } catch (error: any) {
    console.error("Image upload API error:", error);
    if (error instanceof ImageUploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: error?.message || "Unable to upload the image" },
      { status: 500 }
    );
  }
}
