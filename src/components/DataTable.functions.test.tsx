import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { Column, defaultCellContents, defaultCellElement } from "./DataTable";

interface Row {
  name: string;
  count: number | null;
}

function makeColumn(overrides: Partial<Column<Row>> = {}): Column<Row> {
  return {
    slug: "name",
    title: "Name",
    className: "align-middle",
    ...overrides,
  };
}

// `defaultCellContents`/`defaultCellElement` are declared with a `this:
// Column<Row>` parameter, which `Function.prototype.call`'s built-in typing
// cannot infer through — it falls back to `Column<unknown>`. Pin the
// generics explicitly via small typed wrappers instead.
function callCellContents(column: Column<Row>, row: Row): ReactNode {
  return defaultCellContents.call<Column<Row>, [Row], ReactNode>(
    column,
    row,
  );
}

function callCellElement(
  column: Column<Row>,
  row: Row,
  children?: ReactNode,
): ReactNode {
  return defaultCellElement.call<Column<Row>, [Row, ReactNode?], ReactNode>(
    column,
    row,
    children,
  );
}

describe("defaultCellContents", () => {
  it("stringifies the value at the column's slug", () => {
    const column = makeColumn({ slug: "count" });
    const row: Row = { name: "Alice", count: 5 };
    render(<table><tbody><tr>{callCellContents(column, row)}</tr></tbody></table>);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders an empty string when the value is null", () => {
    const column = makeColumn({ slug: "count" });
    const row: Row = { name: "Alice", count: null };
    const contents = callCellContents(column, row);
    render(<table><tbody><tr><td data-testid="cell">{contents}</td></tr></tbody></table>);
    expect(screen.getByTestId("cell")).toHaveTextContent("");
  });

  it("renders an empty string when the value is undefined", () => {
    const column = makeColumn({ slug: "missing" as any });
    const row = { name: "Alice" } as any;
    const contents = callCellContents(column, row);
    render(<table><tbody><tr><td data-testid="cell">{contents}</td></tr></tbody></table>);
    expect(screen.getByTestId("cell")).toHaveTextContent("");
  });
});

describe("defaultCellElement", () => {
  it("renders a <td> with the column's className", () => {
    const column = makeColumn();
    render(
      <table>
        <tbody>
          <tr>{callCellElement(column, { name: "Alice", count: 1 }, "Alice")}</tr>
        </tbody>
      </table>,
    );
    const cell = screen.getByText("Alice");
    expect(cell.tagName).toBe("TD");
    expect(cell).toHaveClass("align-middle");
  });

  it("renders a <th> when scope is 'row'", () => {
    const column = makeColumn({ scope: "row" });
    render(
      <table>
        <tbody>
          <tr>{callCellElement(column, { name: "Alice", count: 1 }, "Alice")}</tr>
        </tbody>
      </table>,
    );
    const cell = screen.getByText("Alice");
    expect(cell.tagName).toBe("TH");
    expect(cell).toHaveAttribute("scope", "row");
  });

  it("wraps children in a link when getHref returns a value", () => {
    const column = makeColumn({ getHref: () => "/rows/1" });
    render(
      <table>
        <tbody>
          <tr>{callCellElement(column, { name: "Alice", count: 1 }, "Alice")}</tr>
        </tbody>
      </table>,
    );
    const link = screen.getByRole("link", { name: /Alice/ });
    expect(link).toHaveAttribute("href", "/rows/1");
  });

  it("does not wrap children in a link when getHref returns undefined", () => {
    const column = makeColumn({ getHref: () => undefined });
    render(
      <table>
        <tbody>
          <tr>{callCellElement(column, { name: "Alice", count: 1 }, "Alice")}</tr>
        </tbody>
      </table>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
