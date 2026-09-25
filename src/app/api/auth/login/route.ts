import { NextResponse } from "next/server";
import { createAdminSession, isAdminAuthConfigured, isValidCredentials } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Admin authentication is not configured" }, { status: 503 });
  }

  try {
    const body: unknown = await request.json();
    const username = typeof body === "object" && body !== null && "username" in body
      ? (body as { username?: unknown }).username
      : undefined;
    const password = typeof body === "object" && body !== null && "password" in body
      ? (body as { password?: unknown }).password
      : undefined;
      
    if (typeof username !== "string" || typeof password !== "string" || !isValidCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createAdminSession();
    if (!token) {
      return NextResponse.json({ error: "Unable to create a session" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("hskth_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
