import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SubmitButton } from "./SubmitButton";

// SubmitButton uses useFormStatus(), which requires the button to be
// rendered inside a <form> that is itself inside a React <form> action
// boundary. Outside of an actual form action submission, pending is false,
// so we can exercise the "not pending" rendering path directly, and drive
// the "pending" path by mocking react-dom's useFormStatus.

describe("SubmitButton", () => {
  it("renders children inside a submit button", () => {
    render(
      <form>
        <SubmitButton>Save</SubmitButton>
      </form>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
  });

  it("is disabled when the disabled prop is true", () => {
    render(
      <form>
        <SubmitButton disabled>Save</SubmitButton>
      </form>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("does not render a spinner when not pending", () => {
    const { container } = render(
      <form>
        <SubmitButton>Save</SubmitButton>
      </form>,
    );
    expect(container.querySelector(".spinner-border")).toBeNull();
  });

  it("renders a spinner and is disabled while pending", async () => {
    vi.doMock("react-dom", async () => {
      const actual =
        await vi.importActual<typeof import("react-dom")>("react-dom");
      return { ...actual, useFormStatus: () => ({ pending: true }) };
    });
    vi.resetModules();
    const { SubmitButton: PendingSubmitButton } =
      await import("./SubmitButton");

    const { container } = render(
      <form>
        <PendingSubmitButton>Save</PendingSubmitButton>
      </form>,
    );

    expect(container.querySelector(".spinner-border")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Save/ })).toBeDisabled();

    vi.doUnmock("react-dom");
    vi.resetModules();
  });
});
