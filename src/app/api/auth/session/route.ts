import { NextResponse } from "next/server";
import { hasAdminSession, isAdminAuthConfigured } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    configured: isAdminAuthConfigured(),
    authenticated: await hasAdminSession(),
  });
}
