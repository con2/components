import { SubmitButton } from "@con2/components";

export default function SubmitButtonPage() {
  return (
    <div>
      <h1>SubmitButton</h1>
      <p>
        SubmitButton relies on <code>useFormStatus()</code>, so it must be
        rendered inside a <code>&lt;form&gt;</code>. This page only shows the
        idle state — the pending spinner only appears while React is actually
        submitting the form (e.g. via a Server Action), which can&apos;t be
        demonstrated on a static page.
      </p>

      <form className="d-flex gap-2 mb-3">
        <SubmitButton>Save</SubmitButton>
      </form>

      <form className="d-flex gap-2 mb-3">
        <SubmitButton
          variant="danger"
          confirmationMessage="Are you sure you want to delete this?"
        >
          Delete
        </SubmitButton>
      </form>

      <form className="d-flex gap-2">
        <SubmitButton variant="secondary" size="sm" disabled>
          Disabled
        </SubmitButton>
      </form>
    </div>
  );
}
