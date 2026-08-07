import { Temporal } from "@js-temporal/polyfill";

import { FormattedDateTime, formatDateTime } from "@con2/components";

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
        <code>value</code>. No <code>Intl</code>: <code>en</code> (and any
        locale other than <code>fi</code>/<code>sv</code>) renders{" "}
        <code>YYYY-MM-DD HH:MM</code>; <code>fi</code>/<code>sv</code> render{" "}
        <code>D.M.YYYY HH:MM</code>, identically. <code>includeWeekday</code>{" "}
        prefixes an abbreviated weekday name.
      </p>
      <ul>
        <li>
          locale=&quot;fi&quot;, value=ISO instant string:{" "}
          <FormattedDateTime locale="fi" value={isoInstant} />
        </li>
        <li>
          locale=&quot;en&quot;, value=Temporal.ZonedDateTime:{" "}
          <FormattedDateTime locale="en" value={zonedDateTime} />
        </li>
        <li>
          locale=&quot;sv&quot;, value=ISO instant string:{" "}
          <FormattedDateTime locale="sv" value={isoInstant} />
        </li>
        <li>
          locale=&quot;en&quot;, includeWeekday:{" "}
          <FormattedDateTime locale="en" value={isoInstant} includeWeekday />
        </li>
        <li>
          locale=&quot;fi&quot;, value=null (renders nothing):{" "}
          <FormattedDateTime locale="fi" value={null} />
        </li>
      </ul>
      <p>
        Calling <code>formatDateTime()</code> directly:{" "}
        {formatDateTime(isoInstant, "fi")}
      </p>
    </div>
  );
}
