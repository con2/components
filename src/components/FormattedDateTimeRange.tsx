import { Temporal } from "@js-temporal/polyfill";
import { toZonedDateTime, defaultTimezone } from "../helpers/temporal";
import { formatDateTime } from "./FormattedDateTime";

type DateTimeValue = Date | Temporal.Instant | Temporal.ZonedDateTime | string;

const defaultOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "short",
};

export function isSameDay(
  start: DateTimeValue,
  end: DateTimeValue,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): boolean {
  const startDay = toZonedDateTime(start, timezone).toPlainDate();
  const endDay = toZonedDateTime(end, timezone).toPlainDate();
  return startDay.equals(endDay);
}

export function formatDurationMinutes(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours} h ${minutes} min` : `${hours} h`;
  }
  return `${minutes} min`;
}

export function formatDuration(
  start: DateTimeValue,
  end: DateTimeValue,
  timezone: Temporal.TimeZoneLike = defaultTimezone,
): string {
  const startDateTime = toZonedDateTime(start, timezone);
  const endDateTime = toZonedDateTime(end, timezone);
  const durationMinutes = startDateTime
    .until(endDateTime)
    .total({ unit: "minute" });

  return formatDurationMinutes(durationMinutes);
}

interface Props {
  locale: string;
  start: DateTimeValue | null | undefined;
  end: DateTimeValue | null | undefined;
  /// IANA timezone used to interpret `start`/`end` when they have no
  /// inherent timezone (ie. are a `Date`, `Instant` or ISO 8601 string).
  timezone?: Temporal.TimeZoneLike;
  includeDuration?: boolean;
  options?: Intl.DateTimeFormatOptions;
}

export function FormattedDateTimeRange({
  start,
  end,
  locale,
  timezone = defaultTimezone,
  options = defaultOptions,
  includeDuration = false,
}: Props) {
  const formattedStart = start
    ? formatDateTime(start, locale, options, timezone)
    : "";

  const endOptions = {
    ...options,
    dateStyle:
      start && end && isSameDay(start, end, timezone)
        ? undefined
        : options.dateStyle,
  };
  const formattedEnd = end
    ? formatDateTime(end, locale, endOptions, timezone)
    : "";

  const formattedDuration =
    start && end && includeDuration ? formatDuration(start, end, timezone) : "";

  const startIso = start
    ? toZonedDateTime(start, timezone).toString()
    : undefined;
  const endIso = end ? toZonedDateTime(end, timezone).toString() : undefined;

  return (
    <span>
      <time dateTime={startIso}>{formattedStart}</time>
      {" – "}
      <time dateTime={endIso}>{formattedEnd}</time>
      {formattedDuration && ` (${formattedDuration})`}
    </span>
  );
}
