import { DateTimeInput } from "@con2/components";

// DateTimeInput itself declares "use client" (it uses react-day-picker and local
// state for the calendar popup), so this page can stay a server component.
export default function DateTimeInputPage() {
  return (
    <div>
      <h1>DateTimeInput</h1>
      <p>
        The out-of-range warning is a generic message inlined by{" "}
        <code>locale</code> (fi/en/sv) rather than a <code>messages</code> prop.
        The date button label renders ISO 8601 (e.g. &quot;2026-08-15&quot;) for
        the <code>en</code> locale (and any locale other than <code>fi</code>/
        <code>sv</code>, eg. the <code>en-US</code> below),{" "}
        <code>D.M.YYYY</code> for <code>fi</code>/<code>sv</code>.
      </p>

      <h2>Basic</h2>
      <form className="mb-4">
        <label className="form-label">Event start</label>
        <DateTimeInput
          name="startsAt"
          locale="en-US"
          defaultValue="2026-08-15T14:30:00Z"
          defaultTimezone="Europe/Helsinki"
        />
      </form>

      <h2>With a date range (shows a warning when out of range)</h2>
      <form className="mb-4">
        <label className="form-label">Registration deadline</label>
        <DateTimeInput
          name="deadline"
          locale="en-US"
          defaultValue="2026-09-01T10:00:00Z"
          dateRange={{
            start: "2026-08-01T00:00:00Z",
            end: "2026-08-31T23:59:59Z",
          }}
          defaultTimezone="Europe/Helsinki"
        />
      </form>

      <h2>Read-only</h2>
      <form>
        <label className="form-label">Fixed date</label>
        <DateTimeInput
          name="fixedDate"
          locale="en-US"
          defaultValue="2026-08-15T14:30:00Z"
          defaultTimezone="Europe/Helsinki"
          readOnly
        />
      </form>
    </div>
  );
}
