import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tn = await getTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/60 py-12 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">{tn("brand")}</p>
            <p className="text-sm text-muted-foreground">
              {t("rights", { year })}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t("explore")}</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-foreground" href="/listings">
                {t("linkListings")}
              </Link>
              <Link className="hover:text-foreground" href="/saved">
                {t("linkSaved")}
              </Link>
              <Link className="hover:text-foreground" href="/analytics">
                {t("linkAnalytics")}
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold">{t("company")}</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="hover:text-foreground">{t("careers")}</span>
              <span className="hover:text-foreground">{t("press")}</span>
              <span className="hover:text-foreground">{t("privacy")}</span>
              <span className="hover:text-foreground">{t("terms")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
