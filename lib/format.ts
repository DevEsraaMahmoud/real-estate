export function formatCurrency(
  value: number,
  locale: string,
  currency: "EGP" | "USD" = "EGP",
) {
  const numbering = locale === "ar" ? "ar-EG" : "en-EG";
  return new Intl.NumberFormat(numbering, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(
    value,
  );
}
