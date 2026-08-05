"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AlertNavigateOnClose } from "@con2/components";

function AlertNavigateOnCloseDemo() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <>
      {status === "success" && (
        <AlertNavigateOnClose variant="success">
          Your changes were saved successfully.
        </AlertNavigateOnClose>
      )}
      {status === "error" && (
        <AlertNavigateOnClose variant="danger">
          Something went wrong while saving your changes.
        </AlertNavigateOnClose>
      )}
      {status !== "success" && status !== "error" && (
        <p className="text-muted">
          No <code>?status=</code> query parameter is set, so no alert is
          shown right now.
        </p>
      )}
    </>
  );
}

export default function AlertNavigateOnCloseDemoPage() {
  return (
    <div>
      <h1>AlertNavigateOnClose</h1>
      <p>
        This component itself doesn&apos;t read the query string - it&apos;s
        a dismissible <code>Alert</code> that, when closed, navigates (via{" "}
        <code>router.replace</code>) to <code>href</code> (defaulting to the
        current pathname), which is how a caller clears a
        server-action-set query string parameter after the user has seen the
        message. This demo page reads its own <code>?status=</code> query
        parameter to decide whether to show the alert at all.
      </p>
      <p>
        Try it:{" "}
        <Link href="/alert-navigate-on-close?status=success">
          ?status=success
        </Link>{" "}
        or{" "}
        <Link href="/alert-navigate-on-close?status=error">
          ?status=error
        </Link>
        . Dismissing the alert below will strip the query parameter from the
        URL.
      </p>

      <Suspense fallback={null}>
        <AlertNavigateOnCloseDemo />
      </Suspense>
    </div>
  );
}
