"use client";

import { MarkdownEditor } from "@con2/components";

export default function MarkdownEditorPage() {
  return (
    <div>
      <h1>MarkdownEditor</h1>
      <p>
        A markdown editor with a restricted toolbar (headings, bold, italics,
        lists, links) backed by a hidden input, so it participates in normal
        form submission via its <code>name</code> prop.
      </p>
      <form>
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <MarkdownEditor
          id="description"
          name="description"
          defaultValue={
            "# Welcome\n\nThis is **bold** text with a [link](https://example.com) and:\n\n- one\n- two\n- three"
          }
          locale="en"
          rows={10}
        />
      </form>
    </div>
  );
}
