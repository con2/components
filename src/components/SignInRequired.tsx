"use client";

import { signIn } from "next-auth/react";

interface Messages {
  title: string;
  message: string;
}

/// This message is generic and not worth asking every caller to supply a
/// translation for - inlined here instead of being part of `messages`.
const signInMessages: Record<string, string> = {
  en: "Sign in",
  fi: "Kirjaudu sisään",
  sv: "Logga in",
};

interface SignInRequiredProps {
  messages: Messages;
  locale: string;
  /// The NextAuth provider id to sign in with, eg. "kompassi".
  providerId: string;
}

export default function SignInRequired({
  messages,
  locale,
  providerId,
}: SignInRequiredProps) {
  return (
    <div className="container mt-4">
      <h1>{messages.title}</h1>
      <p>{messages.message}</p>
      <button onClick={() => signIn(providerId)} className="btn btn-primary">
        {signInMessages[locale] ?? signInMessages.en}…
      </button>
    </div>
  );
}
