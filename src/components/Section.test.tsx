import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Section from "./Section";

describe("Section", () => {
  it("renders children", () => {
    render(
      <Section>
        <p>Hello</p>
      </Section>,
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders a title heading when title is given", () => {
    render(<Section title="My Section">Body</Section>);
    expect(
      screen.getByRole("heading", { level: 3, name: "My Section" }),
    ).toBeInTheDocument();
  });

  it("does not render a heading when title is omitted", () => {
    render(<Section>Body</Section>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("defaults className to 'mb-4'", () => {
    const { container } = render(<Section>Body</Section>);
    expect(container.querySelector("section")).toHaveClass("mb-4");
  });

  it("uses a custom className when given", () => {
    const { container } = render(
      <Section className="custom-class">Body</Section>,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
    expect(container.querySelector("section")).not.toHaveClass("mb-4");
  });
});
