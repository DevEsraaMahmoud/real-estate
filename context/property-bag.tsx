"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const FAVORITES_KEY = "luma:favorites";
const COMPARE_KEY = "luma:compare";
const RECENT_KEY = "luma:recent";
const LOCALE_KEY = "luma:locale";

type PropertyBagContextValue = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  recentIds: string[];
  addRecent: (id: string) => void;
  persistLocale: (locale: string) => void;
};

const PropertyBagContext = createContext<PropertyBagContextValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function PropertyBagProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      if (cancelled) return;
      setFavorites(readJson<string[]>(FAVORITES_KEY, []));
      setCompareIds(readJson<string[]>(COMPARE_KEY, []));
      setRecentIds(readJson<string[]>(RECENT_KEY, []));
      setHydrated(true);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
  }, [compareIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
  }, [recentIds, hydrated]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds],
  );

  const addRecent = useCallback((id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)];
      return next.slice(0, 8);
    });
  }, []);

  const persistLocale = useCallback((locale: string) => {
    try {
      window.localStorage.setItem(LOCALE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      compareIds,
      toggleCompare,
      isInCompare,
      recentIds,
      addRecent,
      persistLocale,
    }),
    [
      favorites,
      toggleFavorite,
      isFavorite,
      compareIds,
      toggleCompare,
      isInCompare,
      recentIds,
      addRecent,
      persistLocale,
    ],
  );

  return (
    <PropertyBagContext.Provider value={value}>
      {children}
    </PropertyBagContext.Provider>
  );
}

export function usePropertyBag() {
  const ctx = useContext(PropertyBagContext);
  if (!ctx) {
    throw new Error("usePropertyBag must be used within PropertyBagProvider");
  }
  return ctx;
}
