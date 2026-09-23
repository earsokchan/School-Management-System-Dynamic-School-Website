export type Locale = "en" | "km";

export type Localized = {
  en: string;
  km: string;
};

export const localeList: Locale[] = ["en", "km"];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "km";
}

export function pick<T extends Localized>(value: T, locale: Locale): string {
  return value[locale];
}

export const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

export function toKhmerNumerals(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => khmerDigits[Number(d)]);
}