"use client";

import { CheckCircle2, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties } from "@/data/properties";
import { formatCurrency } from "@/lib/format";

type RowStatus = "live" | "review" | "draft";

type Row = {
  id: string;
  title: string;
  owner: string;
  status: RowStatus;
  price: number;
  updated: string;
};

const seedRows: Row[] = properties.slice(0, 6).map((p, i) => ({
  id: p.id,
  title: p.title.en,
  owner: ["مفاتيح النيل", "بورتو مارين للتطوير", "بالم هيلز", "سوديك"][i % 4]!,
  status: (["live", "review", "draft"] as const)[i % 3]!,
  price: p.price,
  updated: `${(i % 9) + 1}d ago`,
}));

export function AdminDashboard() {
  const t = useTranslations("Admin");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const [rows, setRows] = useState(seedRows);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      rows.filter((r) =>
        r.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, rows],
  );

  const stats = useMemo(
    () => [
      { label: t("statRevenue"), value: formatCurrency(4_820_000, locale, "EGP") },
      { label: t("statListings"), value: "128" },
      { label: t("statPending"), value: "14" },
      { label: t("statLeads"), value: "326" },
    ],
    [locale, t],
  );

  const statusBadge = (status: RowStatus) => {
    if (status === "live")
      return (
        <Badge variant="default" className="bg-emerald-500/15 text-emerald-200">
          {t("statusLive")}
        </Badge>
      );
    if (status === "review")
      return (
        <Badge variant="secondary" className="bg-amber-500/15 text-amber-100">
          {t("statusReview")}
        </Badge>
      );
    return <Badge variant="outline">{t("statusDraft")}</Badge>;
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass-panel border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">{t("tabProperties")}</TabsTrigger>
          <TabsTrigger value="inquiries">{t("tabInquiries")}</TabsTrigger>
        </TabsList>
        <TabsContent value="properties" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="ps-10"
              />
            </div>
            <Button variant="outline">{tc("filters")}</Button>
          </div>
          <Card className="glass-panel overflow-hidden border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">{t("tableProperty")}</th>
                    <th className="px-4 py-3">{t("tableOwner")}</th>
                    <th className="px-4 py-3">{t("tableStatus")}</th>
                    <th className="px-4 py-3">{t("tablePrice")}</th>
                    <th className="px-4 py-3">{t("tableUpdated")}</th>
                    <th className="px-4 py-3 text-end">{t("tableActions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-white/5 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-medium">{row.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.owner}
                      </td>
                      <td className="px-4 py-3">{statusBadge(row.status)}</td>
                      <td className="px-4 py-3">
                        {formatCurrency(row.price, locale, "EGP")}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.updated}
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="inline-flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              setRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id ? { ...r, status: "live" } : r,
                                ),
                              )
                            }
                          >
                            {t("approve")}
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="inquiries" className="grid gap-4 md:grid-cols-2">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>{t("recentInquiries")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                <p className="font-medium text-foreground">Skyline Glass Penthouse</p>
                <p>Private tour · Next Tuesday</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                <p className="font-medium text-foreground">Marina Loft Residence</p>
                <p>Offer strategy call</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>{t("activityTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                <p>{t("activity1")}</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" />
                <p>{t("activity2")}</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-400" />
                <p>{t("activity3")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
