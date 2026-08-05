import { describe, expect, it } from "vitest";
import { normalizeFormData } from "./normalizeFormData";

describe("normalizeFormData", () => {
  it("strips CR characters from string values", () => {
    const data = new FormData();
    data.append("message", "line1\r\nline2\r\n");
    expect(normalizeFormData(data)).toEqual({ message: "line1\nline2\n" });
  });

  it("leaves values without CR unchanged", () => {
    const data = new FormData();
    data.append("name", "Santtu");
    expect(normalizeFormData(data)).toEqual({ name: "Santtu" });
  });

  it("returns an entry per key, keeping multiple keys intact", () => {
    const data = new FormData();
    data.append("a", "foo\r");
    data.append("b", "bar");
    expect(normalizeFormData(data)).toEqual({ a: "foo", b: "bar" });
  });

  it("passes non-string (File) values through untouched", () => {
    const data = new FormData();
    const file = new File(["contents"], "test.txt", { type: "text/plain" });
    data.append("upload", file);
    const result = normalizeFormData(data);
    expect(result.upload).toBe(file);
  });
});
