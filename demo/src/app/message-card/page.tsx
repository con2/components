import { MessageCard } from "@con2/components";

export default function MessageCardDemoPage() {
  return (
    <div>
      <h1>MessageCard</h1>

      <MessageCard
        title="Sign-in required"
        message="Please sign in to view this page."
        action={{ label: "Sign in", href: "/" }}
      />

      <MessageCard
        title="Insufficient privileges"
        message="You don't have sufficient privileges to access this page. Contact your administrator if you believe this is a mistake."
      />

      <p>
        With <code>container</code>, the card is wrapped in a Bootstrap{" "}
        <code>Container</code> - useful for a full-page gate:
      </p>
      <div className="border p-2">
        <MessageCard
          title="Maintenance in progress"
          message="This feature is temporarily unavailable while we perform maintenance. Please check back later."
          action={{ label: "Go to homepage", href: "/" }}
          container
        />
      </div>
    </div>
  );
}
