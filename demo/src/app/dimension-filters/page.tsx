import { Suspense } from "react";

import { DimensionFilters, type Dimension } from "@con2/components";

const dimensions: Dimension[] = [
  {
    slug: "state",
    title: "State",
    values: [
      { slug: "draft", title: "Draft" },
      { slug: "published", title: "Published" },
      { slug: "cancelled", title: "Cancelled" },
    ],
  },
  {
    slug: "type",
    title: "Type",
    values: [
      { slug: "workshop", title: "Workshop" },
      { slug: "talk", title: "Talk" },
      { slug: "panel", title: "Panel" },
    ],
  },
  {
    slug: "room",
    title: "Room",
    values: [
      { slug: "main-hall", title: "Main Hall" },
      { slug: "room-2", title: "Room 2" },
    ],
  },
];

export default function DimensionFiltersPage() {
  return (
    <div>
      <h1>DimensionFilters</h1>
      <p>
        Presents each dimension as a dropdown and a free-text search field;
        selecting a value updates the page&apos;s search params (soft navigation
        via <code>router.replace</code>, with a <code>{"<noscript>"}</code>{" "}
        submit button fallback). That fallback button&apos;s label is generic
        and inlined by <code>locale</code> (fi/en/sv); only{" "}
        <code>searchPlaceholder</code> stays a <code>messages</code> field,
        since what you&apos;re searching varies by context.
      </p>
      <Suspense fallback={<p>Loading filters…</p>}>
        <DimensionFilters
          dimensions={dimensions}
          search
          locale="en"
          messages={{ searchPlaceholder: "Search programme" }}
        />
      </Suspense>
    </div>
  );
}
