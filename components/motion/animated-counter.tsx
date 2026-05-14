"use client";

import { animate } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
};

export function AnimatedCounter({
  value,
  duration = 1.25,
}: AnimatedCounterProps) {
  const locale = useLocale();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const ctrl = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [duration, value]);

  return (
    <span>
      {display.toLocaleString(locale === "ar" ? "ar-EG" : "en-EG")}
    </span>
  );
}
