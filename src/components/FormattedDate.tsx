import { Temporal } from "@js-temporal/polyfill";
import {
  toPlainDate,
  defaultTimezone,
  formatPlainDate,
} from "../helpers/temporal";

export function formatDate(date: Temporal.PlainDate, locale: string): string {
  return formatPlainDate(date, locale);
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
