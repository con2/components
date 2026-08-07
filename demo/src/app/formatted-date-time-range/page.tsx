import {
  FormattedDateTimeRange,
  isSameDay,
  formatDuration,
  formatDurationMinutes,
} from "@con2/components";

const sameDayStart = "2026-08-05T09:00:00Z";
const sameDayEnd = "2026-08-05T11:30:00Z";
const multiDayStart = "2026-08-05T20:00:00Z";
const multiDayEnd = "2026-08-06T06:00:00Z";

export default function FormattedDateTimeRangePage() {
  return (
    <div>
      <h1>FormattedDateTimeRange</h1>
      <p>
        Renders <code>start</code>–<code>end</code>; when both fall on the same
        day (per <code>isSameDay</code>), the end&apos;s date is omitted (only
        its time is shown). <code>includeDuration</code> appends a formatted
        duration in parentheses; <code>includeWeekday</code> prefixes each
        endpoint with an abbreviated weekday name. Formats like{" "}
        <code>FormattedDateTime</code> (no <code>Intl</code>).
      </p>
      <ul>
        <li>
          Same day, includeDuration=false (default):{" "}
          <FormattedDateTimeRange
            locale="fi"
            start={sameDayStart}
            end={sameDayEnd}
          />
        </li>
        <li>
          Same day, includeDuration=true:{" "}
          <FormattedDateTimeRange
            locale="fi"
            start={sameDayStart}
            end={sameDayEnd}
            includeDuration
          />
        </li>
        <li>
          Spans midnight, includeDuration=true:{" "}
          <FormattedDateTimeRange
            locale="fi"
            start={multiDayStart}
            end={multiDayEnd}
            includeDuration
          />
        </li>
        <li>
          locale=&quot;en&quot;, same day, includeDuration=true:{" "}
          <FormattedDateTimeRange
            locale="en"
            start={sameDayStart}
            end={sameDayEnd}
            includeDuration
          />
        </li>
        <li>
          Spans midnight, includeWeekday=true:{" "}
          <FormattedDateTimeRange
            locale="en"
            start={multiDayStart}
            end={multiDayEnd}
            includeWeekday
          />
        </li>
      </ul>
      <p>
        Helpers used directly: <code>isSameDay(start, end)</code> for the same
        day range above is{" "}
        <strong>{String(isSameDay(sameDayStart, sameDayEnd))}</strong>;{" "}
        <code>formatDuration(start, end)</code> gives &quot;
        {formatDuration(sameDayStart, sameDayEnd)}&quot;; and{" "}
        <code>formatDurationMinutes(135)</code> gives &quot;
        {formatDurationMinutes(135)}&quot;.
      </p>
    </div>
  );
}
