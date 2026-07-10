"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";

type Game = {
  gameName?: string;
  venue?: string;
  status?: string;
  currentSong?: string;
  calledSongs?: string[];
};

export default function ProjectorDisplayPage() {
  const params = useParams();
  const gameId = params.gameId as string;
  console.log("Display Game ID:", gameId);

  const [game, setGame] = useState<Game | null>(null);
  const [playerCount, setPlayerCount] = useState(0);
  const [claimCount, setClaimCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    const unsubscribeGame = onSnapshot(doc(db, "games", gameId), (snapshot) => {
      if (snapshot.exists()) {
        setGame(snapshot.data() as Game);
      }
      setLoading(false);
    });

    const unsubscribePlayers = onSnapshot(
      collection(db, "games", gameId, "players"),
      (snapshot) => setPlayerCount(snapshot.size)
    );

    const unsubscribeClaims = onSnapshot(
      collection(db, "games", gameId, "bingoClaims"),
      (snapshot) => setClaimCount(snapshot.size)
    );

    return () => {
      unsubscribeGame();
      unsubscribePlayers();
      unsubscribeClaims();
    };
  }, [gameId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading Display...
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
    <main className="min-h-screen bg-black p-10 text-white">
      <section className="mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center text-center">
        <p className="text-lg font-bold uppercase tracking-[0.4em] text-fuchsia-400">
          Bingo to the Beats
        </p>

        <h1 className="mt-6 text-6xl font-black">{game.gameName}</h1>
        <p className="mt-3 text-2xl text-gray-400">{game.venue}</p>

        <div className="mt-14 w-full rounded-[2rem] border border-fuchsia-700 bg-zinc-950 p-12">
          <p className="text-xl font-bold uppercase tracking-[0.35em] text-gray-400">
            Now Playing
          </p>

          <h2 className="mt-8 text-7xl font-black text-fuchsia-400">
            {game.currentSong || "Waiting for Host"}
          </h2>
        </div>

        <div className="mt-10 grid w-full gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
            <p className="text-gray-400">Players</p>
            <p className="mt-3 text-6xl font-black text-green-400">
              {playerCount}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
            <p className="text-gray-400">Bingo Claims</p>
            <p className="mt-3 text-6xl font-black text-yellow-300">
              {claimCount}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
            <p className="text-gray-400">Status</p>
            <p className="mt-3 text-5xl font-black text-orange-400">
              {game.status}
            </p>
          </div>
        </div>

        <div className="mt-10 w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <p className="text-xl font-black text-gray-300">Last Songs</p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {(game.calledSongs || []).slice(-6).reverse().map((song, index) => (
              <p key={`${song}-${index}`} className="text-2xl text-gray-300">
                {song}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}