import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vitest";
import { formatDate } from "./FormattedDate";

describe("formatDate", () => {
  const date = Temporal.PlainDate.from("2027-02-06");

  it("renders ISO 8601 for the en locale, not the locale's native format", () => {
    expect(formatDate(date, "en")).toBe("2027-02-06");
  });

  it("renders ISO 8601 for regional en locale variants", () => {
    expect(formatDate(date, "en-US")).toBe("2027-02-06");
    expect(formatDate(date, "en-GB")).toBe("2027-02-06");
  });

  it("uses the locale's native format for non-en locales", () => {
    expect(formatDate(date, "fi")).toBe("6.2.2027");
  });
});
