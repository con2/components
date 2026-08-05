import { ReactNode } from "react";
import { makeBadgeBackgroundColor } from "../helpers/colors";

interface Props {
  /// CSS color (eg. a hex code) to derive the badge background from. When
  /// omitted, falls back to the Bootstrap secondary color.
  color?: string | null;
  title?: string;
  className?: string;
  children?: ReactNode;
}

/// Renders a Bootstrap `.badge` whose background color is derived from
/// `color` (via `makeBadgeBackgroundColor`), falling back to the Bootstrap
/// secondary color when no color is given. Factors out the
/// `<span className="badge" style={{backgroundColor: ...}}>` pattern.
export default function ColorBadge({
  color,
  title,
  className = "badge ms-2",
  children,
}: Props) {
  return (
    <span
      className={className}
      title={title}
      style={{
        backgroundColor: color
          ? makeBadgeBackgroundColor(color)
          : "var(--bs-secondary)",
      }}
    >
      {children}
    </span>
  );
}
