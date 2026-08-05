import { Temporal } from "@js-temporal/polyfill";
import { toZonedDateTime, defaultTimezone } from "../helpers/temporal";

type DateTimeValue = Date | Temporal.Instant | Temporal.ZonedDateTime | string;

export const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "short",
};

/// Convert a timestamp (wire format ISO 8601, Date, Instant or ZonedDateTime)
/// into a human-readable, locale-formatted string.
export function formatDateTime(
  value: DateTimeValue,
  locale: string,
  options: Intl.DateTimeFormatOptions = defaultDateTimeOptions,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string {
  return toZonedDateTime(value, timezone).toLocaleString(locale, options);
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
  const formatted = zdt.toLocaleString(locale, options);

  return <time dateTime={zdt.toString()}>{formatted}</time>;
}
