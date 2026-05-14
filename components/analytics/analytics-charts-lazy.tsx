"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Charts = dynamic(
  () =>
    import("./analytics-charts").then((mod) => ({
      default: mod.AnalyticsCharts,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-72 min-w-0 rounded-2xl" />
        ))}
      </div>
    ),
  },
);

export function AnalyticsChartsLazy() {
  return <Charts />;
}
