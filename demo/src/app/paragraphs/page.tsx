import { Paragraphs } from "@con2/components";

const text = `Dear customer,

Thank you for your order. It has been shipped and should arrive within 3-5 business days.

If you have any questions, feel free to reply to this email.`;

export default function ParagraphsDemoPage() {
  return (
    <div>
      <h1>Paragraphs</h1>
      <p>
        Double line breaks in the <code>text</code> prop start a new{" "}
        <code>&lt;p&gt;</code>. Unlike <code>Linebreaks</code>, single line
        breaks are not turned into <code>&lt;br&gt;</code> tags. Plain text
        only, no HTML is interpreted.
      </p>
      <Paragraphs text={text} />
    </div>
  );
}
