import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { ReactNode } from "react";

export async function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 mesh-bg opacity-90" />
      <Navbar />
      <main className="relative flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
