import { setRequestLocale } from "next-intl/server";
import { SavedView } from "@/components/saved/saved-view";

type Props = { params: Promise<{ locale: string }> };

export default async function SavedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SavedView />;
}
