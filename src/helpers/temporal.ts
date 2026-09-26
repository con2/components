import { Temporal } from "@js-temporal/polyfill";
import z from "zod";

/// Default IANA timezone used by these helpers when the caller does not
/// supply one explicitly.
export const defaultTimezone = "Europe/Helsinki";

export type DateTimeValue =
  Temporal.ZonedDateTime | Temporal.Instant | Date | string;

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
  value: DateTimeValue,
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
  datetime: DateTimeValue | null | undefined,
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

/// This library only ever renders fi/en/sv.
export function formatPlainDate(
  date: Temporal.PlainDate,
  locale: string,
): string {
  switch (locale) {
    case "fi":
    case "sv":
      return `${date.day}.${date.month}.${date.year}`;
    default:
      return date.toString();
  }
}

type DateRangeEndpoint = Date | Temporal.PlainDate | string | null | undefined;

export interface DateRangePart {
  date: Temporal.PlainDate;
  text: string;
}

/// A date range as one or two rendered dates, to be joined by `separator`.
/// fi/sv collapse the start date's shared month and year ("1.–3.5.2024");
/// other locales keep both dates whole and pad the dash with non-breaking
/// spaces so it doesn't get lost among the ISO dates' own hyphens.
export function dateRangeParts(
  start: DateRangeEndpoint,
  end: DateRangeEndpoint,
  locale: string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): { parts: DateRangePart[]; separator: string } {
  const startDay = start ? toPlainDate(start, timezone) : null;
  const endDay = end ? toPlainDate(end, timezone) : null;
  const whole = (date: Temporal.PlainDate) => ({
    date,
    text: formatPlainDate(date, locale),
  });

  const collapsible = locale === "fi" || locale === "sv";
  const separator = collapsible ? "\u2013" : "\u00a0\u2013\u00a0";

  if (!startDay || !endDay || startDay.equals(endDay)) {
    const single = startDay ?? endDay;
    return { parts: single ? [whole(single)] : [], separator };
  }

  if (!collapsible || startDay.year !== endDay.year) {
    return { parts: [whole(startDay), whole(endDay)], separator };
  }

  const startText =
    startDay.month === endDay.month
      ? `${startDay.day}.`
      : `${startDay.day}.${startDay.month}.`;
  return {
    parts: [{ date: startDay, text: startText }, whole(endDay)],
    separator,
  };
}

/// Plain-text `FormattedDateRange`, for contexts that can't render React
/// (eg. markdown). Empty when both endpoints are missing.
export function formatDateRange(
  start: DateRangeEndpoint,
  end: DateRangeEndpoint,
  locale: string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string {
  const { parts, separator } = dateRangeParts(start, end, locale, timezone);
  return parts.map((part) => part.text).join(separator);
}

/// No locale-dependent 12h clock in this library.
export function formatTimeOfDay(time: {
  hour: number;
  minute: number;
}): string {
  return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
}

/// `Temporal`'s `dayOfWeek` is 1 (Monday) through 7 (Sunday).
const weekdayAbbreviations: Record<string, string[]> = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  fi: ["ma", "ti", "ke", "to", "pe", "la", "su"],
  sv: ["mån", "tis", "ons", "tors", "fre", "lör", "sön"],
};

export function formatWeekdayAbbreviation(
  zdt: Temporal.ZonedDateTime,
  locale: string,
): string {
  return (weekdayAbbreviations[locale] ?? weekdayAbbreviations.en)[
    zdt.dayOfWeek - 1
  ];
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
