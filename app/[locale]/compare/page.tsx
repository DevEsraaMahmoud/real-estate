import { setRequestLocale } from "next-intl/server";
import { CompareView } from "@/components/compare/compare-view";

type Props = { params: Promise<{ locale: string }> };

export default async function ComparePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CompareView />;
}
