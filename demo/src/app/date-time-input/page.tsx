import { DateTimeInput } from "@con2/components";

// DateTimeInput itself declares "use client" (it uses react-day-picker and local
// state for the calendar popup), so this page can stay a server component.
export default function DateTimeInputPage() {
  return (
    <div>
      <h1>DateTimeInput</h1>

      <h2>Basic</h2>
      <form className="mb-4">
        <label className="form-label">Event start</label>
        <DateTimeInput
          name="startsAt"
          locale="en-US"
          defaultValue="2026-08-15T14:30:00Z"
          defaultTimezone="Europe/Helsinki"
          messages={{ dateOutOfRange: "The selected date is out of range." }}
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
          messages={{
            dateOutOfRange:
              "The selected date is outside the registration window.",
          }}
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
          messages={{ dateOutOfRange: "The selected date is out of range." }}
        />
      </form>
    </div>
  );
}
