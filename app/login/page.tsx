"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      setMessage("Login failed. Please check your email and password.");
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-4xl font-black text-orange-500">Host Login</h1>

        <p className="mt-3 text-gray-400">
          Sign in to manage your Bingo to the Beats games.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
            placeholder="Email address"
            type="email"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
            placeholder="Password"
            type="password"
            required
          />
<div className="mt-4 text-center">
  <a
    href="/forgot-password"
    className="text-sm text-fuchsia-400 hover:text-fuchsia-300 underline"
  >
    Forgot your password?
  </a>
</div>
          <button className="w-full rounded-xl bg-orange-500 px-5 py-3 font-black text-black">
            Sign In
          </button>

          {message && (
            <p className="rounded-xl bg-zinc-900 p-3 text-center text-sm text-gray-300">
              {message}
            </p>
          )}

          <p className="text-center text-sm text-gray-400">
            New host?{" "}
            <a className="text-fuchsia-400" href="/register">
              Create account
            </a>
          </p>
        </form>
      </section>

      <Footer />
    </main>
  );
}