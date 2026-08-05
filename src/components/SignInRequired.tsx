"use client";

import { signIn } from "next-auth/react";

interface Messages {
  title: string;
  message: string;
  signIn: string;
}

interface SignInRequiredProps {
  messages: Messages;
  /// The NextAuth provider id to sign in with, eg. "kompassi".
  providerId: string;
}

export default function SignInRequired({
  messages,
  providerId,
}: SignInRequiredProps) {
  return (
    <div className="container mt-4">
      <h1>{messages.title}</h1>
      <p>{messages.message}</p>
      <button
        onClick={() => signIn(providerId)}
        className="btn btn-primary"
      >
        {messages.signIn}…
      </button>
    </div>
  );
}
