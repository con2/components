import { ColorBadge } from "@con2/components";

export default function ColorBadgeDemoPage() {
  return (
    <div>
      <h1>ColorBadge</h1>
      <p>
        <code>ColorBadge</code> renders a Bootstrap <code>.badge</code> whose
        background color is derived from the <code>color</code> prop (any CSS
        color, eg. a hex code), falling back to the Bootstrap secondary color
        when no color is given.
      </p>

      <p>
        <ColorBadge color="#0d6efd" title="Blue category">
          Programming
        </ColorBadge>
        <ColorBadge color="#dc3545" title="Red category">
          Urgent
        </ColorBadge>
        <ColorBadge color="#198754" title="Green category">
          Approved
        </ColorBadge>
        <ColorBadge color="Gold" title="Gold category">
          Featured
        </ColorBadge>
        <ColorBadge title="No color given, falls back to secondary">
          Uncategorized
        </ColorBadge>
      </p>
    </div>
  );
}
