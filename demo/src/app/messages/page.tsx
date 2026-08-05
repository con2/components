import Link from "next/link";
import { Messages } from "@con2/components";

interface Props {
  searchParams: Promise<{ error?: string; success?: string }>;
}

const messages = {
  saved: "Your order was saved successfully.",
  deleted: "The item was deleted.",
  "not-found": "The requested order could not be found.",
  forbidden: "You do not have permission to perform this action.",
};

export default async function MessagesDemoPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div>
      <h1>Messages</h1>
      <p>
        <code>Messages</code> looks up either <code>searchParams.error</code>{" "}
        or <code>searchParams.success</code> in a caller-supplied{" "}
        <code>messages</code> map and renders the result as an{" "}
        <code>AlertNavigateOnClose</code> (danger for errors, success for
        successes). It renders nothing if neither param is set, or if the
        param value isn&apos;t a key in the map.
      </p>
      <p>
        Try it:{" "}
        <Link href="/messages?success=saved">?success=saved</Link>,{" "}
        <Link href="/messages?success=deleted">?success=deleted</Link>,{" "}
        <Link href="/messages?error=not-found">?error=not-found</Link>, or{" "}
        <Link href="/messages?error=forbidden">?error=forbidden</Link>.
      </p>

      <Messages searchParams={params} messages={messages} />
    </div>
  );
}
