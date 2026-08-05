import { describe, expect, it } from "vitest";
import { createEnumValidator, parseSearchParam } from "./parseSearchParam";

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

const isValidColor = createEnumValidator(Color);

const options = {
  defaults: [Color.Red],
  allValues: [Color.Red, Color.Green, Color.Blue],
  isValid: isValidColor,
};

describe("parseSearchParam", () => {
  it("wraps a single valid string value into an array", () => {
    expect(parseSearchParam("GREEN", options)).toEqual([Color.Green]);
  });

  it("returns defaults when value is undefined", () => {
    expect(parseSearchParam(undefined, options)).toEqual(options.defaults);
  });

  it("returns defaults when value is an empty string", () => {
    expect(parseSearchParam("", options)).toEqual(options.defaults);
  });

  it("returns defaults when array value is empty", () => {
    expect(parseSearchParam([], options)).toEqual(options.defaults);
  });

  it("returns defaults when array value includes an empty string", () => {
    expect(parseSearchParam(["GREEN", ""], options)).toEqual(
      options.defaults,
    );
  });

  it("returns all values when value includes ALL", () => {
    expect(parseSearchParam(["ALL"], options)).toEqual(options.allValues);
  });

  it("returns all values when a single ALL string is given", () => {
    expect(parseSearchParam("ALL", options)).toEqual(options.allValues);
  });

  it("filters out invalid values from an array", () => {
    expect(parseSearchParam(["GREEN", "PURPLE"], options)).toEqual([
      Color.Green,
    ]);
  });

  it("returns an empty array when all values are invalid", () => {
    expect(parseSearchParam(["PURPLE", "ORANGE"], options)).toEqual([]);
  });

  it("preserves multiple valid values", () => {
    expect(parseSearchParam(["GREEN", "BLUE"], options)).toEqual([
      Color.Green,
      Color.Blue,
    ]);
  });
});

describe("createEnumValidator", () => {
  it("accepts values present in the enum", () => {
    expect(isValidColor("RED")).toBe(true);
    expect(isValidColor("GREEN")).toBe(true);
  });

  it("rejects values not present in the enum", () => {
    expect(isValidColor("PURPLE")).toBe(false);
    expect(isValidColor("")).toBe(false);
  });
});
