import "bootstrap/dist/css/bootstrap.min.css";
import "@con2/components/icons/material-symbol.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="container py-4">{children}</body>
    </html>
  );
}
