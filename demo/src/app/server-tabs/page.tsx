import { ServerTabs, Tab } from "@con2/components";

const tabs: Tab[] = [
  { slug: "overview", href: "/server-tabs", title: "Overview" },
  { slug: "details", href: "/server-tabs", title: "Details" },
  { slug: "history", href: "/server-tabs", title: "History", disabled: true },
  {
    slug: "docs",
    href: "https://example.com/docs",
    title: "Docs",
    external: true,
  },
];

export default function ServerTabsDemoPage() {
  return (
    <div>
      <h1>ServerTabs</h1>
      <p>
        The &quot;Overview&quot; tab is marked active, &quot;History&quot; is
        disabled, and &quot;Docs&quot; is an external link that opens in a new
        tab.
      </p>
      <ServerTabs tabs={tabs} active="overview" />
    </div>
  );
}
