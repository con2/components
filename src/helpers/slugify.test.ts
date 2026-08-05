import { describe, expect, it } from "vitest";
import slugifyDash, { slugifyUnderscore } from "./slugify";

describe("slugifyDash", () => {
  it("lowercases input", () => {
    expect(slugifyDash("HELLO")).toBe("hello");
  });

  it("replaces spaces with dashes", () => {
    expect(slugifyDash("hello world")).toBe("hello-world");
  });

  it("maps known accented/unicode characters to ASCII equivalents", () => {
    expect(slugifyDash("Äiti äänestää")).toBe("aiti-aanestaa");
  });

  it("strips punctuation not in the char map", () => {
    expect(slugifyDash("hello, world!")).toBe("hello-world");
  });

  it("collapses multiple consecutive dashes into one", () => {
    expect(slugifyDash("hello   world")).toBe("hello-world");
  });

  it("removes a leading dash", () => {
    expect(slugifyDash(" hello")).toBe("hello");
  });

  it("removes a trailing dash", () => {
    expect(slugifyDash("hello ")).toBe("hello");
  });

  it("converts underscores and dots to dashes", () => {
    expect(slugifyDash("hello_world.test")).toBe("hello-world-test");
  });

  it("strips unicode characters not present in the char map", () => {
    // e.g. CJK characters have no mapping and are not [a-z0-9-]
    expect(slugifyDash("hello日本world")).toBe("helloworld");
  });

  it("is the default export", () => {
    expect(slugifyDash).toBeInstanceOf(Function);
  });
});

describe("slugifyUnderscore", () => {
  it("replaces spaces with underscores", () => {
    expect(slugifyUnderscore("hello world")).toBe("hello_world");
  });

  it("maps known accented/unicode characters to ASCII equivalents", () => {
    expect(slugifyUnderscore("Äiti äänestää")).toBe("aiti_aanestaa");
  });

  it("strips punctuation not in the char map", () => {
    expect(slugifyUnderscore("hello, world!")).toBe("hello_world");
  });

  it("collapses multiple consecutive separators into one underscore", () => {
    expect(slugifyUnderscore("hello   world")).toBe("hello_world");
  });
});
