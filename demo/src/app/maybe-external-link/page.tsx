import { MaybeExternalLink } from "@con2/components";

export default function MaybeExternalLinkPage() {
  return (
    <div>
      <h1>MaybeExternalLink</h1>
      <p>
        Renders a Next.js <code>{"<Link>"}</code> for hrefs starting with{" "}
        <code>/</code> (internal), or a plain{" "}
        <code>{'<a target="_blank">'}</code> with an appended{" "}
        <code>OpenInNewTab</code> icon for anything else (external).
      </p>
      <div className="row">
        <div className="col-md-6">
          <h2>Internal (starts with &quot;/&quot;)</h2>
          <p>
            <MaybeExternalLink href="/dimension-filters">
              Go to DimensionFilters demo
            </MaybeExternalLink>
          </p>
        </div>
        <div className="col-md-6">
          <h2>External (anything else)</h2>
          <p>
            <MaybeExternalLink href="https://example.com/docs">
              Visit example.com
            </MaybeExternalLink>
          </p>
        </div>
      </div>
    </div>
  );
}
