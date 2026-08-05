import { Markdown } from "@con2/components";

const sample = `# Event announcement

We're happy to announce that **registration is now open**. Please read the
[rules page](https://example.com/rules) before signing up.

Things to bring:

- A valid ID
- Comfortable shoes
- Your **printed** ticket
`;

export default function MarkdownPage() {
  return (
    <div>
      <h1>Markdown</h1>
      <p>Renders a markdown string as sanitized HTML, opening links in a new tab.</p>
      <div className="border rounded p-3">
        <Markdown input={sample} />
      </div>
    </div>
  );
}
