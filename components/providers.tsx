"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
import { PropertyBagProvider } from "@/context/property-bag";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <PropertyBagProvider>
        {children}
        <Toaster richColors position="top-center" />
      </PropertyBagProvider>
    </ThemeProvider>
  );
}
