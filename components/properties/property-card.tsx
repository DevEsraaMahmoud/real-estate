"use client";

import { GitCompareArrows, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePropertyBag } from "@/context/property-bag";
import { formatCurrency } from "@/lib/format";
import { Link } from "@/i18n/navigation";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  property: Property;
  layout?: "grid" | "list";
};

export function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
  const t = useTranslations("Common");
  const tl = useTranslations("Listings");
  const locale = useLocale() as "en" | "ar";
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare } =
    usePropertyBag();
  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const title = property.title[locale];
  const city = property.city[locale];
  const neighborhood = property.neighborhood[locale];
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
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn("flex h-full min-h-0 flex-col", layout === "list" && "w-full")}
    >
      <Card
        className={cn(
          "group flex h-full min-h-0 flex-col overflow-hidden border-white/10 bg-white/5 shadow-xl backdrop-blur-xl transition-colors hover:border-white/20",
          layout === "list" && "sm:flex sm:flex-row",
        )}
      >
        <div
          className={cn(
            "relative isolate w-full shrink-0 overflow-hidden bg-muted",
            /* Mobile-first: explicit min height so Next/Image fill never gets a 0px box */
            "aspect-[16/11] min-h-[13.5rem] w-full max-sm:min-h-[14rem]",
            layout === "list" &&
              "sm:aspect-[unset] sm:h-56 sm:min-h-[14rem] sm:w-80 sm:max-w-[20rem]",
          )}
        >
          <Image
            src={property.images[0] ?? ""}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03] motion-safe:cursor-zoom-in"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute start-3 top-3 flex flex-wrap gap-2">
            {property.featured ? (
              <Badge variant="default">{t("featured")}</Badge>
            ) : null}
            <Badge variant="muted">{typeLabel}</Badge>
          </div>
          <div className="absolute end-3 top-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
              onClick={() => toggleFavorite(property.id)}
              aria-label={favorited ? t("saved") : t("save")}
            >
              <Heart
                className={cn("h-4 w-4", favorited && "fill-rose-400 text-rose-400")}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
              onClick={() => toggleCompare(property.id)}
              aria-label={t("compare")}
            >
              <GitCompareArrows
                className={cn("h-4 w-4", compared && "text-sky-300")}
              />
            </Button>
          </div>
          <div className="absolute bottom-3 start-3 end-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-white/80">{neighborhood}</p>
              <p className="text-lg font-semibold tracking-tight text-white">
                {title}
              </p>
            </div>
            <p className="rounded-lg bg-black/45 px-2 py-1 text-sm font-semibold text-white backdrop-blur-md">
              {formatCurrency(property.price, locale, property.currency)}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <CardContent className="space-y-3 pt-6">
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {property.bedrooms > 0 ? (
                <>
                  <span>
                    {property.bedrooms} {t("beds")}
                  </span>
                  <span aria-hidden>·</span>
                </>
              ) : (
                <>
                  <span className="font-medium text-amber-700/90 dark:text-amber-300/90">
                    {t("commercialSlot")}
                  </span>
                  <span aria-hidden>·</span>
                </>
              )}
              <span>
                {property.bathrooms} {t("baths")}
              </span>
              <span aria-hidden>·</span>
              <span>
                {property.areaSqm.toLocaleString(locale === "ar" ? "ar-EG" : "en-EG")}{" "}
                {t("sqm")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {city}, {property.country[locale]}
            </p>
            <div className="flex flex-wrap gap-2">
              {property.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag.replace("-", " ")}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="mt-auto justify-between gap-3 pb-6">
            <Button variant="ghost" asChild>
              <Link href={`/properties/${property.slug}`}>{t("viewDetails")}</Link>
            </Button>
            <Button asChild>
              <Link href={`/contact?property=${property.slug}`}>{t("contact")}</Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
