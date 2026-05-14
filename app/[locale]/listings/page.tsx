import { setRequestLocale } from "next-intl/server";
import { ListingsView } from "@/components/listings/listings-view";

type Props = { params: Promise<{ locale: string }> };

export default async function ListingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ListingsView />;
}
