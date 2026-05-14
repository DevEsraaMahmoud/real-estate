import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PropertyDetailView } from "@/components/properties/property-detail-view";
import { getPropertyBySlug } from "@/data/properties";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const property = getPropertyBySlug(slug);
  if (!property) notFound();
  return <PropertyDetailView property={property} />;
}
