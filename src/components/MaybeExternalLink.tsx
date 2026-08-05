import Link from "next/link";
import { PropsWithChildren } from "react";
import { OpenInNewTab } from "../icons/OpenInNewTab";

interface MaybeExternalLinkProps {
  href: string;
  className?: string;
}

export function MaybeExternalLink({
  href,
  className,
  children,
}: PropsWithChildren<MaybeExternalLinkProps>) {
  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children} <OpenInNewTab />
      </a>
    );
  }
}
