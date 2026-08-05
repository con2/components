import { Temporal } from "@js-temporal/polyfill";

import {
  FormattedDateTime,
  formatDateTime,
  defaultDateTimeOptions,
} from "@con2/components";

const isoInstant = "2026-08-05T17:30:00Z";
const zonedDateTime = Temporal.ZonedDateTime.from(
  "2026-08-05T20:30:00+03:00[Europe/Helsinki]",
);

export default function FormattedDateTimePage() {
  return (
    <div>
      <h1>FormattedDateTime</h1>
      <p>
        Accepts <code>Date</code>, <code>Temporal.Instant</code>,{" "}
        <code>Temporal.ZonedDateTime</code>, or an ISO 8601 string via{" "}
        <code>value</code>; formats using <code>options</code> (default{" "}
        <code>{"{ dateStyle: \"medium\", timeStyle: \"short\" }"}</code>).
      </p>
      <ul>
        <li>
          locale=&quot;fi&quot;, value=ISO instant string, default options:{" "}
          <FormattedDateTime locale="fi" value={isoInstant} />
        </li>
        <li>
          locale=&quot;en&quot;, value=Temporal.ZonedDateTime:{" "}
          <FormattedDateTime locale="en" value={zonedDateTime} />
        </li>
        <li>
          locale=&quot;fi&quot;, custom options (
          <code>{"{ dateStyle: \"full\", timeStyle: \"medium\" }"}</code>):{" "}
          <FormattedDateTime
            locale="fi"
            value={isoInstant}
            options={{ dateStyle: "full", timeStyle: "medium" }}
          />
        </li>
        <li>
          locale=&quot;fi&quot;, value=null (renders nothing):{" "}
          <FormattedDateTime locale="fi" value={null} />
        </li>
      </ul>
      <p>
        Calling <code>formatDateTime()</code> directly:{" "}
        {formatDateTime(isoInstant, "fi", defaultDateTimeOptions)}
      </p>
    </div>
  );
}
