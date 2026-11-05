"use client";

import MDEditor from "@uiw/react-md-editor";
import * as commands from "@uiw/react-md-editor/commands";
import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactElement,
} from "react";

// Required for the editor's layout (in particular, for the text area and preview pane
// to actually fill the visible bordered box instead of collapsing to their browser
// default size while the surrounding chrome renders at the full configured height).
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

/// These labels are generic and not worth asking every caller to supply a
/// translation for - inlined here instead of a required prop. The editor's own
/// toolbar labels are English only.
const toolbarLabels: Record<
  string,
  {
    insertHeading: string;
    heading: (level: number) => string;
    bold: string;
    italic: string;
    unorderedList: string;
    orderedList: string;
    link: string;
    edit: string;
    live: string;
    preview: string;
    fullscreen: string;
  }
> = {
  en: {
    insertHeading: "Insert heading",
    heading: (level) => `Heading ${level} (ctrl + ${level})`,
    bold: "Bold (ctrl + b)",
    italic: "Italic (ctrl + i)",
    unorderedList: "Bulleted list (ctrl + shift + u)",
    orderedList: "Numbered list (ctrl + shift + o)",
    link: "Link (ctrl + l)",
    edit: "Edit only (ctrl + 7)",
    live: "Edit and preview (ctrl + 8)",
    preview: "Preview only (ctrl + 9)",
    fullscreen: "Full screen (ctrl + 0)",
  },
  fi: {
    insertHeading: "Lisää otsikko",
    heading: (level) => `Otsikko ${level} (ctrl + ${level})`,
    bold: "Lihavointi (ctrl + b)",
    italic: "Kursiivi (ctrl + i)",
    unorderedList: "Luettelo (ctrl + shift + u)",
    orderedList: "Numeroitu luettelo (ctrl + shift + o)",
    link: "Linkki (ctrl + l)",
    edit: "Pelkkä muokkaus (ctrl + 7)",
    live: "Muokkaus ja esikatselu (ctrl + 8)",
    preview: "Pelkkä esikatselu (ctrl + 9)",
    fullscreen: "Koko näyttö (ctrl + 0)",
  },
  sv: {
    insertHeading: "Infoga rubrik",
    heading: (level) => `Rubrik ${level} (ctrl + ${level})`,
    bold: "Fetstil (ctrl + b)",
    italic: "Kursiv (ctrl + i)",
    unorderedList: "Punktlista (ctrl + shift + u)",
    orderedList: "Numrerad lista (ctrl + shift + o)",
    link: "Länk (ctrl + l)",
    edit: "Endast redigering (ctrl + 7)",
    live: "Redigering och förhandsgranskning (ctrl + 8)",
    preview: "Endast förhandsgranskning (ctrl + 9)",
    fullscreen: "Helskärm (ctrl + 0)",
  },
};

type ToolbarLabels = (typeof toolbarLabels)[string];

/// This message is generic and not worth asking every caller to supply a
/// translation for - inlined here instead of a required prop.
const maxLengthExceededMessages: Record<
  string,
  (maxLength: number, currentLength: number) => string
> = {
  en: (maxLength, currentLength) =>
    `Maximum length is ${maxLength} characters (current: ${currentLength}).`,
  fi: (maxLength, currentLength) =>
    `Enimmäispituus on ${maxLength} merkkiä (nykyinen: ${currentLength}).`,
  sv: (maxLength, currentLength) =>
    `Maximilängden är ${maxLength} tecken (nuvarande: ${currentLength}).`,
};

interface MarkdownEditorProps {
  id?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
  locale?: string;
  maxLength?: number;
}

// Keep the toolbar limited to the formatting we actually allow through the backend
// sanitizer and document in the field's help text: headings, bold, italics, lists,
// links. In particular, only offer h1-h4 (not h5/h6, which nh3 would strip), and omit
// strikethrough, quote, code, tables, images, and horizontal rules entirely.
// The buttons are named by their aria-label; the editor marks some of its icons
// as unnamed images, which screen readers would announce on their own.
function labelled(
  command: commands.ICommand,
  label: string,
): commands.ICommand {
  return {
    ...command,
    buttonProps: { ...command.buttonProps, "aria-label": label, title: label },
    icon: command.icon && (
      <span aria-hidden="true">{command.icon as ReactElement}</span>
    ),
  };
}

function buildToolbarCommands(labels: ToolbarLabels) {
  return [
    commands.group(
      [commands.title1, commands.title2, commands.title3, commands.title4].map(
        (command, index) => labelled(command, labels.heading(index + 1)),
      ),
      {
        name: "title",
        groupName: "title",
        buttonProps: {
          "aria-label": labels.insertHeading,
          title: labels.insertHeading,
        },
        icon: <span aria-hidden="true">{commands.title.icon}</span>,
      },
    ),
    labelled(commands.bold, labels.bold),
    labelled(commands.italic, labels.italic),
    commands.divider,
    labelled(commands.unorderedListCommand, labels.unorderedList),
    labelled(commands.orderedListCommand, labels.orderedList),
    commands.divider,
    labelled(commands.link, labels.link),
  ];
}

function buildExtraCommands(labels: ToolbarLabels) {
  return [
    labelled(commands.codeEdit, labels.edit),
    labelled(commands.codeLive, labels.live),
    labelled(commands.codePreview, labels.preview),
    commands.divider,
    labelled(commands.fullscreen, labels.fullscreen),
  ];
}

function subscribeToThemeChanges(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
    subtree: true,
  });
  return () => observer.disconnect();
}

/// Follows Bootstrap's colour mode (`data-bs-theme` on the nearest ancestor that
/// has one); light when no ancestor sets it.
function useColorMode(element: React.RefObject<HTMLElement | null>) {
  return useSyncExternalStore(
    subscribeToThemeChanges,
    () =>
      element.current
        ?.closest("[data-bs-theme]")
        ?.getAttribute("data-bs-theme") === "dark"
        ? "dark"
        : "light",
    () => "light",
  );
}

/// A Markdown editor with a toolbar and preview restricted to the formatting the
/// backend renders/sanitizes, backed by a hidden input so it participates in normal
/// <form> submission.
export default function MarkdownEditor({
  id,
  name,
  defaultValue = "",
  required,
  readOnly,
  rows = 10,
  locale = "en",
  maxLength,
}: MarkdownEditorProps) {
  const labels = toolbarLabels[locale] ?? toolbarLabels.en;
  const [value, setValue] = useState(defaultValue);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const colorMode = useColorMode(containerRef);

  const handleChange = useCallback(
    (newValue?: string) => {
      const nextValue = newValue ?? "";
      setValue(nextValue);

      if (maxLength === undefined) {
        return;
      }

      const hiddenInput = hiddenInputRef.current;
      if (!hiddenInput) {
        return;
      }

      if (nextValue.length > maxLength) {
        const formatMessage =
          maxLengthExceededMessages[locale] ?? maxLengthExceededMessages.en;
        hiddenInput.setCustomValidity(
          formatMessage(maxLength, nextValue.length),
        );
      } else {
        hiddenInput.setCustomValidity("");
      }
    },
    [maxLength, locale],
  );

  // The toolbar (~40px) sits above the text area within `height`, so the text area's
  // own minHeight must leave room for it - otherwise its min-height (forced via an
  // inline style, see below) exceeds the space actually left for it after the
  // toolbar, and `.w-md-editor-area`'s `overflow: auto` permanently shows a scrollbar.
  const toolbarHeight = 40;
  const contentHeight = rows * 24;
  const editorHeight = contentHeight + toolbarHeight;

  const atLimit = maxLength !== undefined && value.length >= maxLength;

  return (
    <div data-color-mode={colorMode} ref={containerRef}>
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
        ref={hiddenInputRef}
      />
      <MDEditor
        value={value}
        onChange={handleChange}
        preview={readOnly ? "preview" : "live"}
        visibleDragbar={false}
        height={editorHeight}
        // MDEditor's `minHeight` defaults to 100px and, once set, is applied as an
        // inline style overriding the stylesheet's `min-height: 100%` rule on the
        // text area's wrapper - so without this, the editable area stays stuck at
        // 100px regardless of `height`, even though the surrounding chrome (and the
        // preview pane) do size to `height` correctly.
        minHeight={contentHeight}
        // On the text area itself, so that a <label htmlFor={id}> names it.
        textareaProps={{ id, readOnly, maxLength }}
        commands={buildToolbarCommands(labels)}
        extraCommands={buildExtraCommands(labels)}
      />
      {maxLength !== undefined && (
        <small className={atLimit ? "text-danger" : "text-muted"}>
          {value.length}/{maxLength}
        </small>
      )}
    </div>
  );
}
