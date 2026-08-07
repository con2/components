import { Temporal } from "@js-temporal/polyfill";
import { toPlainDate, defaultTimezone } from "../helpers/temporal";
import { FormattedDate } from "./FormattedDate";

interface Props {
  locale: string;
  start: Date | Temporal.PlainDate | string | null | undefined;
  end: Date | Temporal.PlainDate | string | null | undefined;
  /// passed as-is to FormattedDate
  timezone?: Temporal.TimeZoneLike;
  /// passed as-is to FormattedDate
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
  if (!start && !end) {
    return null;
  } else if (start && !end) {
    return (
      <FormattedDate
        locale={locale}
        date={start}
        timezone={timezone}
        as={Component}
      />
    );
  } else if (!start && end) {
    return (
      <FormattedDate
        locale={locale}
        date={end}
        timezone={timezone}
        as={Component}
      />
    );
  }

  const startDay = toPlainDate(start!, timezone);
  const endDay = toPlainDate(end!, timezone);

  if (startDay.equals(endDay)) {
    return (
      <FormattedDate
        locale={locale}
        date={start}
        timezone={timezone}
        as={Component}
      />
    );
  }

  let collapsible: boolean;
  switch (locale) {
    case "fi":
    case "sv":
      collapsible = true;
      break;
    default:
      collapsible = false;
  }

  if (collapsible && startDay.year === endDay.year) {
    if (startDay.month === endDay.month) {
      // Same month and year: "1.–3.5.2024"
      return (
        <>
          <Component dateTime={startDay.toString()}>{startDay.day}.</Component>
          –
          <FormattedDate
            locale={locale}
            date={end}
            timezone={timezone}
            as={Component}
          />
        </>
      );
    } else {
      // Same year, different months: "28.4.–3.5.2024"
      return (
        <>
          <Component dateTime={startDay.toString()}>
            {startDay.day}.{startDay.month}.
          </Component>
          –
          <FormattedDate
            locale={locale}
            date={end}
            timezone={timezone}
            as={Component}
          />
        </>
      );
    }
  }

  return (
    <>
      <FormattedDate
        locale={locale}
        date={start}
        timezone={timezone}
        as={Component}
      />
      {collapsible ? "–" : "\u00a0\u2013\u00a0"}
      <FormattedDate
        locale={locale}
        date={end}
        timezone={timezone}
        as={Component}
      />
    </>
  );
}
