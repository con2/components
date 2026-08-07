import { Temporal } from "@js-temporal/polyfill";
import { toPlainDate, defaultTimezone } from "../helpers/temporal";

/// The `en` locale uses ISO 8601 (2027-02-06) rather than the ambiguous
/// M/D/YYYY format `Intl`/`Temporal` would otherwise produce for it.
export function formatDate(date: Temporal.PlainDate, locale: string): string {
  if (locale.toLowerCase().startsWith("en")) {
    return date.toString();
  }

  return date.toLocaleString(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

interface Props {
  locale: string;
  date: Date | Temporal.PlainDate | string | null | undefined;
  /// IANA timezone used when `date` is a `Date` (which has no inherent
  /// timezone). Ignored for `Temporal.PlainDate` and ISO date strings.
  timezone?: Temporal.TimeZoneLike;
  /// pass React.Fragment to avoid wrapping in <time>
  /// useful eg. inside <option> elements
  as?: React.ElementType;
}

export function FormattedDate({
  locale,
  date,
  timezone = defaultTimezone,
  as: Component = "time",
}: Props) {
  if (!date) return null;

  const plainDate = toPlainDate(date, timezone);

  return (
    <Component dateTime={plainDate.toString()}>
      {formatDate(plainDate, locale)}
    </Component>
  );
}
