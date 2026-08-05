import { ParagraphsDangerousHtml } from "@con2/components";

const html = `Dear customer,

Thank you for your <strong>order</strong>. Your tracking number is <a href="https://example.com/track/123">123</a>.

Please keep this email for your records.`;

export default function ParagraphsDangerousHtmlDemoPage() {
  return (
    <div>
      <h1>ParagraphsDangerousHtml</h1>
      <p>
        Same paragraph-splitting behavior as <code>Paragraphs</code>, but the{" "}
        <code>html</code> prop is rendered via{" "}
        <code>dangerouslySetInnerHTML</code>, so inline HTML tags work. Only
        pass trusted content, never unsanitized user input.
      </p>
      <ParagraphsDangerousHtml html={html} />
    </div>
  );
}
