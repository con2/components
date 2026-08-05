import { describe, expect, it } from "vitest";
import compactObject from "./compactObject";

describe("compactObject", () => {
  it("removes keys whose value is null", () => {
    expect(compactObject({ a: 1, b: null })).toEqual({ a: 1 });
  });

  it("removes keys whose value is an empty string", () => {
    expect(compactObject({ a: "foo", b: "" })).toEqual({ a: "foo" });
  });

  it("keeps keys whose value is undefined (only null and '' are removed)", () => {
    expect(compactObject({ a: 1, b: undefined })).toEqual({
      a: 1,
      b: undefined,
    });
  });

  it("keeps other falsy values such as false and 0", () => {
    expect(compactObject({ a: false, b: 0 })).toEqual({ a: false, b: 0 });
  });

  it("keeps truthy values untouched", () => {
    expect(compactObject({ a: 1, b: "foo", c: [1, 2] })).toEqual({
      a: 1,
      b: "foo",
      c: [1, 2],
    });
  });

  it("returns an empty object when given an empty object", () => {
    expect(compactObject({})).toEqual({});
  });

  it("removes multiple null/empty-string keys at once", () => {
    expect(
      compactObject({ a: null, b: "", c: "keep", d: null }),
    ).toEqual({ c: "keep" });
  });
});
