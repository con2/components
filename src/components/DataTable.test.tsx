import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Column, DataTable } from "./DataTable";

interface Row {
  id: number;
  name: string;
}

const rows: Row[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const columns: Column<Row>[] = [
  { slug: "name", title: "Name" },
  {
    slug: "shout",
    title: "Shout",
    getCellContents: (row) => row.name.toUpperCase() + "!",
  },
];

describe("DataTable", () => {
  it("renders a header cell for each column", () => {
    render(<DataTable rows={rows} columns={columns} />);
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Shout" }),
    ).toBeInTheDocument();
  });

  it("renders a row for each item using the default accessor for plain columns", () => {
    render(<DataTable rows={rows} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("uses a column's custom getCellContents when provided", () => {
    render(<DataTable rows={rows} columns={columns} />);
    expect(screen.getByText("ALICE!")).toBeInTheDocument();
    expect(screen.getByText("BOB!")).toBeInTheDocument();
  });

  it("renders the total message when getTotalMessage is given", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        getTotalMessage={(total) => `Total: ${total}`}
      />,
    );
    expect(screen.getByText("Total: 2")).toBeInTheDocument();
  });

  it("makes rows clickable links when getRowHref is given", () => {
    // getRowHref is used as the default getHref for every column that
    // doesn't specify its own, so with two plain columns each row renders
    // two links pointing at the same href.
    render(
      <DataTable
        rows={rows}
        columns={columns}
        getRowHref={(row) => `/rows/${row.id}`}
      />,
    );
    const links = screen.getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "/rows/1",
      "/rows/1",
      "/rows/2",
      "/rows/2",
    ]);
  });

  it("renders no rows when the rows array is empty", () => {
    const { container } = render(<DataTable rows={[]} columns={columns} />);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(0);
  });

  describe("getRowKey", () => {
    function Counter() {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount(count + 1)}>{count}</button>;
    }

    const statefulColumns: Column<Row>[] = [
      { slug: "name", title: "Name" },
      { slug: "counter", title: "Counter", getCellContents: () => <Counter /> },
    ];

    it("keeps cell state with the row when an earlier row is removed", () => {
      const { rerender } = render(
        <DataTable
          rows={rows}
          columns={statefulColumns}
          getRowKey={(row) => row.id}
        />,
      );
      fireEvent.click(screen.getAllByRole("button")[0]);
      rerender(
        <DataTable
          rows={rows.slice(1)}
          columns={statefulColumns}
          getRowKey={(row) => row.id}
        />,
      );
      expect(screen.getByRole("button")).toHaveTextContent("0");
    });

    it("keys rows by position without it, so cell state stays with the slot", () => {
      const { rerender } = render(
        <DataTable rows={rows} columns={statefulColumns} />,
      );
      fireEvent.click(screen.getAllByRole("button")[0]);
      rerender(<DataTable rows={rows.slice(1)} columns={statefulColumns} />);
      expect(screen.getByRole("button")).toHaveTextContent("1");
    });
  });
});
