import { Fragment } from "react";
import { Temporal } from "@js-temporal/polyfill";

import { FormattedDate, formatDate } from "@con2/components";

const isoDateString = "2026-08-05";
const plainDate = Temporal.PlainDate.from(isoDateString);
const jsDate = new Date("2026-08-05T00:00:00Z");

export default function FormattedDatePage() {
  return (
    <div>
      <h1>FormattedDate</h1>
      <p>
        Accepts a <code>Date</code>, <code>Temporal.PlainDate</code>, or ISO
        date string via <code>date</code>; renders inside a{" "}
        <code>{"<time>"}</code> by default (override with <code>as</code>, e.g.{" "}
        <code>as={"{Fragment}"}</code> to avoid the wrapper, useful inside{" "}
        <code>{"<option>"}</code>). No <code>Intl</code>: <code>en</code> (and
        any locale other than <code>fi</code>/<code>sv</code>) renders ISO 8601
        (&quot;2026-08-05&quot;); <code>fi</code>/<code>sv</code> render{" "}
        <code>D.M.YYYY</code> (&quot;5.8.2026&quot;), identically.
      </p>
      <ul>
        <li>
          locale=&quot;fi&quot;, date=ISO string:{" "}
          <FormattedDate locale="fi" date={isoDateString} />
        </li>
        <li>
          locale=&quot;en&quot;, date=ISO string:{" "}
          <FormattedDate locale="en" date={isoDateString} />
        </li>
        <li>
          locale=&quot;fi&quot;, date=Temporal.PlainDate:{" "}
          <FormattedDate locale="fi" date={plainDate} />
        </li>
        <li>
          locale=&quot;sv&quot;, date=ISO string (identical to fi):{" "}
          <FormattedDate locale="sv" date={isoDateString} />
        </li>
        <li>
          locale=&quot;fi&quot;, date=Date (interpreted in <code>timezone</code>
          , default Europe/Helsinki):{" "}
          <FormattedDate locale="fi" date={jsDate} />
        </li>
        <li>
          locale=&quot;fi&quot;, date=null (renders nothing):{" "}
          <FormattedDate locale="fi" date={null} />
        </li>
        <li>
          as={"{Fragment}"} (no <code>{"<time>"}</code> wrapper): &quot;
          <FormattedDate locale="fi" date={isoDateString} as={Fragment} />
          &quot;
        </li>
      </ul>
      <p>
        Calling <code>formatDate()</code> directly (requires a{" "}
        <code>Temporal.PlainDate</code>): {formatDate(plainDate, "fi")}
      </p>
    </div>
  );
}
