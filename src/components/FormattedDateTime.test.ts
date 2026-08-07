import { describe, expect, it } from "vitest";
import { formatDateTime } from "./FormattedDateTime";

const isoInstant = "2027-02-06T14:05:00Z";
const timezone = "Europe/Helsinki"; // UTC+2 in February, so 14:05Z -> 16:05 local

describe("formatDateTime", () => {
  it("renders YYYY-MM-DD HH:MM for the en locale", () => {
    expect(formatDateTime(isoInstant, "en", timezone)).toBe("2027-02-06 16:05");
  });

  it("renders D.M.YYYY HH:MM for the fi locale", () => {
    expect(formatDateTime(isoInstant, "fi", timezone)).toBe("6.2.2027 16:05");
  });

  it("renders identically to fi for the sv locale", () => {
    expect(formatDateTime(isoInstant, "sv", timezone)).toBe(
      formatDateTime(isoInstant, "fi", timezone),
    );
  });

  it("prefixes an abbreviated weekday name when includeWeekday is set", () => {
    expect(formatDateTime(isoInstant, "en", timezone, true)).toBe(
      "Sat 2027-02-06 16:05",
    );
    expect(formatDateTime(isoInstant, "fi", timezone, true)).toBe(
      "la 6.2.2027 16:05",
    );
    expect(formatDateTime(isoInstant, "sv", timezone, true)).toBe(
      "lör 6.2.2027 16:05",
    );
  });

  it("falls back to en for any locale other than fi/sv", () => {
    const en = formatDateTime(isoInstant, "en", timezone);
    expect(formatDateTime(isoInstant, "en-US", timezone)).toBe(en);
    expect(formatDateTime(isoInstant, "en-ZA", timezone)).toBe(en);
    expect(formatDateTime(isoInstant, "de", timezone)).toBe(en);
  });
});
