import { FormattedDateRange } from "@con2/components";

export default function FormattedDateRangePage() {
  return (
    <div>
      <h1>FormattedDateRange</h1>
      <p>
        Renders <code>start</code>–<code>end</code> as a single date when they
        fall on the same day, and collapses shared year/month for{" "}
        <code>fi</code>/<code>sv</code> (e.g. &quot;1.–3.5.2026&quot;). Any
        other locale (eg. <code>en</code>) gets no collapsing, and its two
        endpoints are separated by a non-breaking space around the dash so it
        doesn&apos;t get lost among the date&apos;s own hyphens.
      </p>
      <ul>
        <li>
          Same day, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-08-05" end="2026-08-05" />
        </li>
        <li>
          Same month &amp; year, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-08-01" end="2026-08-03" />
        </li>
        <li>
          Same month &amp; year, locale=&quot;sv&quot; (identical to fi):{" "}
          <FormattedDateRange locale="sv" start="2026-08-01" end="2026-08-03" />
        </li>
        <li>
          Same year, different months, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-04-28" end="2026-05-03" />
        </li>
        <li>
          Different years, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-12-30" end="2027-01-02" />
        </li>
        <li>
          Same range, locale=&quot;en&quot; (no collapsing):{" "}
          <FormattedDateRange locale="en" start="2026-08-01" end="2026-08-03" />
        </li>
        <li>
          Only <code>start</code> given, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-08-05" end={null} />
        </li>
        <li>
          Only <code>end</code> given, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start={null} end="2026-08-05" />
        </li>
      </ul>
    </div>
  );
}
