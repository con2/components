import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormattedDateRange } from "./FormattedDateRange";

describe("FormattedDateRange", () => {
  it("collapses a same-month fi range to D.–D.M.YYYY", () => {
    const { container } = render(
      <FormattedDateRange locale="fi" start="2024-05-01" end="2024-05-03" />,
    );
    expect(container.textContent).toBe("1.–3.5.2024");
  });

  it("collapses a same-year sv range identically to fi", () => {
    const { container } = render(
      <FormattedDateRange locale="sv" start="2024-04-28" end="2024-05-03" />,
    );
    expect(container.textContent).toBe("28.4.–3.5.2024");
  });

  it("does not collapse an en range, and separates with a non-breaking space", () => {
    const { container } = render(
      <FormattedDateRange locale="en" start="2026-08-01" end="2026-08-03" />,
    );
    expect(container.textContent).toBe(
      "2026-08-01\u00a0\u2013\u00a02026-08-03",
    );
  });

  it("does not collapse a fi range spanning different years", () => {
    const { container } = render(
      <FormattedDateRange locale="fi" start="2026-12-30" end="2027-01-02" />,
    );
    expect(container.textContent).toBe("30.12.2026–2.1.2027");
  });
});
