"use client";

import Nav from "react-bootstrap/Nav";

import { LanguageSwitcher } from "@con2/components";

const messages = {
  switchTo: {
    en: "English",
    fi: "Suomeksi",
  },
};

export default function LanguageSwitcherPage() {
  return (
    <div>
      <h1>LanguageSwitcher</h1>
      <p>
        Renders a Bootstrap <code>NavDropdown</code> of the other available
        locales. <code>buildLocaleHref</code> controls how the target href is
        constructed from the locale and the current path+query; it defaults to
        prefixed routing (<code>{"`/${locale}${currentPathAndQuery}`"}</code>
        ).
      </p>

      <div className="row">
        <div className="col-md-6">
          <h2>Default (prefixed routing)</h2>
          <Nav>
            <LanguageSwitcher locale="en" messages={messages} />
          </Nav>
        </div>
        <div className="col-md-6">
          <h2>Custom buildLocaleHref (prefixless routing)</h2>
          <Nav>
            <LanguageSwitcher
              locale="en"
              messages={messages}
              buildLocaleHref={(_locale, currentPathAndQuery) =>
                currentPathAndQuery
              }
            />
          </Nav>
        </div>
      </div>
    </div>
  );
}
