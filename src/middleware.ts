import { NextResponse, type NextRequest } from "next/server";
import { localeList, type Locale } from "@/lib/i18n";

const LOCALE_COOKIE = "hskth_locale";
const ADMIN_COOKIE = "hskth_admin_session";

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (cookie === "en" || cookie === "km")) {
    return cookie;
  }
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  if (acceptLanguage.toLowerCase().includes("km")) {
    return "km";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = localeList.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/login" && !request.cookies.get(ADMIN_COOKIE)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (hasLocale) {
    const locale = pathname.split("/")[1] as Locale;
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
      response.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|images|.*\\..*).*)"],
};