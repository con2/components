import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ViewContainer from "./ViewContainer";

describe("ViewContainer", () => {
  it("renders children inside a <main> with container classes", () => {
    render(
      <ViewContainer>
        <p>Content</p>
      </ViewContainer>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    const main = screen.getByRole("main");
    expect(main).toHaveClass("container", "mt-4", "mb-4");
  });
});
