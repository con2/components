"use client";

import { usePathname } from "next/navigation";

import NavDropdown from "react-bootstrap/NavDropdown";

export interface LanguageSwitcherMessages {
  switchTo: Record<string, string>;
}

interface Props {
  locale: string;
  messages: LanguageSwitcherMessages;

  /// Strategy for turning a target locale and the current path+query into an
  /// href. Defaults to a prefixed-routing implementation
  /// (`` `/${locale}${currentPathAndQuery}` ``), suitable for e.g. next-intl's
  /// `localePrefix: "always"` / `"as-needed"`.
  ///
  /// Consumers using prefixless routing (next-intl's `localePrefix: "never"`)
  /// should pass a strategy that returns `currentPathAndQuery` unchanged, eg.
  /// `(locale, currentPathAndQuery) => currentPathAndQuery`.
  buildLocaleHref?: (locale: string, currentPathAndQuery: string) => string;
}

function defaultBuildLocaleHref(locale: string, currentPathAndQuery: string) {
  return `/${locale}${currentPathAndQuery}`;
}

export default function LanguageSwitcher({
  locale,
  messages,
  buildLocaleHref = defaultBuildLocaleHref,
}: Props) {
  const { switchTo: supportedLanguages } = messages;
  let pathname = usePathname();

  // Remove the language prefix from the pathname, if present.
  // If we were using <Link>, Next.js would handle this for us
  // But that also sometimes preloads the link, causing a language change
  for (const supportedLanguage of Object.keys(supportedLanguages)) {
    if (
      pathname === `/${supportedLanguage}` ||
      pathname.startsWith(`/${supportedLanguage}/`)
    ) {
      pathname = pathname.slice(supportedLanguage.length + 1);
      break;
    }
  }

  return (
    <NavDropdown title={locale.toUpperCase()} id="kompassi-locale-menu">
      {Object.entries(supportedLanguages).map(([code, name]) => (
        <NavDropdown.Item
          key={code}
          href={buildLocaleHref(code, pathname)}
          active={code === locale}
        >
          {name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}
