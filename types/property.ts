export type PropertyType =
  | "apartment"
  | "villa"
  | "penthouse"
  | "commercial"
  | "shop"
  | "office";

export type Property = {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  city: { en: string; ar: string };
  neighborhood: { en: string; ar: string };
  country: { en: string; ar: string };
  price: number;
  currency: "EGP" | "USD";
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  type: PropertyType;
  tags: string[];
  images: string[];
  amenities: { en: string; ar: string }[];
  yearBuilt: number;
  parking: number;
  hoaMonthly: number;
  petPolicy: { en: string; ar: string };
  coordinates: { lat: number; lng: number };
  featured?: boolean;
  views?: number;
};
