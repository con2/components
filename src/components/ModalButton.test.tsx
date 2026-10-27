import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ModalButton from "./ModalButton";

const messages = { cancel: "Cancel", submit: "Remove" };

describe("ModalButton", () => {
  it("shows the disabled reason as a tooltip when disabled", async () => {
    render(
      <ModalButton
        title="Remove survey"
        messages={messages}
        disabled
        disabledReason="Remove all language versions first."
      />,
    );

    const button = screen.getByRole("button", { name: "Remove survey…" });
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute("title");

    fireEvent.mouseOver(button.parentElement!);
    expect(
      await screen.findByText("Remove all language versions first."),
    ).toBeInTheDocument();
  });

  it("does not show the disabled reason when enabled", () => {
    render(
      <ModalButton
        title="Remove survey"
        messages={messages}
        disabledReason="Remove all language versions first."
      />,
    );

    const button = screen.getByRole("button", { name: "Remove survey…" });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("title", "Remove survey");
    fireEvent.mouseOver(button);
    expect(
      screen.queryByText("Remove all language versions first."),
    ).not.toBeInTheDocument();
  });
});
