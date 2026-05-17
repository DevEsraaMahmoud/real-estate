"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePropertyBag } from "@/context/property-bag";
import { properties } from "@/data/properties";
import { formatCurrency } from "@/lib/format";
import { Link } from "@/i18n/navigation";
import type { Property } from "@/types/property";

export function CompareView() {
  const t = useTranslations("Compare");
  const tl = useTranslations("Listings");
  const tc = useTranslations("Common");
  const locale = useLocale() as "en" | "ar";
  const { compareIds, toggleCompare } = usePropertyBag();

  const items: Property[] = compareIds
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean) as Property[];

  const typeLabel = (p: Property) =>
    tl(
      (
        {
          apartment: "typeApartment",
          villa: "typeVilla",
          penthouse: "typePenthouse",
          commercial: "typeCommercial",
          shop: "typeShop",
          office: "typeOffice",
        } as const
      )[p.type],
    );

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
        <p className="text-xs text-muted-foreground">{t("emptyHint")}</p>
        <Button asChild>
          <Link href="/listings">{tc("listings")}</Link>
        </Button>
      </div>
    );
  }

  const fields: { label: string; render: (p: Property) => string }[] = [
    { label: t("fieldType"), render: (p) => typeLabel(p) },
    {
      label: t("fieldPrice"),
      render: (p) => formatCurrency(p.price, locale, p.currency),
    },
    {
      label: t("fieldLocation"),
      render: (p) => `${p.city[locale]}, ${p.country[locale]}`,
    },
    {
      label: t("fieldBeds"),
      render: (p) => String(p.bedrooms),
    },
    {
      label: t("fieldBaths"),
      render: (p) => String(p.bathrooms),
    },
    {
      label: t("fieldArea"),
      render: (p) =>
        `${p.areaSqm.toLocaleString(locale === "ar" ? "ar-EG" : "en-EG")} ${tc("sqm")}`,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((p) => (
          <Card key={p.id} className="glass-panel border-white/10">
            <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
              <div>
                <CardTitle className="text-base leading-snug">
                  {p.title[locale]}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {p.neighborhood[locale]}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleCompare(p.id)}
              >
                {t("remove")}
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {fields.map((f) => (
                <div key={f.label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="text-end font-medium">{f.render(p)}</span>
                </div>
              ))}
              <Separator className="my-3" />
              <Button asChild className="w-full" variant="secondary">
                <Link href={`/properties/${p.slug}`}>{tc("viewDetails")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
