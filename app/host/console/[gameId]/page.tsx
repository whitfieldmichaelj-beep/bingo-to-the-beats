"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { playSong, endGame as endGameEngine } from "@/lib/gameEngine";

type Game = {
  id?: string;
  gameName?: string;
  venue?: string;
  gameCode?: string;
  status?: string;
  currentSong?: string;
  calledSongs?: string[];
  songIndex?: number;
};

const tempSongs = [
  "Juicy",
  "No Diggity",
  "Hot in Herre",
  "Yeah!",
  "Family Affair",
  "Get Low",
  "In Da Club",
  "U Got It Bad",
  "Lean Back",
  "This Is How We Do It",
];

export default function LiveHostConsolePage() {
  const params = useParams();
  const gameId = params.gameId as string;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    const unsubscribe = onSnapshot(doc(db, "games", gameId), (snapshot) => {
      if (snapshot.exists()) {
        setGame({ id: snapshot.id, ...snapshot.data() } as Game);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [gameId]);

  async function playNextSong() {
    if (!game || !game.id) return;

    try {
      await playSong(
        game.id,
        {
          currentSong: game.currentSong || "",
          calledSongs: game.calledSongs || [],
          songIndex: game.songIndex || 0,
        },
        tempSongs
      );
    } catch (error) {
      alert("All songs have been played.");
    }
  }

  async function handleEndGame() {
    if (!game || !game.id) return;

    await endGameEngine(game.id);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading Host Console...
      </main>
    );
  }

  if (!game) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Game not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <section className="mx-auto max-w-6xl">
        <a href="/dashboard" className="text-sm font-bold text-orange-400">
          ← Back to Dashboard
        </a>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
            Bingo to the Beats Host Console
          </p>

          <h1 className="mt-3 text-5xl font-black">
            {game.gameName || "Live Game"}
          </h1>

          <p className="mt-2 text-gray-400">{game.venue}</p>
          <p className="mt-2 text-orange-400">Status: {game.status}</p>
          <p className="mt-2 text-fuchsia-400">Game Code: {game.gameCode}</p>

          <div className="mt-10 rounded-3xl border border-fuchsia-700 bg-black p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Now Playing
            </p>

            <h2 className="mt-4 text-6xl font-black text-fuchsia-400">
              {game.currentSong || "Waiting..."}
            </h2>

            <button
              onClick={playNextSong}
              className="mt-8 rounded-2xl bg-orange-500 px-8 py-4 text-xl font-black text-black"
            >
              ▶ Play Next Song
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <h3 className="text-2xl font-black">Called Songs</h3>

              <div className="mt-4 space-y-2">
                {(game.calledSongs || []).map((song, index) => (
                  <p key={`${song}-${index}`} className="text-gray-300">
                    {index + 1}. {song}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <h3 className="text-2xl font-black">Game Controls</h3>

              <button
                onClick={handleEndGame}
                className="mt-5 rounded-xl bg-red-600 px-5 py-3 font-black text-white"
              >
                End Game
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}