import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Markdown from "./Markdown";

describe("Markdown", () => {
  it("renders double tildes as strikethrough", () => {
    const { container } = render(<Markdown input="was ~~wrong~~ right" />);
    expect(container.querySelector("del")?.textContent).toBe("wrong");
  });

  it("keeps single tildes literal", () => {
    const { container } = render(<Markdown input="~20 € or ~25 €" />);
    expect(container.querySelector("del")).toBeNull();
    expect(container.textContent).toBe("~20 € or ~25 €");
  });

  it("leaves table syntax unrendered", () => {
    const { container } = render(<Markdown input={"| a |\n| - |\n| b |"} />);
    expect(container.querySelector("table")).toBeNull();
  });
});
