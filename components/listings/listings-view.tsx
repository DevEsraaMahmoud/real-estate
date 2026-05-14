"use client";

import { LayoutGrid, List } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { properties } from "@/data/properties";
import type { Property, PropertyType } from "@/types/property";
import { cn } from "@/lib/utils";

const cityKey = ["all", "Cairo", "Giza", "Alexandria"] as const;

type CityFilter = (typeof cityKey)[number];

export function ListingsView() {
  const t = useTranslations("Listings");
  const tc = useTranslations("Common");
  const locale = useLocale() as "en" | "ar";
  const [price, setPrice] = useState<[number, number]>([500_000, 35_000_000]);
  const [city, setCity] = useState<CityFilter>("all");
  const [type, setType] = useState<"all" | PropertyType>("all");
  const [beds, setBeds] = useState<string>("any");
  const [sort, setSort] = useState<
    "newest" | "priceAsc" | "priceDesc" | "area"
  >("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    let list = [...properties];

    list = list.filter(
      (p) => p.price >= price[0] && p.price <= price[1],
    );

    if (city !== "all") {
      list = list.filter(
        (p) => p.city.en.toLowerCase() === city.toLowerCase(),
      );
    }

    if (type !== "all") {
      list = list.filter((p) => p.type === type);
    }

    if (beds !== "any") {
      const minBeds = Number.parseInt(beds, 10);
      list = list.filter((p) => p.bedrooms >= minBeds);
    }

    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (sort === "area") list.sort((a, b) => b.areaSqm - a.areaSqm);
    if (sort === "newest") list.sort((a, b) => b.yearBuilt - a.yearBuilt);

    return list;
  }, [price, city, type, beds, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const cityLabel = (c: CityFilter) => {
    if (c === "all") return tc("all");
    const map: Record<string, string> = {
      Cairo: "locationCairo",
      Giza: "locationGiza",
      Alexandria: "locationAlexandria",
    };
    return t(map[c]);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
      <aside className="glass-panel h-fit w-full shrink-0 rounded-2xl p-5 lg:sticky lg:top-24 lg:max-w-xs">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-tight">{tc("filters")}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => {
              setPrice([500_000, 35_000_000]);
              setCity("all");
              setType("all");
              setBeds("any");
              setPage(1);
            }}
          >
            {tc("clearFilters")}
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>{t("filterPrice")}</Label>
            <Slider
              min={300_000}
              max={50_000_000}
              step={250_000}
              value={price}
              onValueChange={(v) => setPrice(v as [number, number])}
            />
            <p className="text-xs text-muted-foreground">
              {tc("from")}{" "}
              {price[0].toLocaleString(locale === "ar" ? "ar-EG" : "en-EG")} —{" "}
              {tc("to")}{" "}
              {price[1].toLocaleString(locale === "ar" ? "ar-EG" : "en-EG")}
            </p>
          </div>
          <div className="space-y-2">
            <Label>{t("filterLocation")}</Label>
            <Select
              value={city}
              onValueChange={(v) => {
                setCity(v as CityFilter);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cityKey.map((c) => (
                  <SelectItem key={c} value={c}>
                    {cityLabel(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("filterType")}</Label>
            <Select
              value={type}
              onValueChange={(v) => {
                setType(v as typeof type);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tc("all")}</SelectItem>
                <SelectItem value="apartment">{t("typeApartment")}</SelectItem>
                <SelectItem value="villa">{t("typeVilla")}</SelectItem>
                <SelectItem value="penthouse">{t("typePenthouse")}</SelectItem>
                <SelectItem value="shop">{t("typeShop")}</SelectItem>
                <SelectItem value="office">{t("typeOffice")}</SelectItem>
                <SelectItem value="commercial">{t("typeCommercial")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("filterBeds")}</Label>
            <Select
              value={beds}
              onValueChange={(v) => {
                setBeds(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{tc("all")}</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="6">6+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>

      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t("subtitle")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("resultsCount", { count: total })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={sort}
              onValueChange={(v) => setSort(v as typeof sort)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("sortNewest")}</SelectItem>
                <SelectItem value="priceAsc">{t("sortPriceAsc")}</SelectItem>
                <SelectItem value="priceDesc">{t("sortPriceDesc")}</SelectItem>
                <SelectItem value="area">{t("sortArea")}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
              <Button
                type="button"
                size="icon"
                variant={layout === "grid" ? "secondary" : "ghost"}
                className="h-9 w-9 rounded-lg"
                onClick={() => setLayout("grid")}
                aria-label={tc("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant={layout === "list" ? "secondary" : "ghost"}
                className="h-9 w-9 rounded-lg"
                onClick={() => setLayout("list")}
                aria-label={tc("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {total === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center text-sm text-muted-foreground">
            {tc("noResults")}
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-6",
              layout === "grid"
                ? "md:grid-cols-2"
                : "grid-cols-1",
            )}
          >
            {current.map((p: Property) => (
              <PropertyCard key={p.id} property={p} layout={layout} />
            ))}
          </div>
        )}

        {total > pageSize ? (
          <div className="flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              {t("paginationSummary", {
                start: (page - 1) * pageSize + 1,
                end: Math.min(page * pageSize, total),
                total,
              })}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {tc("previous")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
              >
                {tc("next")}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
