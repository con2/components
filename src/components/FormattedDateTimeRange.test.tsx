import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormattedDateTimeRange } from "./FormattedDateTimeRange";

const timezone = "Europe/Helsinki"; // UTC+3 (EEST) in August

describe("FormattedDateTimeRange", () => {
  it("shows only the end's time when start and end fall on the same day", () => {
    const { container } = render(
      <FormattedDateTimeRange
        locale="en"
        start="2026-08-05T09:00:00Z"
        end="2026-08-05T11:30:00Z"
        timezone={timezone}
      />,
    );
    expect(container.textContent).toContain("2026-08-05 12:00");
    expect(container.textContent).toContain("14:30");
    expect(container.textContent).not.toContain("2026-08-05 14:30");
  });

  it("shows a full date+time for the end when start and end fall on different days", () => {
    const { container } = render(
      <FormattedDateTimeRange
        locale="en"
        start="2026-08-05T20:00:00Z"
        end="2026-08-06T06:00:00Z"
        timezone={timezone}
      />,
    );
    expect(container.textContent).toContain("2026-08-06");
  });

  it("prefixes each endpoint with an abbreviated weekday name when includeWeekday is set", () => {
    const { container } = render(
      <FormattedDateTimeRange
        locale="en"
        start="2026-08-05T20:00:00Z"
        end="2026-08-06T06:00:00Z"
        timezone={timezone}
        includeWeekday
      />,
    );
    expect(container.textContent).toContain("Wed 2026-08-05");
    expect(container.textContent).toContain("Thu 2026-08-06");
  });
});
