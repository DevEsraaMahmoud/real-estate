import { describe, expect, it } from "vitest";

import { formatCurrency, formatNumber } from "./format";

describe("formatCurrency", () => {
  it("formats EGP for English locale", () => {
    const result = formatCurrency(1_250_000, "en");
    expect(result).toContain("1");
    expect(result).toMatch(/EGP|ج\.م\.|£/);
  });

  it("formats USD when requested", () => {
    const result = formatCurrency(500, "en", "USD");
    expect(result).toContain("500");
  });
});

describe("formatNumber", () => {
  it("formats integers for Arabic locale", () => {
    expect(formatNumber(1200, "ar")).toBeTruthy();
  });
});
