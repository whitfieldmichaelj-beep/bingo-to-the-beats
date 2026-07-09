"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth, db } from "@/lib/firebase";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

function generateGameCode() {
  return `BTTB-${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function CreateGamePage() {
  const router = useRouter();

  const [gameName, setGameName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [cardPrice, setCardPrice] = useState("10");
  const [payoutSplit, setPayoutSplit] = useState("30/70");
  const [playlistSource, setPlaylistSource] = useState("Spotify");
  const [message, setMessage] = useState("");

  async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Creating game...");

    const user = auth.currentUser;

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const gameCode = generateGameCode();

      await addDoc(collection(db, "games"), {
        gameCode,
        hostUid: user.uid,
        hostEmail: user.email,
        gameName,
        venue,
        date,
        startTime,
        cardPrice: Number(cardPrice),
        payoutSplit,
        playlistSource,
        status: "waiting",
        players: 0,
        cardsSold: 0,
        revenue: 0,
        createdAt: serverTimestamp(),
      });

      setMessage(`Game Created! Code: ${gameCode}`);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Unable to create game.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
          Create Game
        </p>

        <h1 className="mt-2 text-5xl font-black">Set Up Your Game</h1>

        <p className="mt-4 text-gray-400">
          Create your event, set the card price, choose payout settings, and
          prepare your game code.
        </p>

        <form
          onSubmit={handleCreateGame}
          className="mt-10 space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-8"
        >
          <input
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
            placeholder="Game name"
            required
          />

          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
            placeholder="Venue"
            required
          />

          <div className="grid gap-6 md:grid-cols-2">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
              required
            />

            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              type="time"
              className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <select
              value={cardPrice}
              onChange={(e) => setCardPrice(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
            >
              <option value="0">Free</option>
              <option value="5">$5</option>
              <option value="10">$10</option>
              <option value="15">$15</option>
              <option value="20">$20</option>
            </select>

            <select
              value={payoutSplit}
              onChange={(e) => setPayoutSplit(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
            >
              <option value="50/50">50/50</option>
              <option value="40/60">40/60 - Winner Gets 60%</option>
              <option value="30/70">30/70 - Winner Gets 70%</option>
              <option value="fixed">Fixed Prize</option>
            </select>
          </div>

          <select
            value={playlistSource}
            onChange={(e) => setPlaylistSource(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
          >
            <option>Custom Playlist</option>
            <option>Spotify</option>
            <option>Serato CSV</option>
            <option>Apple Music</option>
            <option>TIDAL</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-2xl bg-orange-500 px-6 py-4 font-black text-black"
          >
            Generate Game
          </button>

          {message && (
            <p className="rounded-xl bg-zinc-900 p-4 text-center text-gray-300">
              {message}
            </p>
          )}
        </form>
      </section>

      <Footer />
    </main>
  );
}