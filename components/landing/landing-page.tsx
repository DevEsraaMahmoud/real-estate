"use client";

import {
  ArrowRight,
  Building2,
  CalendarClock,
  MapPin,
  Play,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { MotionSection } from "@/components/motion/motion-section";
import { FeaturedPropertiesCarousel } from "@/components/landing/featured-properties-carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFeaturedProperties } from "@/data/properties";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function LandingPage() {
  const t = useTranslations("Landing");
  const tc = useTranslations("Common");
  const tl = useTranslations("Listings");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const featured = useMemo(() => getFeaturedProperties(), []);
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("apartment");

  const liveChips = useMemo(
    () =>
      [
        t("live1"),
        t("live2"),
        t("live3"),
        t("live4"),
        t("live5"),
        t("live6"),
        t("live7"),
        t("live8"),
      ],
    [t],
  );

  const trust = useMemo(
    () => [
      { icon: ShieldCheck, label: t("trust1") },
      { icon: Zap, label: t("trust2") },
      { icon: Sparkles, label: t("trust3") },
    ],
    [t],
  );

  const statMotion = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.03, y: -4 },
        transition: { type: "spring" as const, stiffness: 400, damping: 22 },
      };

  return (
    <div className="flex flex-col gap-10 pb-16 pt-6 sm:gap-14 sm:pb-20 sm:pt-8 md:gap-20 lg:gap-24 lg:pb-24">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:flex-row lg:items-stretch lg:px-8">
        <div
          className={cn(
            "relative flex-1 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-950/95 via-emerald-950/40 to-amber-950/30 p-8 shadow-2xl sm:p-10 lg:p-12",
            "hero-live-glow",
          )}
        >
          {!reduceMotion ? (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-500/25 blur-3xl"
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.45, 0.25],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute end-1/4 top-1/3 h-40 w-40 rounded-full bg-yellow-200/10 blur-2xl"
                animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          ) : (
            <>
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-emerald-600/15 blur-3xl" />
            </>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative flex h-full flex-col gap-6"
          >
            <motion.div variants={item}>
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-50/95 shadow-sm backdrop-blur-md">
                <motion.span
                  animate={reduceMotion ? {} : { scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="h-3 w-3 fill-current" />
                </motion.span>
                {t("heroEyebrow")}
              </p>
            </motion.div>

            <motion.h1
              variants={item}
              className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              <span className="text-gradient">{t("heroTitle")}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-xl text-pretty text-base text-stone-200/90 sm:text-lg"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {trust.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-stone-200/90 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-amber-300" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.p
              variants={item}
              className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/90"
            >
              {t("pulseLine")}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-auto flex flex-wrap gap-3"
            >
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="rounded-xl px-6 shadow-lg shadow-amber-900/30"
                  asChild
                >
                  <Link href="/listings">
                    {t("heroCtaPrimary")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/25 bg-white/5 px-6 text-white hover:bg-white/12"
                  asChild
                >
                  <Link href="/analytics">{t("heroCtaSecondary")}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, x: locale === "ar" ? -24 : 24 }
          }
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="glass-panel flex w-full max-w-md flex-col gap-5 rounded-3xl p-6 shadow-xl ring-1 ring-amber-500/10 sm:p-7 lg:max-w-sm"
        >
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              {t("searchCardTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tc("filters")} · {tc("search")}
            </p>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground">
              {t("searchLocation")}
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tc("all")}</SelectItem>
                <SelectItem value="cairo">{tl("locationCairo")}</SelectItem>
                <SelectItem value="giza">{tl("locationGiza")}</SelectItem>
                <SelectItem value="alexandria">
                  {tl("locationAlexandria")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground">
              {t("searchType")}
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">{tl("typeApartment")}</SelectItem>
                <SelectItem value="villa">{tl("typeVilla")}</SelectItem>
                <SelectItem value="penthouse">{tl("typePenthouse")}</SelectItem>
                <SelectItem value="shop">{tl("typeShop")}</SelectItem>
                <SelectItem value="office">{tl("typeOffice")}</SelectItem>
                <SelectItem value="commercial">
                  {tl("typeCommercial")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground">
              {t("searchBudget")}
            </label>
            <Input
              placeholder={t("searchBudgetPlaceholder")}
              className="h-11 rounded-xl"
            />
          </div>
          <Button
            className="h-11 rounded-xl shadow-md transition hover:brightness-110"
            asChild
          >
            <Link href="/listings">{tc("search")}</Link>
          </Button>
        </motion.div>
      </section>

      <div className="border-y border-white/10 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent py-2 sm:py-2.5">
        {/* dir=ltr: marquee math uses translate(-50%); page RTL + reverse animation clipped wrong on some mobile browsers */}
        <div className="w-full overflow-hidden" dir="ltr">
          <div className="landing-marquee-track min-h-10 items-center">
            <div className="flex gap-8 pe-8">
              {liveChips.map((chip) => (
                <span
                  key={`a-${chip}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  {chip}
                </span>
              ))}
            </div>
            <div className="flex gap-8 pe-8" aria-hidden>
              {liveChips.map((chip) => (
                <span
                  key={`b-${chip}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MotionSection className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          {...statMotion}
          className="glass-panel flex flex-nowrap items-center justify-between gap-1 overflow-x-auto rounded-2xl border border-white/10 px-2 py-2 shadow-sm sm:gap-2 sm:px-4 sm:py-3"
        >
          {(
            [
              {
                icon: Building2,
                label: t("statsHomes"),
                value: 1280,
                suffix: null as string | null,
              },
              {
                icon: MapPin,
                label: t("statsCities"),
                value: 12,
                suffix: null,
              },
              {
                icon: CalendarClock,
                label: t("statsAvgClose"),
                value: 22,
                suffix: t("statsDaysSuffix"),
              },
              {
                icon: SmilePlus,
                label: t("statsNps"),
                value: 94,
                suffix: t("statsPercentSuffix"),
              },
            ] as const
          ).map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex min-w-[4.75rem] shrink-0 items-center gap-1.5 sm:min-w-0 sm:flex-1 sm:gap-2 sm:px-1",
                  idx > 0 && "border-s border-white/10 ps-2 sm:ps-3",
                )}
              >
                <Icon
                  className="h-3 w-3 shrink-0 text-amber-400/90 sm:h-3.5 sm:w-3.5"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-medium uppercase leading-tight tracking-wide text-muted-foreground sm:text-[10px]">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-baseline gap-0.5 whitespace-nowrap text-xs font-semibold tabular-nums text-foreground sm:text-sm">
                    <AnimatedCounter
                      value={stat.value}
                      duration={1.05 + idx * 0.05}
                    />
                    {stat.suffix ? (
                      <span className="text-[10px] font-normal text-muted-foreground sm:text-[11px]">
                        {stat.suffix}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-6xl space-y-4 px-4 sm:space-y-6 sm:px-6 md:space-y-8 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("featuredTitle")}
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              {t("featuredSubtitle")}
            </p>
          </div>
          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="outline" className="border-amber-500/25" asChild>
              <Link href="/listings">{tc("explore")}</Link>
            </Button>
          </motion.div>
        </motion.div>
        <FeaturedPropertiesCarousel items={featured} />
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={reduceMotion ? {} : { scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-r from-amber-500/15 via-emerald-900/25 to-amber-900/20 p-8 shadow-lg sm:p-10"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent"
            animate={reduceMotion ? { opacity: 0.25 } : { opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("ctaTitle")}
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                {t("ctaSubtitle")}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="rounded-xl px-6 shadow-md" asChild>
                <Link href="/admin">{t("ctaButton")}</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </MotionSection>
    </div>
  );
}
