import { describe, expect, it } from "vitest";
import {
  cssNamedColors,
  makeBadgeBackgroundColor,
  makeColorTranslucent,
} from "./colors";

describe("makeColorTranslucent", () => {
  it("wraps the color in a color-mix with 85% transparency", () => {
    expect(makeColorTranslucent("red")).toBe(
      "color-mix(in srgb, red, transparent 85%)",
    );
  });

  it("works with any color string, e.g. a hex value", () => {
    expect(makeColorTranslucent("#ff0000")).toBe(
      "color-mix(in srgb, #ff0000, transparent 85%)",
    );
  });
});

describe("makeBadgeBackgroundColor", () => {
  it("wraps the color in a color-mix with the bootstrap secondary variable", () => {
    expect(makeBadgeBackgroundColor("red")).toBe(
      "color-mix(in srgb, red, var(--bs-secondary) 50%)",
    );
  });

  it("works with any color string, e.g. a hex value", () => {
    expect(makeBadgeBackgroundColor("#00ff00")).toBe(
      "color-mix(in srgb, #00ff00, var(--bs-secondary) 50%)",
    );
  });
});

describe("cssNamedColors", () => {
  it("is a non-empty array of unique color name strings", () => {
    expect(Array.isArray(cssNamedColors)).toBe(true);
    expect(cssNamedColors.length).toBeGreaterThan(0);
    expect(new Set(cssNamedColors).size).toBe(cssNamedColors.length);
  });

  it("includes well-known CSS color names", () => {
    expect(cssNamedColors).toContain("Red");
    expect(cssNamedColors).toContain("Black");
    expect(cssNamedColors).toContain("White");
  });
});
