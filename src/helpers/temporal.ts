import { Temporal } from "@js-temporal/polyfill";
import z from "zod";

/// Default IANA timezone used by these helpers when the caller does not
/// supply one explicitly.
export const defaultTimezone = "Europe/Helsinki";

/// Parses a string that may be a full instant (with UTC offset/`Z`), a naive
/// local datetime (no offset), or a bare calendar date - in that order of
/// preference - since `Temporal.Instant.from` throws on the latter two, but
/// callers (eg. `FormattedDate`'s ISO date string, or a GraphQL `Date` scalar)
/// commonly hand us those instead of a full instant string.
function stringToZonedDateTime(
  value: string,
  timezone: Temporal.TimeZoneLike,
): Temporal.ZonedDateTime {
  try {
    return Temporal.Instant.from(value).toZonedDateTimeISO(timezone);
  } catch {
    // not a full instant string (no UTC offset) - fall through
  }
  try {
    return Temporal.PlainDateTime.from(value).toZonedDateTime(timezone);
  } catch {
    // not a naive local datetime either - fall through
  }
  return Temporal.PlainDate.from(value).toZonedDateTime({
    timeZone: timezone,
  });
}

export function toZonedDateTime(
  value: Temporal.ZonedDateTime | Temporal.Instant | Date | string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Temporal.ZonedDateTime {
  if (value instanceof Temporal.ZonedDateTime) {
    return value;
  }
  if (typeof value === "string") {
    return stringToZonedDateTime(value, timezone);
  }
  const instant =
    value instanceof Date
      ? Temporal.Instant.fromEpochMilliseconds(value.getTime())
      : value;
  return instant.toZonedDateTimeISO(timezone);
}

/// Null in, null out
export function toZonedDateTimeNull(
  datetime:
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Date
    | string
    | null
    | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Temporal.ZonedDateTime | null {
  if (!datetime) return null;
  return toZonedDateTime(datetime, timezone);
}

export function toPlainDate(
  date:
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Temporal.PlainDate
    | Date
    | string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Temporal.PlainDate {
  if (date instanceof Temporal.PlainDate) {
    return date;
  }
  return toZonedDateTime(date, timezone).toPlainDate();
}

/// Null in, null out
export function toPlainDateNull(
  date:
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Temporal.PlainDate
    | Date
    | string
    | null
    | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Temporal.PlainDate | null {
  if (!date) return null;
  return toPlainDate(date, timezone);
}

// 2025-11-23
export function toISODate(
  date:
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Temporal.PlainDate
    | Date
    | string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string {
  return toPlainDate(date, timezone).toString().slice(0, 10);
}

export function toISODateNull(
  date:
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Temporal.PlainDate
    | Date
    | string
    | null
    | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string | null {
  if (!date) return null;
  return toISODate(date, timezone);
}

export function toISODateEmpty(
  date:
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Temporal.PlainDate
    | Date
    | string
    | null
    | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string {
  if (!date) return "";
  return toISODate(date, timezone);
}

export const morning: Temporal.PlainTime = Temporal.PlainTime.from({
  hour: 8,
  minute: 0,
  second: 0,
});

export function fromMorning(
  date: Temporal.PlainDate,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Date {
  return new Date(
    date
      .toZonedDateTime({
        timeZone: timezone,
        plainTime: morning,
      })
      .toInstant().epochMilliseconds,
  );
}

export function fromMorningNull(
  date: Temporal.PlainDate | null | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Date | null {
  if (!date) return null;
  return fromMorning(date, timezone);
}

export const evening: Temporal.PlainTime = Temporal.PlainTime.from({
  hour: 20,
  minute: 0,
  second: 0,
});

export function fromEvening(
  date: Temporal.PlainDate,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Date {
  return new Date(
    date
      .toZonedDateTime({
        timeZone: timezone,
        plainTime: evening,
      })
      .toInstant().epochMilliseconds,
  );
}

export function fromEveningNull(
  date: Temporal.PlainDate | null | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Date | null {
  if (!date) return null;
  return fromEvening(date, timezone);
}

export const justBeforeMidnight: Temporal.PlainTime = Temporal.PlainTime.from({
  hour: 23,
  minute: 59,
  second: 59,
});

export function fromJustBeforeMidnight(
  date: Temporal.PlainDate,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Date {
  return new Date(
    date
      .toZonedDateTime({
        timeZone: timezone,
        plainTime: justBeforeMidnight,
      })
      .toInstant().epochMilliseconds,
  );
}

export function fromJustBeforeMidnightNull(
  date: Temporal.PlainDate | null | undefined,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Date | null {
  if (!date) return null;
  return fromJustBeforeMidnight(date, timezone);
}

export function uuid7ToInstant(uuid: string): Temporal.Instant {
  const parts = uuid.split("-");
  const highBitsHex = parts[0] + parts[1].slice(0, 4);
  const timestampInMilliseconds = parseInt(highBitsHex, 16);
  return Temporal.Instant.fromEpochMilliseconds(timestampInMilliseconds);
}

export function uuid7ToZonedDateTime(
  uuid: string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): Temporal.ZonedDateTime {
  return uuid7ToInstant(uuid).toZonedDateTimeISO(timezone);
}

export const zPlainDateNull = z
  .string()
  .nullable()
  .optional()
  .transform((val) => {
    if (!val) return null;
    return Temporal.PlainDate.from(val);
  });
