import { describe, expect, it } from "vitest";
import makeInputId from "./makeInputId";

describe("makeInputId", () => {
  it("joins prefix and field slug with a dash", () => {
    expect(makeInputId("form", { slug: "name" })).toBe("form-name");
  });

  it("joins prefix, field slug and choice slug with dashes", () => {
    expect(makeInputId("form", { slug: "color" }, { slug: "red" })).toBe(
      "form-color-red",
    );
  });

  it("omits the prefix when it is an empty string", () => {
    expect(makeInputId("", { slug: "name" })).toBe("name");
  });

  it("omits the prefix but keeps the choice slug when prefix is empty", () => {
    expect(makeInputId("", { slug: "color" }, { slug: "red" })).toBe(
      "color-red",
    );
  });

  it("omits the choice segment when no choice is given", () => {
    expect(makeInputId("form", { slug: "name" }, undefined)).toBe("form-name");
  });
});
