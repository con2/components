import { Linebreaks } from "@con2/components";

const text = `Dear customer,

Thank you for your order.
It has been shipped and should arrive within 3-5 business days.

If you have any questions, feel free to reply to this email.`;

export default function LinebreaksDemoPage() {
  return (
    <div>
      <h1>Linebreaks</h1>
      <p>
        Single line breaks in the <code>text</code> prop become{" "}
        <code>&lt;br&gt;</code>, double line breaks start a new{" "}
        <code>&lt;p&gt;</code>. Plain text only, no HTML is interpreted.
      </p>
      <Linebreaks text={text} />
    </div>
  );
}
