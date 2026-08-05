import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MaybeExternalLink } from "./MaybeExternalLink";

describe("MaybeExternalLink", () => {
  it("renders an internal Next.js link when href starts with '/'", () => {
    render(<MaybeExternalLink href="/foo/bar">Foo</MaybeExternalLink>);
    const link = screen.getByRole("link", { name: "Foo" });
    expect(link).toHaveAttribute("href", "/foo/bar");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders an external link with target=_blank and rel attributes for absolute URLs", () => {
    render(
      <MaybeExternalLink href="https://example.com">
        Example
      </MaybeExternalLink>,
    );
    const link = screen.getByRole("link", { name: /Example/ });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the OpenInNewTab icon for external links", () => {
    const { container } = render(
      <MaybeExternalLink href="https://example.com">
        Example
      </MaybeExternalLink>,
    );
    expect(container.querySelector("svg.material-symbol")).toBeTruthy();
  });

  it("does not render the OpenInNewTab icon for internal links", () => {
    const { container } = render(
      <MaybeExternalLink href="/foo">Foo</MaybeExternalLink>,
    );
    expect(container.querySelector("svg.material-symbol")).toBeFalsy();
  });

  it("passes className through to the rendered link", () => {
    render(
      <MaybeExternalLink href="/foo" className="my-class">
        Foo
      </MaybeExternalLink>,
    );
    expect(screen.getByRole("link", { name: "Foo" })).toHaveClass("my-class");
  });
});
