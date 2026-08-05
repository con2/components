import { UnrenderedMarkdown } from "@con2/components";

const sample = `# Event announcement

We're happy to announce that **registration is now open**. Please read the
[rules page](https://example.com/rules) before signing up.

Things to bring:

- A valid ID
- Comfortable shoes
- Your **printed** ticket
`;

export default function UnrenderedMarkdownPage() {
  return (
    <div>
      <h1>UnrenderedMarkdown</h1>
      <p>
        Shows the raw markdown source as-is (in a <code>&lt;code&gt;</code>{" "}
        element), for contrast against the <code>Markdown</code> component,
        which renders the same kind of source to HTML.
      </p>
      <UnrenderedMarkdown>{sample}</UnrenderedMarkdown>
    </div>
  );
}
