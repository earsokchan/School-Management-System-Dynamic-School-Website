"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, GraduationCap } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations, type TFunction } from "@/lib/translations";
import { routePath, type RouteKey } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SchoolLogo } from "@/components/layout/SchoolLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

interface NavItem {
  route: RouteKey;
  label: string;
}

const routeKeys: RouteKey[] = [
  "home",
  "about",
  "academics",
  "students",
  "teachers",
  "news",
  "events",
  "gallery",
  "contact",
];

function buildNav(locale: Locale, t: TFunction): NavItem[] {
  const labelKeys: Record<RouteKey, string> = {
    home: "nav.them",
    about: "nav.about",
    academics: "nav.academics",
    students: "nav.students",
    teachers: "nav.teachers",
    news: "nav.news",
    events: "nav.events",
    gallery: "nav.gallery",
    contact: "nav.contact",
    results: "nav.results",
  };
  return routeKeys.map((route) => ({ route, label: t(labelKeys[route]) }));
}

export function Header({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);
  const pathname = usePathname();
  const nav = buildNav(locale, t);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Scroll detection logic removed for Apple-style fixed nav
  }, []);

  const primaryNav = nav.slice(0, 5);
  const secondaryNav = nav.slice(5);

  const isActive = (route: RouteKey) => {
    if (route === "home")
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === `/${locale}${routePath(route)}`;
  };

  const tabClass = (route: RouteKey) =>
    cn(
      "relative flex h-12 items-center px-3 text-xs tracking-wide transition-colors duration-200",
      locale === "km" && "text-[13px]",
      isActive(route)
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-foreground font-normal",
    );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "bg-background/70 backdrop-blur-xl border-b border-border/20",
      )}
    >
      {/* Utility bar removed for Apple-like minimalism */}
      {/* Main bar */}
      <div className="container-site flex h-12 items-center justify-between gap-4">
        <SchoolLogo locale={locale} href={`/${locale}`} />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.route}>
                <Link
                  href={`/${locale}${routePath(item.route)}`}
                  aria-current={isActive(item.route) ? "page" : undefined}
                  className={tabClass(item.route)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {secondaryNav.length > 0 ? (
              <li className="min-[1800px]:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-[68px] rounded-none px-3 text-sm font-semibold text-muted-foreground hover:text-foreground">
                      {t("nav.more")}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    {secondaryNav.map((item) => (
                      <DropdownMenuItem key={item.route} asChild>
                        <Link
                          href={`/${locale}${routePath(item.route)}`}
                          aria-current={isActive(item.route) ? "page" : undefined}
                          className={cn(
                            isActive(item.route) && "bg-accent font-semibold text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : null}

            {/* Extra links on very wide screens */}
            {secondaryNav.map((item) => (
              <li key={item.route} className="hidden min-[1800px]:block">
                <Link
                  href={`/${locale}${routePath(item.route)}`}
                  aria-current={isActive(item.route) ? "page" : undefined}
                  className={tabClass(item.route)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            onClick={() => setSearchOpen(true)}
            size="icon"
            variant="ghost"
            aria-label={t("header.search")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Search />
          </Button>

          <Button asChild className="hidden md:inline-flex rounded-md">
            <Link href={`/${locale}/results`}>
              <GraduationCap aria-hidden="true" />
              {t("nav.results")}
            </Link>
          </Button>

          <div className="xl:hidden">
            <LanguageSwitcher locale={locale} variant="header" />
          </div>
          <div className="hidden xl:block">
            <LanguageSwitcher locale={locale} variant="header" />
          </div>

          <Button
            type="button"
            onClick={() => setMobileOpen(true)}
            size="icon"
            variant="ghost"
            aria-label={t("header.openMenu")}
            className="text-foreground xl:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="14" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        nav={nav}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        locale={locale}
      />
    </header>
  );
}