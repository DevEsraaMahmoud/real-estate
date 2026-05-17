import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { Skeleton } from "@/components/ui/skeleton";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-10">
      <Suspense
        fallback={
          <Skeleton className="mx-auto h-[520px] max-w-xl rounded-2xl" />
        }
      >
        <ContactForm />
      </Suspense>
    </div>
  );
}
