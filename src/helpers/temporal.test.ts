import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vitest";
import {
  defaultTimezone,
  evening,
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
