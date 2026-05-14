"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

type Props = {
  items: Property[];
  className?: string;
};

export function FeaturedPropertiesCarousel({ items, className }: Props) {
  const locale = useLocale();
  const tc = useTranslations("Common");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    direction: locale === "ar" ? "rtl" : "ltr",
  });
  const [selected, setSelected] = useState(0);
  const [pauseAutoplay, setPauseAutoplay] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (pauseAutoplay || !emblaApi || items.length < 2) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4200);
    return () => window.clearInterval(id);
  }, [emblaApi, items.length, pauseAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPauseAutoplay(true)}
      onMouseLeave={() => setPauseAutoplay(false)}
    >
      <div
        className="min-h-[17.5rem] overflow-hidden rounded-2xl sm:min-h-[19rem]"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y items-stretch gap-3 sm:gap-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex min-h-[17.5rem] min-w-0 shrink-0 grow-0 basis-[min(100%,min(92vw,22rem))] sm:min-h-[19rem] sm:basis-[min(100%,24rem)] md:basis-[48%] lg:basis-[38%]"
            >
              <div className="flex min-h-0 w-full flex-1 flex-col">
                <PropertyCard property={p} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-11 w-11 rounded-full border-amber-500/30 bg-background/80 shadow-sm transition hover:scale-105 active:scale-95"
            onClick={scrollPrev}
            aria-label={tc("carouselPrevious")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-11 w-11 rounded-full border-amber-500/30 bg-background/80 shadow-sm transition hover:scale-105 active:scale-95"
            onClick={scrollNext}
            aria-label={tc("carouselNext")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div
          className="flex gap-1.5"
          role="tablist"
          aria-label={tc("carouselDots")}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selected
                  ? "w-8 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`${i + 1}`}
              aria-current={i === selected}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
