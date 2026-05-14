"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePropertyBag } from "@/context/property-bag";
import { properties } from "@/data/properties";
import { Link } from "@/i18n/navigation";
import { PropertyCard } from "@/components/properties/property-card";

export function SavedView() {
  const t = useTranslations("Saved");
  const tc = useTranslations("Common");
  const { favorites } = usePropertyBag();
  const items = properties.filter((p) => favorites.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
        <p className="text-xs text-muted-foreground">{t("emptyHint")}</p>
        <Button asChild>
          <Link href="/listings">{tc("listings")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
