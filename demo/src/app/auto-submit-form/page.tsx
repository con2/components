"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AutoSubmitForm } from "@con2/components";

function AutoSubmitFormDemo() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "name";

  return (
    <AutoSubmitForm method="get" className="d-flex align-items-center gap-2">
      <label htmlFor="sort" className="form-label mb-0">
        Sort by
      </label>
      <select
        id="sort"
        name="sort"
        defaultValue={sort}
        className="form-select w-auto"
      >
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="popularity">Popularity</option>
      </select>
    </AutoSubmitForm>
  );
}

export default function AutoSubmitFormPage() {
  return (
    <div>
      <h1>AutoSubmitForm</h1>
      <p>
        This form submits itself whenever any field inside it changes (via the
        native onChange event bubbling up), instead of requiring an explicit
        submit button. Try changing the select below - the page navigates to{" "}
        <code>?sort=...</code>, and the select&apos;s value is read back from
        that query parameter on load.
      </p>
      <Suspense fallback={null}>
        <AutoSubmitFormDemo />
      </Suspense>
    </div>
  );
}
