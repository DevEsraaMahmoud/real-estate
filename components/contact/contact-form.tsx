"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPropertyBySlug } from "@/data/properties";

export function ContactForm() {
  const t = useTranslations("Contact");
  const tc = useTranslations("Common");
  const locale = useLocale() as "en" | "ar";
  const search = useSearchParams();
  const slug = search.get("property");
  const preset = useMemo(() => (slug ? getPropertyBySlug(slug) : undefined), [slug]);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    toast.success(t("success"));
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest">{t("interest")}</Label>
              <Input
                id="interest"
                name="interest"
                defaultValue={preset?.title[locale] ?? ""}
                placeholder={preset?.title[locale] ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t("message")}</Label>
              <Textarea id="message" name="message" required />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "…" : tc("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
