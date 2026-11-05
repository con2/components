"use client";

import { MarkdownEditor } from "@con2/components";

export default function MarkdownEditorPage() {
  return (
    <div>
      <h1>MarkdownEditor</h1>
      <p>
        A markdown editor with a restricted toolbar (headings, bold, italics,
        lists, links) backed by a hidden input, so it participates in normal
        form submission via its <code>name</code> prop. Its <code>id</code> goes
        on the text area, so a <code>&lt;label htmlFor&gt;</code> names it.
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
        way <code>TextArea</code> does (native limit + a live counter that turns
        red at the limit), with the same inlined fi/en/sv maximum-length
        message.
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

      <h2>Dark colour mode, Finnish toolbar</h2>
      <p>
        The editor follows <code>data-bs-theme</code> of its nearest ancestor
        that sets one, and stays light where none does. Toolbar labels come from
        an inlined fi/en/sv table selected by <code>locale</code>.
      </p>
      <form
        data-bs-theme="dark"
        className="p-3 rounded"
        style={{ background: "#0b1020", color: "#eaeef8" }}
      >
        <label className="form-label" htmlFor="kuvaus">
          Kuvaus
        </label>
        <MarkdownEditor
          id="kuvaus"
          name="kuvaus"
          defaultValue={"## Tervetuloa\n\nTämä on **lihavoitua** tekstiä."}
          locale="fi"
          rows={6}
        />
      </form>
    </div>
  );
}
