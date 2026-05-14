import { setRequestLocale } from "next-intl/server";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminDashboard />;
}
