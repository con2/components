import { CopyButton } from "@con2/components";

export default function CopyButtonPage() {
  return (
    <div>
      <h1>CopyButton</h1>
      <p>
        Clicking the button copies <code>data</code> to the clipboard and shows
        a brief self-fading success badge next to it. The transient fade
        can&apos;t be captured in a static screenshot, but the markup below
        renders correctly and is fully interactive.
      </p>
      <CopyButton
        data="https://example.com/events/my-event"
        messages={{
          title: "Copy link",
          tooltip: "Copy the event link to the clipboard",
          success: "Copied!",
        }}
      />
    </div>
  );
}
