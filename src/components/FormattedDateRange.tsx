import { Fragment } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { dateRangeParts, defaultTimezone } from "../helpers/temporal";

interface Props {
  locale: string;
  start: Date | Temporal.PlainDate | string | null | undefined;
  end: Date | Temporal.PlainDate | string | null | undefined;
  /// IANA timezone used when `start` or `end` is a `Date`
  timezone?: Temporal.TimeZoneLike;
  /// pass React.Fragment to avoid wrapping in <time>
  /// useful eg. inside <option> elements
  as?: React.ElementType;
}

export function FormattedDateRange({
  locale,
  start,
  end,
  timezone = defaultTimezone,
  as: Component = "time",
}: Props) {
  const { parts, separator } = dateRangeParts(start, end, locale, timezone);
  if (parts.length === 0) return null;

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && separator}
          <Component dateTime={part.date.toString()}>{part.text}</Component>
        </Fragment>
      ))}
    </>
  );
}
