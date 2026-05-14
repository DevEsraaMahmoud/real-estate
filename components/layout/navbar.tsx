"use client";

import {
  Bell,
  ChevronDown,
  GitCompareArrows,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePropertyBag } from "@/context/property-bag";
import { properties } from "@/data/properties";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/listings", labelKey: "listings" as const },
  { href: "/saved", labelKey: "savedProperties" as const },
  { href: "/admin", labelKey: "admin" as const },
  { href: "/analytics", labelKey: "analytics" as const },
  { href: "/contact", labelKey: "contact" as const },
];

const iconBtnMobile =
  "h-11 w-11 shrink-0 touch-manipulation md:h-10 md:w-10";

function NavbarSearchBlock({
  query,
  setQuery,
  filtered,
  locale,
  suggestions,
  tn,
  t,
  variant,
  onResultNavigate,
}: {
  query: string;
  setQuery: (q: string) => void;
  filtered: Property[];
  locale: string;
  suggestions: string[];
  tn: ReturnType<typeof useTranslations<"Nav">>;
  t: ReturnType<typeof useTranslations<"Common">>;
  variant: "desktop" | "drawer";
  onResultNavigate?: () => void;
}) {
  const loc = locale as "en" | "ar";
  const open = query.trim().length > 0;

  return (
    <div className={cn(variant === "desktop" && "relative w-full")}>
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tn("searchPlaceholder")}
          className={cn(
            "rounded-xl border-white/10 bg-white/5 ps-10 shadow-inner",
            variant === "drawer" ? "h-12 text-base" : "h-11",
          )}
        />
      </div>
      {open ? (
        <div
          className={cn(
            "z-50 overflow-hidden rounded-xl border border-white/10 bg-popover/95 shadow-2xl backdrop-blur-xl",
            variant === "desktop" &&
              "absolute start-0 end-0 top-[calc(100%+8px)] max-h-72",
            variant === "drawer" && "mt-3 max-h-[min(50vh,22rem)]",
          )}
        >
          <div className="border-b border-white/5 px-3 py-2 text-xs text-muted-foreground">
            {tn("suggestionsTitle")}
          </div>
          <div
            className={cn(
              "overflow-y-auto py-1",
              variant === "desktop" && "max-h-60",
              variant === "drawer" && "max-h-[min(48vh,20rem)]",
            )}
          >
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-sm text-muted-foreground">
                {t("noResults")}
              </div>
            ) : (
              filtered.map((p) =>
                variant === "drawer" ? (
                  <SheetClose key={p.id} asChild>
                    <Link
                      href={`/properties/${p.slug}`}
                      className="flex min-h-[3rem] items-center gap-3 px-3 py-2 text-sm hover:bg-white/5"
                      onClick={() => {
                        setQuery("");
                        onResultNavigate?.();
                      }}
                    >
                      <div className="relative block h-10 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={p.images[0] ?? ""}
                          alt=""
                          width={56}
                          height={40}
                          className="h-full w-full object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="font-medium">{p.title[loc]}</span>
                        <span className="text-xs text-muted-foreground">
                          {p.city[loc]}
                        </span>
                      </div>
                    </Link>
                  </SheetClose>
                ) : (
                  <Link
                    key={p.id}
                    href={`/properties/${p.slug}`}
                    className="flex min-h-[3rem] items-center gap-3 px-3 py-2 text-sm hover:bg-white/5"
                    onClick={() => {
                      setQuery("");
                      onResultNavigate?.();
                    }}
                  >
                    <div className="relative block h-10 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={p.images[0] ?? ""}
                        alt=""
                        width={56}
                        height={40}
                        className="h-full w-full object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="font-medium">{p.title[loc]}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.city[loc]}
                      </span>
                    </div>
                  </Link>
                )
              )
            )}
          </div>
          <div className="border-t border-white/5 px-3 py-2 text-xs text-muted-foreground">
            {suggestions.join(" · ")}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const t = useTranslations("Common");
  const tn = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { compareIds, persistLocale } = usePropertyBag();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const suggestions = useMemo(
    () => [tn("suggestion1"), tn("suggestion2"), tn("suggestion3")],
    [tn],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return properties.filter((p) => {
      const title = p.title[locale as "en" | "ar"].toLowerCase();
      const city = p.city[locale as "en" | "ar"].toLowerCase();
      return title.includes(q) || city.includes(q);
    });
  }, [query, locale]);

  const switchLocale = (next: "en" | "ar") => {
    persistLocale(next);
    router.replace(pathname, { locale: next });
  };

  const themeIcon = !mounted ? (
    <Sun className="h-5 w-5" />
  ) : theme === "system" ? (
    resolvedTheme === "dark" ? (
      <Moon className="h-5 w-5" />
    ) : (
      <Sun className="h-5 w-5" />
    )
  ) : theme === "dark" ? (
    <Moon className="h-5 w-5" />
  ) : (
    <Sun className="h-5 w-5" />
  );

  const cycleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center gap-2 px-3 sm:h-[4.25rem] sm:gap-3 sm:px-6 lg:px-8",
          "min-h-[3.5rem] justify-between py-2 sm:min-h-0 sm:justify-start sm:py-0",
          "pt-[max(0.25rem,env(safe-area-inset-top))] sm:pt-0",
        )}
      >
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(iconBtnMobile, "md:hidden")}
                aria-label={t("openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={cn(
                "flex w-[min(100vw,22rem)] flex-col gap-0 border-white/10 p-0 sm:max-w-md",
                "max-h-[100dvh] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]",
              )}
            >
              <SheetHeader className="border-b border-white/10 space-y-1 px-4 pb-4 pt-3 text-start pe-12">
                <SheetTitle className="text-base font-semibold">{tn("brand")}</SheetTitle>
                <p className="text-xs text-muted-foreground">{tn("tagline")}</p>
              </SheetHeader>

              <div className="border-b border-white/10 px-4 py-4">
                <NavbarSearchBlock
                  query={query}
                  setQuery={setQuery}
                  filtered={filtered}
                  locale={locale}
                  suggestions={suggestions}
                  tn={tn}
                  t={t}
                  variant="drawer"
                  onResultNavigate={() => setMenuOpen(false)}
                />
              </div>

              <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-2 py-3">
                {nav.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Button
                      variant="ghost"
                      className="h-12 shrink-0 justify-start text-base font-normal"
                      asChild
                    >
                      <Link href={item.href}>{t(item.labelKey)}</Link>
                    </Button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="h-12 shrink-0 justify-start text-base font-normal"
                    asChild
                  >
                    <Link href="/compare">
                      {t("compare")}
                      {compareIds.length > 0 ? (
                        <span className="ms-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                          {compareIds.length}
                        </span>
                      ) : null}
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="h-12 shrink-0 justify-start text-base font-normal"
                    asChild
                  >
                    <Link href="/auth">{t("signIn")}</Link>
                  </Button>
                </SheetClose>
              </nav>

              <div className="mt-auto space-y-3 border-t border-white/10 bg-muted/20 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("language")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={locale === "en" ? "default" : "outline"}
                    className="h-11 touch-manipulation"
                    onClick={() => {
                      switchLocale("en");
                      setMenuOpen(false);
                    }}
                  >
                    {t("english")}
                  </Button>
                  <Button
                    type="button"
                    variant={locale === "ar" ? "default" : "outline"}
                    className="h-11 touch-manipulation"
                    onClick={() => {
                      switchLocale("ar");
                      setMenuOpen(false);
                    }}
                  >
                    {t("arabic")}
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full touch-manipulation gap-2"
                  onClick={() => cycleTheme()}
                >
                  {themeIcon}
                  {mounted && resolvedTheme === "dark"
                    ? t("themeLight")
                    : t("themeDark")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 rounded-xl py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-800 text-primary-foreground shadow-lg shadow-amber-900/40 sm:h-9 sm:w-9">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate text-sm font-semibold tracking-tight">
                {tn("brand")}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {tn("tagline")}
              </span>
            </div>
          </Link>
        </div>

        <div className="relative mx-auto hidden max-w-xl flex-1 md:block">
          <NavbarSearchBlock
            query={query}
            setQuery={setQuery}
            filtered={filtered}
            locale={locale}
            suggestions={suggestions}
            tn={tn}
            t={t}
            variant="desktop"
          />
        </div>

        <nav className="ms-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link
                href={item.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  pathname === item.href && "text-foreground",
                )}
              >
                {t(item.labelKey)}
              </Link>
            </Button>
          ))}
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <GitCompareArrows className="h-4 w-4" />
              <span className="hidden lg:inline">
                {tn("compareBadge", { count: compareIds.length })}
              </span>
            </Link>
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2 md:ms-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(iconBtnMobile, "relative md:hidden")}
            asChild
          >
            <Link href="/compare" aria-label={t("compare")}>
              <GitCompareArrows className="h-5 w-5" />
              {compareIds.length > 0 ? (
                <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {compareIds.length > 9 ? "9+" : compareIds.length}
                </span>
              ) : null}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={iconBtnMobile}
                aria-label={t("notifications")}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[min(100vw-2rem,20rem)]">
              <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="text-sm font-medium">{tn("notification1")}</span>
                <span className="text-xs text-muted-foreground">2m</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="text-sm font-medium">{tn("notification2")}</span>
                <span className="text-xs text-muted-foreground">1h</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="text-sm font-medium">{tn("notification3")}</span>
                <span className="text-xs text-muted-foreground">3h</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{tn("markAllRead")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                {locale === "ar" ? t("arabic") : t("english")}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => switchLocale("en")}>
                {t("english")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLocale("ar")}>
                {t("arabic")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className={iconBtnMobile}
            aria-label="theme"
            onClick={() => cycleTheme()}
          >
            {themeIcon}
          </Button>

          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/auth">{t("signIn")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
