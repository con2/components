import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LanguageSwitcher from "./LanguageSwitcher";

// react-bootstrap's DropdownMenu does not render its items into the DOM
// until the dropdown has been opened at least once (it bails out early
// unless `hasShown` or `renderOnMount` is set). Opening it via a click on
// the toggle is required before menu items can be queried.
function openDropdown() {
  fireEvent.click(screen.getByRole("button", { name: "EN" }));
}

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname,
}));

const messages = {
  switchTo: {
    en: "In English",
    fi: "Suomeksi",
  },
};

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/en/some/path");
  });

  it("renders an option for every supported language", () => {
    render(<LanguageSwitcher locale="en" messages={messages} />);
    openDropdown();
    expect(screen.getByText("In English")).toBeInTheDocument();
    expect(screen.getByText("Suomeksi")).toBeInTheDocument();
  });

  it("shows the current locale, uppercased, as the dropdown title", () => {
    render(<LanguageSwitcher locale="en" messages={messages} />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("builds hrefs using the default strategy, stripping the current locale prefix", () => {
    usePathname.mockReturnValue("/en/some/path");
    render(<LanguageSwitcher locale="en" messages={messages} />);
    openDropdown();
    expect(screen.getByText("Suomeksi").closest("a")).toHaveAttribute(
      "href",
      "/fi/some/path",
    );
  });

  it("uses a custom buildLocaleHref strategy when provided", () => {
    usePathname.mockReturnValue("/en/some/path");
    const buildLocaleHref = (locale: string, currentPathAndQuery: string) =>
      `/custom/${locale}${currentPathAndQuery}`;
    render(
      <LanguageSwitcher
        locale="en"
        messages={messages}
        buildLocaleHref={buildLocaleHref}
      />,
    );
    openDropdown();
    expect(screen.getByText("Suomeksi").closest("a")).toHaveAttribute(
      "href",
      "/custom/fi/some/path",
    );
  });
});
