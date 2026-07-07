"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "If an account exists for that email, a password reset link has been sent."
      );
    } catch (error) {
      console.error(error);
      setMessage(
        "Unable to send a reset email. Please check the email address and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-black text-fuchsia-400">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Enter the email address associated with your account.
        </p>

        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-black disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-green-400">
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-fuchsia-400 hover:text-fuchsia-300"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}