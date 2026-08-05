import { FormattedDateRange } from "@con2/components";

export default function FormattedDateRangePage() {
  return (
    <div>
      <h1>FormattedDateRange</h1>
      <p>
        Renders <code>start</code>–<code>end</code> as a single date when they
        fall on the same day, and collapses shared year/month for the{" "}
        <code>fi</code> locale (e.g. &quot;1.–3.5.2026&quot;).
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
          Same year, different months, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-04-28" end="2026-05-03" />
        </li>
        <li>
          Different years, locale=&quot;fi&quot;:{" "}
          <FormattedDateRange locale="fi" start="2026-12-30" end="2027-01-02" />
        </li>
        <li>
          Same range, locale=&quot;en&quot; (no fi-specific collapsing):{" "}
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
