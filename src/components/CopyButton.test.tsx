import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "./CopyButton";

const messages = {
  title: "Copy",
  tooltip: "Copy to clipboard",
  success: "Copied!",
};

describe("CopyButton", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders the title and tooltip", () => {
    render(<CopyButton data="some data" messages={messages} />);
    const button = screen.getByRole("button", { name: /Copy…/ });
    expect(button).toHaveAttribute("title", "Copy to clipboard");
  });

  it("copies the data to the clipboard and shows the success message on click", () => {
    render(<CopyButton data="some data" messages={messages} />);

    const successLabel = screen.getByText("Copied!");
    expect(successLabel).toHaveStyle({ opacity: "0" });

    fireEvent.click(screen.getByRole("button", { name: /Copy…/ }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("some data");
    expect(successLabel).toHaveStyle({ opacity: "1" });
  });

  it("fades the success message out again after a delay", () => {
    render(<CopyButton data="some data" messages={messages} />);

    fireEvent.click(screen.getByRole("button", { name: /Copy…/ }));
    const successLabel = screen.getByText("Copied!");
    expect(successLabel).toHaveStyle({ opacity: "1" });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(successLabel).toHaveStyle({ opacity: "0" });
  });
});
