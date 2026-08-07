import { Temporal } from "@js-temporal/polyfill";
import {
  toZonedDateTime,
  defaultTimezone,
  formatPlainDate,
  formatTimeOfDay,
  formatWeekdayAbbreviation,
  type DateTimeValue,
} from "../helpers/temporal";

export function formatDateTime(
  value: DateTimeValue,
  locale: string,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
  includeWeekday: boolean = false,
): string {
  const zdt = toZonedDateTime(value, timezone);
  const date = formatPlainDate(zdt.toPlainDate(), locale);
  const time = formatTimeOfDay(zdt);
  const weekday = includeWeekday
    ? `${formatWeekdayAbbreviation(zdt, locale)} `
    : "";

  return `${weekday}${date} ${time}`;
}

interface Props {
  locale: string;
  value: DateTimeValue | null | undefined;
  /// IANA timezone used to interpret `value` when it has no inherent
  /// timezone (ie. is a `Date`, `Instant` or ISO 8601 string).
  timezone?: Temporal.TimeZoneLike;
  /// Prefix the formatted string with an abbreviated weekday name (eg. "Wed").
  includeWeekday?: boolean;
}

export function FormattedDateTime({
  value,
  locale,
  timezone = defaultTimezone,
  includeWeekday = false,
}: Props) {
  if (!value) {
    return null;
  }

  const zdt = toZonedDateTime(value, timezone);
  const formatted = formatDateTime(value, locale, timezone, includeWeekday);

  return <time dateTime={zdt.toString()}>{formatted}</time>;
}
