"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setMessage("Account created successfully. You can now log in.");
    } catch (error) {
      setMessage("Unable to create account. Please check your information.");
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-4xl font-black text-fuchsia-500">
          Create Account
        </h1>

        <p className="mt-3 text-gray-400">
          Start hosting music bingo games with Bingo to the Beats.
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
            placeholder="Full name"
            type="text"
            required
          />

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
            minLength={6}
          />

          <button className="w-full rounded-xl bg-fuchsia-600 px-5 py-3 font-black text-white">
            Create Account
          </button>

          {message && (
            <p className="rounded-xl bg-zinc-900 p-3 text-center text-sm text-gray-300">
              {message}
            </p>
          )}
        </form>
      </section>

      <Footer />
    </main>
  );
}