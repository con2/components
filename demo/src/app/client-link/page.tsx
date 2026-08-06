import { ClientLink } from "@con2/components";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardLink from "react-bootstrap/CardLink";

// This page is a Server Component (no "use client") - that's the point.
export default function ClientLinkPage() {
  return (
    <div>
      <h1>ClientLink</h1>
      <p>
        Just <code>next/link</code>&apos;s <code>Link</code> re-exported from a{" "}
        <code>&quot;use client&quot;</code> module. Passing a react-bootstrap
        component&apos;s <code>as</code> prop a component reference (not JSX)
        from a Server Component crosses the Server-&gt;Client boundary as a
        plain prop value - <code>next/link</code>&apos;s own <code>Link</code>{" "}
        doesn&apos;t survive that, but a value re-exported from a{" "}
        <code>&quot;use client&quot;</code> module does.
      </p>
      <Card>
        <CardBody>
          <CardLink as={ClientLink} href="/" className="link-subtle">
            Back to the component index
          </CardLink>
        </CardBody>
      </Card>
    </div>
  );
}
