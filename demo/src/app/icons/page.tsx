import { InfoCircle, OpenInNewTab, SwapVert } from "@con2/components/icons";

export default function IconsPage() {
  return (
    <div>
      <h1>Icons</h1>
      <p>
        Inline SVG Material Symbols; each renders with a{" "}
        <code>material-symbol</code> class (styled via{" "}
        <code>@con2/components/icons/material-symbol.css</code>).
      </p>
      <div className="d-flex gap-5">
        <div className="text-center">
          <InfoCircle />
          <div>InfoCircle</div>
        </div>
        <div className="text-center">
          <OpenInNewTab />
          <div>OpenInNewTab</div>
        </div>
        <div className="text-center">
          <SwapVert />
          <div>SwapVert</div>
        </div>
      </div>
    </div>
  );
}
