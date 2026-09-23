import type { Locale } from "@/lib/i18n";
import { toKhmerNumerals } from "@/lib/i18n";

const khmerMonths = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];

const enMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(isoDate: string, locale: Locale): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (locale === "km") {
    return `${toKhmerNumerals(day)} ${khmerMonths[monthIndex]} ${toKhmerNumerals(year)}`;
  }
  return `${enMonths[monthIndex]} ${day}, ${year}`;
}

export function formatDateShort(isoDate: string, locale: Locale): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const day = date.getDate();
  const monthIndex = date.getMonth();

  if (locale === "km") {
    return `${toKhmerNumerals(day)} ${khmerMonths[monthIndex]}`;
  }
  return `${enMonths[monthIndex].slice(0, 3)} ${day}`;
}

export function formatMonthShort(isoDate: string, locale: Locale): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const monthIndex = date.getMonth();
  if (locale === "km") {
    return khmerMonths[monthIndex].slice(0, 3);
  }
  return enMonths[monthIndex].slice(0, 3);
}

export function formatDay(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return toKhmerNumerals(date.getDate());
}

export function formatNumber(value: number, locale: Locale): string {
  if (locale === "km") return toKhmerNumerals(value);
  return value.toLocaleString("en-US");
}

export function formatScore(value: number, locale: Locale): string {
  if (locale === "km") {
    return toKhmerNumerals(value.toFixed(1));
  }
  return value.toFixed(1);
}

export function isUpcoming(isoDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(isoDate).getTime() >= today.getTime();
}