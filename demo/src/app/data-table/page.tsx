import {
  Column,
  DataTable,
  TableFooter,
  defaultCellContents,
  defaultCellElement,
} from "@con2/components";

interface Person {
  id: number;
  name: string;
  role: string;
  email: string;
}

const people: Person[] = [
  {
    id: 1,
    name: "Alice Anderson",
    role: "Organizer",
    email: "alice@example.com",
  },
  { id: 2, name: "Bob Baker", role: "Volunteer", email: "bob@example.com" },
  { id: 3, name: "Carol Chen", role: "Speaker", email: "carol@example.com" },
  { id: 4, name: "Dave Diaz", role: "Attendee", email: "dave@example.com" },
  { id: 5, name: "Eve Evans", role: "Volunteer", email: "eve@example.com" },
];

const columns: Column<Person>[] = [
  {
    slug: "name",
    title: "Name",
    scope: "row",
    // Demonstrates row-linking via getHref: the whole cell becomes a stretched link.
    getHref: (person) => `/data-table#${person.id}`,
  },
  { slug: "role", title: "Role" },
  {
    slug: "email",
    title: "Email",
    getCellContents: (person) => (
      <a href={`mailto:${person.email}`}>{person.email}</a>
    ),
  },
];

export default function DataTablePage() {
  return (
    <div>
      <h1>DataTable</h1>

      <h2>Basic usage</h2>
      <DataTable
        rows={people}
        columns={columns}
        getTotalMessage={(total) => `${total} people total`}
      />

      <h2>Whole-row link via getRowHref</h2>
      <p>
        Every row is clickable and links to an anchor on this page; hovering
        highlights the row.
      </p>
      <DataTable
        rows={people}
        columns={[
          { slug: "name", title: "Name", scope: "row" },
          { slug: "role", title: "Role" },
        ]}
        getRowHref={(person) => `/data-table#${person.id}`}
      />

      <h2>With a footer</h2>
      <DataTable rows={people.slice(0, 3)} columns={columns}>
        <TableFooter colSpan={columns.length}>
          Showing 3 of {people.length} people
        </TableFooter>
      </DataTable>

      <h2>defaultCellElement / defaultCellContents directly</h2>
      <p>
        Columns can reuse the exported defaults explicitly instead of relying on
        DataTable&apos;s implicit fallback.
      </p>
      <DataTable
        rows={people.slice(0, 2)}
        columns={[
          {
            slug: "name",
            title: "Name",
            scope: "row",
            getCellElement: defaultCellElement,
            getCellContents: defaultCellContents,
          },
          {
            slug: "role",
            title: "Role",
            getCellElement: defaultCellElement,
            getCellContents: defaultCellContents,
          },
        ]}
      />
    </div>
  );
}
