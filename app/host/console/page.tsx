"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HostConsoleEntryPage() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");

  function openConsole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!gameId.trim()) return;

    router.push(`/host/console/${gameId.trim()}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
          Host Console
        </p>

        <h1 className="mt-3 text-4xl font-black">Open Live Game</h1>

        <form onSubmit={openConsole} className="mt-8 space-y-4">
          <input
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Paste Game ID"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
            required
          />

          <button className="w-full rounded-xl bg-orange-500 px-5 py-3 font-black text-black">
            Open Console
          </button>
        </form>

        <a
          href="/dashboard"
          className="mt-6 block text-center text-sm text-fuchsia-400"
        >
          ← Back to Dashboard
        </a>
      </div>
    </main>
  );
}