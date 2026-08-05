import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ViewHeading, {
  ViewHeadingActions,
  ViewHeadingActionsWrapper,
} from "./ViewHeading";

describe("ViewHeading", () => {
  it("renders children inside an <h1>", () => {
    render(<ViewHeading>Title</ViewHeading>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Title" }),
    ).toBeInTheDocument();
  });

  it("renders a Sub subcomponent with muted styling", () => {
    render(
      <ViewHeading>
        Title
        <ViewHeading.Sub>Subtitle</ViewHeading.Sub>
      </ViewHeading>,
    );
    const sub = screen.getByText("Subtitle");
    expect(sub).toHaveClass("text-muted");
  });
});

describe("ViewHeadingActionsWrapper", () => {
  it("renders children with flex layout classes", () => {
    render(
      <ViewHeadingActionsWrapper>
        <span>Action</span>
      </ViewHeadingActionsWrapper>,
    );
    const el = screen.getByText("Action").parentElement;
    expect(el).toHaveClass("d-flex", "justify-content-between");
  });
});

describe("ViewHeadingActions", () => {
  it("renders children", () => {
    render(
      <ViewHeadingActions>
        <button>Do it</button>
      </ViewHeadingActions>,
    );
    expect(
      screen.getByRole("button", { name: "Do it" }),
    ).toBeInTheDocument();
  });
});
