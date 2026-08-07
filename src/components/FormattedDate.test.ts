import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vitest";
import { formatDate } from "./FormattedDate";

describe("formatDate", () => {
  const date = Temporal.PlainDate.from("2027-02-06");

  it("renders ISO 8601 for the en locale", () => {
    expect(formatDate(date, "en")).toBe("2027-02-06");
  });

  it("falls back to en (ISO 8601) for any locale other than fi/sv", () => {
    expect(formatDate(date, "en-US")).toBe("2027-02-06");
    expect(formatDate(date, "en-ZA")).toBe("2027-02-06");
    expect(formatDate(date, "de")).toBe("2027-02-06");
  });

  it("renders D.M.YYYY for fi and sv, identically", () => {
    expect(formatDate(date, "fi")).toBe("6.2.2027");
    expect(formatDate(date, "sv")).toBe(formatDate(date, "fi"));
  });
});
