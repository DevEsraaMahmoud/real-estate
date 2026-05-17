"use client";

import { Bath, Bed, Maximize2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { usePropertyBag } from "@/context/property-bag";
import { properties } from "@/data/properties";
import { formatCurrency } from "@/lib/format";
import { Link } from "@/i18n/navigation";
import type { Property } from "@/types/property";

type PropertyDetailViewProps = {
  property: Property;
};

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const t = useTranslations("Property");
  const tc = useTranslations("Common");
  const tl = useTranslations("Listings");
  const locale = useLocale() as "en" | "ar";
  const { addRecent } = usePropertyBag();
  const [activeImage, setActiveImage] = useState(0);
  const [price, setPrice] = useState(property.price);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(5.75);
  const [termYears, setTermYears] = useState(30);

  useEffect(() => {
    addRecent(property.id);
  }, [addRecent, property.id]);

  const monthly = useMemo(() => {
    const principal = price * (1 - downPercent / 100);
    const r = rate / 100 / 12;
    const n = termYears * 12;
    if (r === 0) return principal / n;
    const payment =
      (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    return Number.isFinite(payment) ? payment : 0;
  }, [downPercent, price, rate, termYears]);

  const similar = useMemo(
    () =>
      properties
        .filter((p) => p.id !== property.id && p.city.en === property.city.en)
        .slice(0, 3),
    [property],
  );

  const typeLabel = tl(
    (
      {
        apartment: "typeApartment",
        villa: "typeVilla",
        penthouse: "typePenthouse",
        commercial: "typeCommercial",
        shop: "typeShop",
        office: "typeOffice",
      } as const
    )[property.type],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{typeLabel}</Badge>
            {property.featured ? (
              <Badge variant="default">{tc("featured")}</Badge>
            ) : null}
            <Badge variant="outline" className="gap-1">
              <ShieldCheck className="h-3 w-3" />
              {tc("verified")}
            </Badge>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {property.title[locale]}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {property.neighborhood[locale]} · {property.city[locale]} ·{" "}
            {property.country[locale]}
          </p>
        </div>
        <div className="glass-panel rounded-2xl px-5 py-4 text-end">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {tc("luxury")}
          </p>
          <p className="text-3xl font-semibold tracking-tight">
            {formatCurrency(property.price, locale, property.currency)}
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <Button asChild>
              <Link href={`/contact?property=${property.slug}`}>
                {t("contactAgent")}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/compare">{tc("compare")}</Link>
            </Button>
          </div>
          <p className="mt-2 max-w-xs text-xs text-muted-foreground">
            {t("compareHint")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="relative isolate aspect-[16/10] min-h-[14rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-muted shadow-2xl sm:min-h-[16rem]">
            <Image
              src={property.images[activeImage] ?? ""}
              alt={property.title[locale]}
              fill
              priority
              className="object-cover motion-safe:cursor-zoom-in"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 100vw, 66vw"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {property.images.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`relative block h-20 min-h-[5rem] w-28 min-w-[7rem] shrink-0 overflow-hidden rounded-xl border transition ${
                  idx === activeImage
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover motion-safe:cursor-zoom-in"
                  sizes="112px"
                />
              </button>
            ))}
          </div>
        </div>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>{t("factsTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <Bed className="h-4 w-4 text-sky-300" />
                <div>
                  <p className="text-xs text-muted-foreground">{tc("beds")}</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <Bath className="h-4 w-4 text-sky-300" />
                <div>
                  <p className="text-xs text-muted-foreground">{tc("baths")}</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <Maximize2 className="h-4 w-4 text-sky-300" />
                <div>
                  <p className="text-xs text-muted-foreground">{tc("sqm")}</p>
                  <p className="font-medium">
                    {property.areaSqm.toLocaleString(
                      locale === "ar" ? "ar-EG" : "en-EG",
                    )}
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between gap-2">
                <span>{t("yearBuilt")}</span>
                <span className="text-foreground">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>{t("parking")}</span>
                <span className="text-foreground">{property.parking}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>{t("hoa")}</span>
                <span className="text-foreground">
                  {formatCurrency(
                    property.hoaMonthly,
                    locale,
                    property.currency,
                  )}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span>{t("petPolicy")}</span>
                <span className="text-end text-foreground">
                  {property.petPolicy[locale]}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>{t("overview")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {property.description[locale]}
          </CardContent>
        </Card>
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>{t("amenities")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {property.amenities.map((a) => (
              <motion.div
                key={a.en}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm"
              >
                {a[locale]}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel overflow-hidden border-white/10">
        <CardHeader>
          <CardTitle>{t("map")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-slate-900 to-slate-950 text-sm text-muted-foreground">
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_55%)]" />
            <p className="relative">{t("mapPlaceholder")}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>{t("mortgage")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("mortgagePrice")}</Label>
              <Slider
                min={500_000}
                max={50_000_000}
                step={100_000}
                value={[price]}
                onValueChange={(v) => setPrice(v[0] ?? price)}
              />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(price, locale, property.currency)}
              </p>
            </div>
            <div className="space-y-2">
              <Label>{t("mortgageDown")}</Label>
              <Slider
                min={5}
                max={60}
                step={1}
                value={[downPercent]}
                onValueChange={(v) => setDownPercent(v[0] ?? downPercent)}
              />
              <p className="text-xs text-muted-foreground">{downPercent}%</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("mortgageRate")}</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("mortgageTerm")}</Label>
                <Input
                  type="number"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                />
              </div>
            </div>
            <Separator />
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                {t("mortgageMonthly")}
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {formatCurrency(Math.round(monthly), locale, property.currency)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>{t("agentCard")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{t("agentBio")}</p>
            <Button className="w-full" asChild>
              <Link href={`/contact?property=${property.slug}`}>
                {t("contactAgent")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("similar")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {similar.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
