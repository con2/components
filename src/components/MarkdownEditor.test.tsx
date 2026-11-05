import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MarkdownEditor from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  it("names its text area by the label pointing at its id", () => {
    render(
      <>
        <label htmlFor="description">Description</label>
        <MarkdownEditor id="description" name="description" locale="en" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Description" }).tagName).toBe(
      "TEXTAREA",
    );
  });

  it("names the toolbar buttons in the given locale and hides their icons", () => {
    const { container } = render(
      <MarkdownEditor name="description" locale="fi" />,
    );
    expect(
      screen.getByRole("button", { name: "Lihavointi (ctrl + b)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Lisää otsikko" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Koko näyttö (ctrl + 0)" }),
    ).toBeInTheDocument();
    for (const icon of container.querySelectorAll(".w-md-editor-toolbar svg")) {
      expect(icon.closest('[aria-hidden="true"]')).not.toBeNull();
    }
  });

  it("follows the Bootstrap colour mode of its surroundings", () => {
    const { container } = render(
      <div data-bs-theme="dark">
        <MarkdownEditor name="description" locale="en" />
      </div>,
    );
    expect(container.querySelector("[data-color-mode]")).toHaveAttribute(
      "data-color-mode",
      "dark",
    );
  });

  it("stays light without a Bootstrap colour mode", () => {
    const { container } = render(
      <MarkdownEditor name="description" locale="en" />,
    );
    expect(container.querySelector("[data-color-mode]")).toHaveAttribute(
      "data-color-mode",
      "light",
    );
  });
});
