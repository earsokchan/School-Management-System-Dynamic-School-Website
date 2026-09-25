import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const adminCookieName = "hskth_admin_session";
const sessionDuration = 60 * 60 * 8;
const minimumSessionSecretLength = 32;

function getUsername(): string | undefined {
  return process.env.ADMIN_USERNAME?.trim() || undefined;
}

function getPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD?.trim() || undefined;
}

function getSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET?.trim() || undefined;
}

export function isAdminAuthConfigured(): boolean {
  const username = getUsername();
  const password = getPassword();
  const secret = getSecret();
  return Boolean(username && password && secret && secret.length >= minimumSessionSecretLength);
}

function createSignature(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function encodeSession(expiresAt: number, secret: string): string {
  const payload = Buffer.from(JSON.stringify({ expiresAt })).toString("base64url");
  return `${payload}.${createSignature(payload, secret)}`;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isValidCredentials(username?: string, password?: string): boolean {
  const expectedUsername = getUsername();
  const expectedPassword = getPassword();
  if (!username || !password || !expectedUsername || !expectedPassword) return false;
  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}

export function createAdminSession(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  return encodeSession(Date.now() + sessionDuration * 1000, secret);
}

export function isValidAdminSession(value: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !value) return false;
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  if (!payload || !signature || !safeEqual(signature, createSignature(payload, secret))) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      expiresAt?: number;
    };
    return typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminCookieName)?.value);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin authentication is not configured" },
      { status: 503 },
    );
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  return null;
}
