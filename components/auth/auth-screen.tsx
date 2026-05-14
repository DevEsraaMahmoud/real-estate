"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthScreen() {
  const t = useTranslations("Auth");

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-16 sm:px-0">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-base">{t("continue")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" type="password" autoComplete="current-password" />
          </div>
          <Button className="w-full" type="button">
            {t("continue")}
          </Button>
          <Button variant="link" className="h-auto px-0 text-xs" type="button">
            {t("forgot")}
          </Button>
          <div className="border-t border-white/10 pt-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
            {t("oauthDivider")}
          </div>
          <div className="grid gap-2">
            <Button variant="outline" type="button">
              {t("oauthGoogle")}
            </Button>
            <Button variant="outline" type="button">
              {t("oauthApple")}
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {t("signupPrompt")}{" "}
            <button type="button" className="text-primary underline-offset-4 hover:underline">
              {t("signupLink")}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
