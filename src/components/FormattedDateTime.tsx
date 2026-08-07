import { Temporal } from "@js-temporal/polyfill";
import { toZonedDateTime, defaultTimezone } from "../helpers/temporal";

type DateTimeValue = Date | Temporal.Instant | Temporal.ZonedDateTime | string;

export const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "short",
};

const DATE_COMPONENT_KEYS: (keyof Intl.DateTimeFormatOptions)[] = [
  "dateStyle",
  "weekday",
  "era",
  "year",
  "month",
  "day",
];

const TIME_COMPONENT_KEYS: (keyof Intl.DateTimeFormatOptions)[] = [
  "timeStyle",
  "hour",
  "minute",
  "second",
  "fractionalSecondDigits",
  "hour12",
  "hourCycle",
  "timeZoneName",
];

function hasAnyOption(
  options: Intl.DateTimeFormatOptions,
  keys: readonly (keyof Intl.DateTimeFormatOptions)[],
): boolean {
  return keys.some((key) => options[key] !== undefined);
}

function pickOptions(
  options: Intl.DateTimeFormatOptions,
  keys: readonly (keyof Intl.DateTimeFormatOptions)[],
): Intl.DateTimeFormatOptions {
  const picked: Intl.DateTimeFormatOptions = {};
  for (const key of keys) {
    const value = options[key];
    if (value !== undefined) {
      Object.assign(picked, { [key]: value });
    }
  }
  return picked;
}

/// Convert a timestamp (wire format ISO 8601, Date, Instant or ZonedDateTime)
/// into a human-readable, locale-formatted string.
///
/// The `en` locale renders its date component as ISO 8601 (2027-02-06)
/// rather than the ambiguous M/D/YYYY format `Intl` would otherwise produce
/// for it; any time component is still formatted per `options`/`locale`.
export function formatDateTime(
  value: DateTimeValue,
  locale: string,
  options: Intl.DateTimeFormatOptions = defaultDateTimeOptions,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string {
  const zdt = toZonedDateTime(value, timezone);

  if (
    locale.toLowerCase().startsWith("en") &&
    hasAnyOption(options, DATE_COMPONENT_KEYS)
  ) {
    const isoDate = zdt.toPlainDate().toString();
    if (!hasAnyOption(options, TIME_COMPONENT_KEYS)) {
      return isoDate;
    }
    const time = zdt.toLocaleString(
      locale,
      pickOptions(options, TIME_COMPONENT_KEYS),
    );
    return `${isoDate}, ${time}`;
  }

  return zdt.toLocaleString(locale, options);
}

interface Props {
  locale: string;
  value: DateTimeValue | null | undefined;
  /// IANA timezone used to interpret `value` when it has no inherent
  /// timezone (ie. is a `Date`, `Instant` or ISO 8601 string).
  timezone?: Temporal.TimeZoneLike;
  options?: Intl.DateTimeFormatOptions;
}

export function FormattedDateTime({
  value,
  locale,
  timezone = defaultTimezone,
  options = defaultDateTimeOptions,
}: Props) {
  if (!value) {
    return null;
  }

  const zdt = toZonedDateTime(value, timezone);
  const formatted = formatDateTime(value, locale, options, timezone);

  return <time dateTime={zdt.toString()}>{formatted}</time>;
}
