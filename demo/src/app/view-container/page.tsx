import { ViewContainer } from "@con2/components";

export default function ViewContainerDemoPage() {
  return (
    <div>
      <h1>ViewContainer</h1>
      <p>
        <code>ViewContainer</code> wraps its children in a Bootstrap{" "}
        <code>&lt;main class=&quot;container mt-4 mb-4&quot;&gt;</code>. The
        box below shows the resulting element (nested here inside the demo
        layout&apos;s own container, so the margin is only visible relative to
        this box).
      </p>
      <div className="border p-2">
        <ViewContainer>
          <p>This paragraph is rendered inside the ViewContainer.</p>
          <p>So is this second paragraph.</p>
        </ViewContainer>
      </div>
    </div>
  );
}
