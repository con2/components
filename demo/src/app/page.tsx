import Link from "next/link";

interface DemoLink {
  slug: string;
  label: string;
}

interface DemoGroup {
  title: string;
  links: DemoLink[];
}

const groups: DemoGroup[] = [
  {
    title: "Layout",
    links: [
      { slug: "view-container", label: "ViewContainer" },
      { slug: "view-heading", label: "ViewHeading" },
      { slug: "server-tabs", label: "ServerTabs" },
    ],
  },
  {
    title: "Text rendering",
    links: [
      { slug: "linebreaks", label: "Linebreaks" },
      { slug: "linebreaks-dangerous-html", label: "LinebreaksDangerousHtml" },
      { slug: "paragraphs", label: "Paragraphs" },
      { slug: "paragraphs-dangerous-html", label: "ParagraphsDangerousHtml" },
      { slug: "markdown", label: "Markdown" },
      { slug: "unrendered-markdown", label: "UnrenderedMarkdown" },
    ],
  },
  {
    title: "Forms & inputs",
    links: [
      { slug: "auto-submit-form", label: "AutoSubmitForm" },
      { slug: "submit-button", label: "SubmitButton" },
      { slug: "pattern-text-input", label: "PatternTextInput" },
      { slug: "text-area", label: "TextArea" },
      { slug: "date-time-input", label: "DateTimeInput" },
      { slug: "markdown-editor", label: "MarkdownEditor" },
      { slug: "uploaded-file-link", label: "UploadedFileLink" },
      { slug: "uploaded-file-cards", label: "UploadedFileCards" },
      { slug: "modal-button", label: "ModalButton" },
      { slug: "intercepting-route-modal", label: "InterceptingRouteModal" },
    ],
  },
  {
    title: "Data",
    links: [
      { slug: "data-table", label: "DataTable" },
      { slug: "reorderable-data-table", label: "ReorderableDataTable" },
      { slug: "dimension-filters", label: "DimensionFilters" },
    ],
  },
  {
    title: "Dates & locale",
    links: [
      { slug: "formatted-date", label: "FormattedDate" },
      { slug: "formatted-date-range", label: "FormattedDateRange" },
      { slug: "formatted-date-time", label: "FormattedDateTime" },
      { slug: "formatted-date-time-range", label: "FormattedDateTimeRange" },
      { slug: "language-switcher", label: "LanguageSwitcher" },
    ],
  },
  {
    title: "Feedback & messaging",
    links: [
      { slug: "alert-navigate-on-close", label: "AlertNavigateOnClose" },
      { slug: "messages", label: "Messages" },
      { slug: "message-card", label: "MessageCard" },
      { slug: "copy-button", label: "CopyButton" },
      { slug: "color-badge", label: "ColorBadge" },
      { slug: "sign-in-required", label: "SignInRequired" },
    ],
  },
  {
    title: "Links & icons",
    links: [
      { slug: "maybe-external-link", label: "MaybeExternalLink" },
      { slug: "client-link", label: "ClientLink" },
      { slug: "icons", label: "Icons (InfoCircle, OpenInNewTab, SwapVert)" },
    ],
  },
];

export default function DemoIndexPage() {
  return (
    <div>
      <h1>@con2/components demo</h1>
      <p>Sample pages for each extracted component.</p>
      <p>
        <a href="https://github.com/con2/components">GitHub repo</a>
      </p>
      {groups.map((group) => (
        <section key={group.title} className="mb-4">
          <h2 className="h5">{group.title}</h2>
          <ul className="list-unstyled">
            {group.links.map((link) => (
              <li key={link.slug}>
                <Link href={`/${link.slug}`}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
