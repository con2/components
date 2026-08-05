import { SignInRequired } from "@con2/components";

export default function SignInRequiredPage() {
  return (
    <SignInRequired
      providerId="demo"
      locale="en"
      messages={{
        title: "Sign in required",
        message: "You need to sign in to view this page.",
      }}
    />
  );
}
