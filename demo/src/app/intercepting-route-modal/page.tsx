"use client";

import { InterceptingRouteModal } from "@con2/components";

// InterceptingRouteModal is normally rendered via a Next.js intercepting-route
// (parallel `@modal` slot + a `(.)some-route` segment) so it appears as an
// overlay on top of the page you navigated from, while still being a real,
// linkable route when loaded directly. Setting up that full routing scaffold
// is out of scope for this demo, so we just render it directly with sample
// props to show its own appearance and behavior.
export default function InterceptingRouteModalPage() {
  return (
    <div>
      <h1>InterceptingRouteModal</h1>
      <InterceptingRouteModal
        title="Confirm action"
        messages={{ cancel: "Cancel", submit: "Confirm" }}
        action={(formData) => {
          alert(`Confirmed: ${formData.get("comment")}`);
        }}
      >
        <label className="form-label" htmlFor="comment">
          Comment
        </label>
        <input id="comment" name="comment" type="text" className="form-control" />
      </InterceptingRouteModal>
    </div>
  );
}
