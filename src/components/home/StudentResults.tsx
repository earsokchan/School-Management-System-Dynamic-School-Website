"use client";

import { useMemo, useRef, useState } from "react";
import { Search, Info, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { toKhmerNumerals } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { academicYears, getStudentResults } from "@/data/results";
import { formatScore } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const YEARS: number[] = Array.from({ length: 40 }, (_, i) => 2040 - i);

export function StudentResults({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);
  const [year, setYear] = useState(academicYears[0]);
  const [evaluation, setEvaluation] = useState("1");
  const [studentId, setStudentId] = useState("");
  const [captchaResult, setCaptchaResult] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const inputRef = useRef<HTMLInputElement>(null);

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 8) + 3;
    const b = Math.floor(Math.random() * 7) + 2;
    return { a, b };
  }

  const rows = useMemo(
    () =>
      getStudentResults({
        academicYear: year,
        grade: "",
        className: "",
        query: studentId.trim(),
      }),
    [year, studentId],
  );

  const captchaValid =
    captchaResult.trim() !== "" &&
    String(captcha.a + captcha.b) === captchaResult.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (captchaValid) {
      setRevealed(true);
    } else {
      setRevealed(false);
      setCaptcha(generateCaptcha());
      setCaptchaResult("");
      inputRef.current?.focus();
    }
  };

  const columns = rows.length > 0 ? rows[0].subjects.map((s) => s.subject) : [];

  return (
    <section className="bg-primary pb-20 pt-10 text-primary-foreground sm:pb-28">
      <Container>
        <SectionHeading
          locale={locale}
          eyebrowKey="results.eyebrow"
          title={t("results.title")}
          description={t("results.description")}
          light
        />

        <Reveal className="mt-10">
          <div className="mb-5 flex items-center gap-3 rounded-md border border-gold/40 bg-gold/10 px-5 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold/20 text-gold">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t("results.systemName")}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("results.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label>{t("results.academicYear")}</Label>
                    <Select
                      value={year}
                      onValueChange={(value) => setYear(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((item) => (
                          <SelectItem key={item} value={`${item}-${item + 1}`}>
                            {locale === "km"
                              ? `ឆ្នាំសិក្សា ${toKhmerNumerals(item)}–${toKhmerNumerals(item + 1)}`
                              : `${item}–${item + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("results.evaluation")}</Label>
                    <Select value={evaluation} onValueChange={setEvaluation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((item) => (
                          <SelectItem key={item} value={`${item}`}>
                            {locale === "km"
                              ? `ការវាយតម្លៃលើកទី ${toKhmerNumerals(item)}`
                              : `Evaluation ${item}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <Label>{t("results.studentName")}</Label>
                    <Input
                      type="text"
                      value={studentId}
                      onChange={(event) => {
                        setStudentId(event.target.value);
                        setRevealed(false);
                      }}
                      placeholder={t("results.searchStudent")}
                    />
                  </div>
                </div>

                {/* Captcha */}
                <div className="flex flex-wrap items-end gap-3">
                  <div className="space-y-2">
                    <Label>{t("results.captcha")}</Label>
                    <span className="flex h-9 w-28 items-center justify-center rounded-md border bg-muted text-sm font-semibold text-foreground">
                      {locale === "km"
                        ? `${toKhmerNumerals(captcha.a)} + ${toKhmerNumerals(captcha.b)} =`
                        : `${captcha.a} + ${captcha.b} =`}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label className="sr-only">{t("results.captchaAnswer")}</Label>
                    <Input
                      ref={inputRef}
                      type="text"
                      inputMode="numeric"
                      value={captchaResult}
                      onChange={(event) => setCaptchaResult(event.target.value)}
                      placeholder="?"
                      aria-label={t("results.captchaAnswer")}
                      className={cn(
                        "w-24 text-center font-semibold",
                        captchaResult !== "" &&
                          !captchaValid &&
                          "border-destructive focus-visible:ring-destructive",
                      )}
                    />
                  </div>
                  <Button type="submit">
                    <Search aria-hidden="true" />
                    {t("results.search")}
                  </Button>
                </div>

                <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {t("results.demoNotice")}
                </p>
              </form>
            </CardContent>
          </Card>
        </Reveal>

        {revealed ? (
          <Reveal className="mt-8">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-[720px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("results.studentName")}</TableHead>
                        {columns.map((subject) => (
                          <TableHead key={subject.en} className="text-center">
                            {locale === "km" ? subject.km : subject.en}
                          </TableHead>
                        ))}
                        <TableHead className="bg-primary text-center text-primary-foreground">
                          {t("results.average")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="align-middle font-medium text-foreground">
                            <span className="block text-sm">
                              {locale === "km" ? row.name.km : row.name.en}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {locale === "km"
                                ? `ថ្នាក់ទី ${row.grade} ថ្នាក់ ${row.className} · អត្តលេខ ${row.id}`
                                : `Grade ${row.grade} · Class ${row.className} · ID ${row.id}`}
                            </span>
                          </TableCell>
                          {row.subjects.map((subject) => (
                            <TableCell
                              key={subject.subject.en}
                              className="text-center text-sm text-muted-foreground khmer-num"
                            >
                              {formatScore(subject.score, locale)}
                            </TableCell>
                          ))}
                          <TableCell className="bg-primary text-center text-sm font-semibold text-primary-foreground khmer-num">
                            {formatScore(row.average, locale)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {rows.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + 2}
                            className="py-10 text-center text-sm text-muted-foreground"
                          >
                            {t("results.noResults")}
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}