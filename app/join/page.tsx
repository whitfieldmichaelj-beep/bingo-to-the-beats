"use client";

import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JoinPage() {
  const router = useRouter();
  const [gameCode, setGameCode] = useState("");
  const [message, setMessage] = useState("");

  async function handleJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Searching for game...");

    const cleanCode = gameCode.trim().toUpperCase();

    try {
      const gamesQuery = query(
        collection(db, "games"),
        where("gameCode", "==", cleanCode)
      );

      const snapshot = await getDocs(gamesQuery);

      if (snapshot.empty) {
        setMessage("Game not found. Please check the code and try again.");
        return;
      }

      const gameDoc = snapshot.docs[0];
      router.push(`/game/${gameDoc.id}`);
    } catch (error) {
      console.error(error);
      setMessage("Unable to join game. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-4xl font-black text-fuchsia-500">Join a Game</h1>

        <p className="mt-3 text-gray-400">
          Enter the game code from the host screen to join.
        </p>

        <form
          onSubmit={handleJoin}
          className="mt-8 space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
        >
          <input
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 uppercase"
            placeholder="BTTB-9334"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-fuchsia-600 px-5 py-3 font-black text-white"
          >
            Join Game
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