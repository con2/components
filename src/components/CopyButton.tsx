"use client";

import { useEffect, useState } from "react";

interface CopyButtonMessages {
  title: string;
  tooltip?: string;
  success: string;
}

interface CopyButtonProps {
  data: string;
  className?: string;
  messages: CopyButtonMessages;
}

/// A button that copies `data` to the clipboard when clicked, showing a
/// brief self-fading "Copied!" indicator instead of alert().
export function CopyButton({
  data,
  className = "btn btn-outline-primary",
  messages,
}: CopyButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) {
      return;
    }

    const timeout = setTimeout(() => setShowSuccess(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSuccess]);

  return (
    <span className="position-relative d-inline-block">
      <button
        className={className}
        title={messages.tooltip}
        onClick={() => {
          navigator.clipboard.writeText(data);
          setShowSuccess(true);
        }}
      >
        {messages.title}…
      </button>
      <span
        className="position-absolute top-0 start-100 translate-middle-y ms-2 badge bg-success"
        role="status"
        aria-live="polite"
        style={{
          opacity: showSuccess ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {messages.success}
      </span>
    </span>
  );
}
