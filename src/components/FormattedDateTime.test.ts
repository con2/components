import { describe, expect, it } from "vitest";
import { formatDateTime } from "./FormattedDateTime";

const isoInstant = "2027-02-06T14:05:00Z";
const timezone = "Europe/Helsinki";

describe("formatDateTime", () => {
  it("renders an ISO 8601 date + locale-formatted time for the en locale", () => {
    const formatted = formatDateTime(
      isoInstant,
      "en",
      { dateStyle: "medium", timeStyle: "short" },
      timezone,
    );
    expect(formatted).toBe("2027-02-06, 4:05 PM");
  });

  it("renders an ISO 8601 date + locale-formatted time for granular options", () => {
    const formatted = formatDateTime(
      isoInstant,
      "en",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hourCycle: "h23",
      },
      timezone,
    );
    expect(formatted).toBe("2027-02-06, 16:05");
  });

  it("renders only the ISO date when options carry no time component", () => {
    const formatted = formatDateTime(
      isoInstant,
      "en",
      { dateStyle: "medium" },
      timezone,
    );
    expect(formatted).toBe("2027-02-06");
  });

  it("uses the locale's native format for non-en locales", () => {
    const formatted = formatDateTime(
      isoInstant,
      "fi",
      { dateStyle: "medium", timeStyle: "short" },
      timezone,
    );
    expect(formatted).not.toContain("2027-02-06");
  });
});
