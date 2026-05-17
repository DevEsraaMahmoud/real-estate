import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/layout/site-chrome";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${base}/${locale}`;
  const title =
    locale === "ar"
      ? "مفاتيح النيل للعقارات — بيع وإيجار في مصر"
      : "Nile Key Realty — Egyptian Real Estate";
  const description =
    locale === "ar"
      ? "شقق، محلات، ووحدات إدارية في القاهرة الكبرى والإسكندرية — عرض تجريبي."
      : "Apartments, shops, and offices across Greater Cairo & Alexandria — demo.";

  return {
    metadataBase: new URL(base),
    title: {
      default: title,
      template: "%s · Nile Key",
    },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/en`,
        ar: `${base}/ar`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_EG",
      alternateLocale: locale === "ar" ? ["en_EG"] : ["ar_EG"],
      url,
      siteName: "Nile Key Realty",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const lang = locale;
  const fontClass =
    locale === "ar"
      ? `${notoArabic.variable} ${geistMono.variable} font-arabic`
      : `${geistSans.variable} ${geistMono.variable} font-sans`;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={`${fontClass} min-h-dvh bg-background text-foreground antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
