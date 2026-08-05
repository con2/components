import { describe, expect, it } from "vitest";
import { decodeBoolean, falsyValues } from "./decodeBoolean";

describe("decodeBoolean", () => {
  it("treats known falsy strings as false", () => {
    for (const value of falsyValues) {
      expect(decodeBoolean(value)).toBe(false);
    }
  });

  it("is case-insensitive for falsy strings", () => {
    expect(decodeBoolean("FALSE")).toBe(false);
    expect(decodeBoolean("Off")).toBe(false);
    expect(decodeBoolean("NO")).toBe(false);
  });

  it("treats other strings as true", () => {
    expect(decodeBoolean("true")).toBe(true);
    expect(decodeBoolean("1")).toBe(true);
    expect(decodeBoolean("yes")).toBe(true);
    expect(decodeBoolean("on")).toBe(true);
  });

  it("treats an arbitrary non-empty string as true", () => {
    expect(decodeBoolean("banana")).toBe(true);
  });
});
