import { LinebreaksDangerousHtml } from "@con2/components";

const html = `Dear customer,

Thank you for your <strong>order</strong>.
Your tracking number is <a href="https://example.com/track/123">123</a>.

Please keep this email for your records.`;

export default function LinebreaksDangerousHtmlDemoPage() {
  return (
    <div>
      <h1>LinebreaksDangerousHtml</h1>
      <p>
        Same line-break-to-paragraph behavior as <code>Linebreaks</code>, but
        the <code>html</code> prop is rendered via{" "}
        <code>dangerouslySetInnerHTML</code>, so inline HTML tags work. Only
        pass trusted content, never unsanitized user input.
      </p>
      <LinebreaksDangerousHtml html={html} />
    </div>
  );
}
