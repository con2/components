import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vitest";
import {
  defaultTimezone,
  evening,
  formatDateRange,
  formatPlainDate,
  formatTimeOfDay,
  formatWeekdayAbbreviation,
  fromEvening,
  fromEveningNull,
  fromJustBeforeMidnight,
  fromJustBeforeMidnightNull,
  fromMorning,
  fromMorningNull,
  justBeforeMidnight,
  morning,
  toISODate,
  toISODateEmpty,
  toISODateNull,
  toPlainDate,
  toPlainDateNull,
  toZonedDateTime,
  toZonedDateTimeNull,
  uuid7ToInstant,
  uuid7ToZonedDateTime,
  zPlainDateNull,
} from "./temporal";

const otherTimezone = "Pacific/Kiritimati"; // UTC+14, far from Europe/Helsinki

describe("toZonedDateTime", () => {
  it("converts a string to a ZonedDateTime in the default timezone", () => {
    const zdt = toZonedDateTime("2025-11-23T10:00:00Z");
    expect(zdt.timeZoneId).toBe(defaultTimezone);
  });

  it("passes a ZonedDateTime through unchanged", () => {
    const input = Temporal.ZonedDateTime.from(
      "2025-11-23T10:00:00+02:00[Europe/Helsinki]",
    );
    expect(toZonedDateTime(input)).toBe(input);
  });

  it("converts a Date using the default timezone", () => {
    const date = new Date("2025-11-23T10:00:00Z");
    const zdt = toZonedDateTime(date);
    expect(zdt.timeZoneId).toBe(defaultTimezone);
    expect(zdt.toInstant().epochMilliseconds).toBe(date.getTime());
  });

  it("respects a custom timezone parameter", () => {
    const zdt = toZonedDateTime("2025-11-23T10:00:00Z", otherTimezone);
    const zdtDefault = toZonedDateTime("2025-11-23T10:00:00Z");
    expect(zdt.timeZoneId).toBe(otherTimezone);
    expect(zdt.hour).not.toBe(zdtDefault.hour);
  });
});

describe("toZonedDateTimeNull", () => {
  it("returns null for null", () => {
    expect(toZonedDateTimeNull(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(toZonedDateTimeNull(undefined)).toBeNull();
  });

  it("returns a ZonedDateTime for valid input", () => {
    const zdt = toZonedDateTimeNull("2025-11-23T10:00:00Z");
    expect(zdt).not.toBeNull();
    expect(zdt!.timeZoneId).toBe(defaultTimezone);
  });
});

describe("toPlainDate", () => {
  it("passes a PlainDate through unchanged", () => {
    const input = Temporal.PlainDate.from("2025-11-23");
    expect(toPlainDate(input)).toBe(input);
  });

  it("derives the date from a string using the default timezone", () => {
    expect(toPlainDate("2025-11-23T22:00:00Z").toString()).toBe("2025-11-24");
  });

  it("respects a custom timezone parameter", () => {
    // Same instant, but a far-east timezone should already be on the next day
    // while the default (Helsinki) timezone is not.
    const instant = "2025-11-23T10:00:00Z";
    const defaultDate = toPlainDate(instant);
    const otherDate = toPlainDate(instant, otherTimezone);
    expect(otherDate.toString()).not.toBe(defaultDate.toString());
  });
});

describe("toPlainDateNull", () => {
  it("returns null for null", () => {
    expect(toPlainDateNull(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(toPlainDateNull(undefined)).toBeNull();
  });

  it("returns a PlainDate for valid input", () => {
    // 10:00 UTC = 12:00 in Europe/Helsinki (UTC+2 in November), so this is
    // still the 23rd in the default timezone.
    expect(toPlainDateNull("2025-11-23T10:00:00Z")!.toString()).toBe(
      "2025-11-23",
    );
  });
});

describe("toISODate", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(toISODate("2025-11-23T10:00:00Z")).toBe("2025-11-23");
  });

  it("respects a custom timezone parameter", () => {
    const instant = "2025-11-23T10:00:00Z";
    expect(toISODate(instant, otherTimezone)).not.toBe(toISODate(instant));
  });
});

describe("toISODateNull", () => {
  it("returns null for null", () => {
    expect(toISODateNull(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(toISODateNull(undefined)).toBeNull();
  });

  it("returns an ISO date string for valid input", () => {
    expect(toISODateNull("2025-11-23T10:00:00Z")).toBe("2025-11-23");
  });
});

describe("toISODateEmpty", () => {
  it("returns an empty string for null", () => {
    expect(toISODateEmpty(null)).toBe("");
  });

  it("returns an empty string for undefined", () => {
    expect(toISODateEmpty(undefined)).toBe("");
  });

  it("returns an ISO date string for valid input", () => {
    expect(toISODateEmpty("2025-11-23T10:00:00Z")).toBe("2025-11-23");
  });
});

describe("fromMorning", () => {
  const date = Temporal.PlainDate.from("2025-11-23");

  it("returns a Date at 08:00 in the default timezone", () => {
    const result = fromMorning(date);
    const zdt = date.toZonedDateTime({
      timeZone: defaultTimezone,
      plainTime: morning,
    });
    expect(result.getTime()).toBe(zdt.toInstant().epochMilliseconds);
  });

  it("respects a custom timezone parameter", () => {
    const defaultResult = fromMorning(date);
    const otherResult = fromMorning(date, otherTimezone);
    expect(otherResult.getTime()).not.toBe(defaultResult.getTime());
  });
});

describe("fromMorningNull", () => {
  it("returns null for null", () => {
    expect(fromMorningNull(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(fromMorningNull(undefined)).toBeNull();
  });

  it("returns a Date for valid input", () => {
    const date = Temporal.PlainDate.from("2025-11-23");
    expect(fromMorningNull(date)).toEqual(fromMorning(date));
  });
});

describe("fromEvening", () => {
  const date = Temporal.PlainDate.from("2025-11-23");

  it("returns a Date at 20:00 in the default timezone", () => {
    const result = fromEvening(date);
    const zdt = date.toZonedDateTime({
      timeZone: defaultTimezone,
      plainTime: evening,
    });
    expect(result.getTime()).toBe(zdt.toInstant().epochMilliseconds);
  });

  it("respects a custom timezone parameter", () => {
    const defaultResult = fromEvening(date);
    const otherResult = fromEvening(date, otherTimezone);
    expect(otherResult.getTime()).not.toBe(defaultResult.getTime());
  });
});

describe("fromEveningNull", () => {
  it("returns null for null", () => {
    expect(fromEveningNull(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(fromEveningNull(undefined)).toBeNull();
  });

  it("returns a Date for valid input", () => {
    const date = Temporal.PlainDate.from("2025-11-23");
    expect(fromEveningNull(date)).toEqual(fromEvening(date));
  });
});

describe("fromJustBeforeMidnight", () => {
  const date = Temporal.PlainDate.from("2025-11-23");

  it("returns a Date at 23:59:59 in the default timezone", () => {
    const result = fromJustBeforeMidnight(date);
    const zdt = date.toZonedDateTime({
      timeZone: defaultTimezone,
      plainTime: justBeforeMidnight,
    });
    expect(result.getTime()).toBe(zdt.toInstant().epochMilliseconds);
  });

  it("respects a custom timezone parameter", () => {
    const defaultResult = fromJustBeforeMidnight(date);
    const otherResult = fromJustBeforeMidnight(date, otherTimezone);
    expect(otherResult.getTime()).not.toBe(defaultResult.getTime());
  });
});

describe("fromJustBeforeMidnightNull", () => {
  it("returns null for null", () => {
    expect(fromJustBeforeMidnightNull(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(fromJustBeforeMidnightNull(undefined)).toBeNull();
  });

  it("returns a Date for valid input", () => {
    const date = Temporal.PlainDate.from("2025-11-23");
    expect(fromJustBeforeMidnightNull(date)).toEqual(
      fromJustBeforeMidnight(date),
    );
  });
});

describe("uuid7ToInstant / uuid7ToZonedDateTime", () => {
  // A UUIDv7 whose first 48 bits encode a known Unix timestamp in ms.
  // 0x018f4d2c1000 = 1_700_000_000_000 ms
  const timestampMs = 1_700_000_000_000;
  const hex = timestampMs.toString(16).padStart(12, "0");
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}00-7000-8000-000000000000`;

  it("extracts the embedded instant", () => {
    const instant = uuid7ToInstant(uuid);
    expect(instant.epochMilliseconds).toBe(timestampMs);
  });

  it("converts to a ZonedDateTime in the default timezone", () => {
    const zdt = uuid7ToZonedDateTime(uuid);
    expect(zdt.timeZoneId).toBe(defaultTimezone);
    expect(zdt.toInstant().epochMilliseconds).toBe(timestampMs);
  });

  it("respects a custom timezone parameter", () => {
    const zdt = uuid7ToZonedDateTime(uuid, otherTimezone);
    expect(zdt.timeZoneId).toBe(otherTimezone);
  });
});

describe("zPlainDateNull", () => {
  it("parses a valid ISO date string", () => {
    const result = zPlainDateNull.parse("2025-11-23");
    expect(result).not.toBeNull();
    expect(result!.toString()).toBe("2025-11-23");
  });

  it("returns null for null", () => {
    expect(zPlainDateNull.parse(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(zPlainDateNull.parse(undefined)).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(zPlainDateNull.parse("")).toBeNull();
  });
});

describe("formatPlainDate", () => {
  const date = Temporal.PlainDate.from("2027-02-06");

  it("renders ISO 8601 for en", () => {
    expect(formatPlainDate(date, "en")).toBe("2027-02-06");
  });

  it("renders D.M.YYYY for fi and sv, identically", () => {
    expect(formatPlainDate(date, "fi")).toBe("6.2.2027");
    expect(formatPlainDate(date, "sv")).toBe(formatPlainDate(date, "fi"));
  });

  it("falls back to en for any other locale", () => {
    expect(formatPlainDate(date, "de")).toBe("2027-02-06");
  });
});

describe("formatTimeOfDay", () => {
  it("zero-pads both hour and minute", () => {
    expect(formatTimeOfDay({ hour: 9, minute: 5 })).toBe("09:05");
  });

  it("leaves already-two-digit values unpadded", () => {
    expect(formatTimeOfDay({ hour: 23, minute: 59 })).toBe("23:59");
  });
});

describe("formatWeekdayAbbreviation", () => {
  // 2026-01-05 through 2026-01-11 is a Monday-through-Sunday week.
  const week = Array.from({ length: 7 }, (_, i) =>
    Temporal.PlainDate.from("2026-01-05")
      .add({ days: i })
      .toZonedDateTime({ timeZone: defaultTimezone }),
  );

  it("maps all seven days for en", () => {
    expect(week.map((zdt) => formatWeekdayAbbreviation(zdt, "en"))).toEqual([
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]);
  });

  it("maps all seven days for fi", () => {
    expect(week.map((zdt) => formatWeekdayAbbreviation(zdt, "fi"))).toEqual([
      "ma",
      "ti",
      "ke",
      "to",
      "pe",
      "la",
      "su",
    ]);
  });

  it("maps all seven days for sv", () => {
    expect(week.map((zdt) => formatWeekdayAbbreviation(zdt, "sv"))).toEqual([
      "mån",
      "tis",
      "ons",
      "tors",
      "fre",
      "lör",
      "sön",
    ]);
  });

  it("falls back to en for any other locale", () => {
    const monday = week[0];
    expect(formatWeekdayAbbreviation(monday, "de")).toBe("Mon");
  });
});

describe("formatDateRange", () => {
  it("collapses a same-month fi range to D.–D.M.YYYY", () => {
    expect(formatDateRange("2026-06-02", "2026-06-05", "fi")).toBe(
      "2.–5.6.2026",
    );
  });

  it("collapses a same-year sv range identically to fi", () => {
    expect(formatDateRange("2024-04-28", "2024-05-03", "sv")).toBe(
      "28.4.–3.5.2024",
    );
  });

  it("does not collapse a fi range spanning different years", () => {
    expect(formatDateRange("2026-12-30", "2027-01-02", "fi")).toBe(
      "30.12.2026–2.1.2027",
    );
  });

  it("does not collapse an en range, and separates with a non-breaking space", () => {
    expect(formatDateRange("2026-08-01", "2026-08-03", "en")).toBe(
      "2026-08-01\u00a0\u2013\u00a02026-08-03",
    );
  });

  it("treats a regional variant like en-US as en", () => {
    expect(formatDateRange("2026-08-01", "2026-08-03", "en-US")).toBe(
      "2026-08-01\u00a0\u2013\u00a02026-08-03",
    );
  });

  it("renders a single-day range as one date", () => {
    expect(formatDateRange("2026-06-02", "2026-06-02", "fi")).toBe("2.6.2026");
  });

  it("renders whichever endpoint is present when the other is missing", () => {
    expect(formatDateRange("2026-06-02", null, "fi")).toBe("2.6.2026");
    expect(formatDateRange(undefined, "2026-06-05", "en")).toBe("2026-06-05");
  });

  it("renders nothing when both endpoints are missing", () => {
    expect(formatDateRange(null, null, "fi")).toBe("");
  });

  it("takes the calendar day of a Date in the given timezone", () => {
    // 22:30Z on 1 June is already 2 June in Helsinki (UTC+3), but still 1 June in UTC.
    const start = new Date("2026-06-01T22:30:00Z");
    const end = new Date("2026-06-05T12:00:00Z");
    expect(formatDateRange(start, end, "fi")).toBe("2.–5.6.2026");
    expect(formatDateRange(start, end, "fi", "UTC")).toBe("1.–5.6.2026");
  });
});
