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
      <form className="mb-4">
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

      <h2>With a character limit</h2>
      <p>
        <code>maxLength</code> is optional - when set, it caps input the same
        way <code>TextArea</code> does (native limit + a live counter that
        turns red at the limit), with the same inlined fi/en/sv
        maximum-length message.
      </p>
      <form>
        <label className="form-label" htmlFor="shortDescription">
          Short description (max 60 characters)
        </label>
        <MarkdownEditor
          id="shortDescription"
          name="shortDescription"
          defaultValue={"A **short** pitch with a [link](https://example.com)."}
          locale="en"
          rows={6}
          maxLength={60}
        />
      </form>
    </div>
  );
}
