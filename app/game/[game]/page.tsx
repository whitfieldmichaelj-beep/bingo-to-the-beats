"use client";

import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useParams } from "next/navigation";

import { db } from "@/lib/firebase";
import { checkBingo } from "@/lib/bingoEngine";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type Game = {
  gameName: string;
  venue: string;
  gameCode: string;
  status: string;
};

const bingoSongs = [
  "Juicy", "No Diggity", "Hot in Herre", "Yeah!", "Family Affair",
  "Get Low", "In Da Club", "U Got It Bad", "Lean Back", "This Is How We Do It",
  "One More Chance", "Candy Shop", "Empire State", "Return of the Mack", "Goodies",
  "Hypnotize", "Let Me Blow Ya Mind", "Tipsy", "Hey Ya!", "Dilemma",
  "Work It", "The Way You Move", "Always On Time", "Maria Maria", "Lose Control",
];

function createCardId() {
  return `CARD-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function GameLobbyPage() {
  const params = useParams();
  const gameId = params.game as string;

  const [game, setGame] = useState<Game | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [cardId, setCardId] = useState("");
  const [joined, setJoined] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [markedSongs, setMarkedSongs] = useState<string[]>([]);

  const hasBingo = checkBingo(bingoSongs, markedSongs);

  useEffect(() => {
    if (!gameId) return;

    const unsubscribe = onSnapshot(doc(db, "games", gameId), (snapshot) => {
      if (snapshot.exists()) {
        setGame(snapshot.data() as Game);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [gameId]);

  async function handleJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanName = playerName.trim();
    if (!cleanName) return;

    const newCardId = createCardId();

    await setDoc(doc(db, "games", gameId, "cards", newCardId), {
      cardId: newCardId,
      playerName: cleanName,
      songs: bingoSongs,
      markedSongs: [],
      claimed: false,
      winner: false,
      createdAt: serverTimestamp(),
    });

    await setDoc(doc(db, "games", gameId, "players", newCardId), {
      name: cleanName,
      cardId: newCardId,
      status: "waiting",
      joinedAt: serverTimestamp(),
    });

    setCardId(newCardId);
    setPlayerName(cleanName);
    setJoined(true);
  }

  async function toggleSong(song: string) {
    const updatedMarks = markedSongs.includes(song)
      ? markedSongs.filter((item) => item !== song)
      : [...markedSongs, song];

    setMarkedSongs(updatedMarks);

    if (cardId) {
      await setDoc(
        doc(db, "games", gameId, "cards", cardId),
        { markedSongs: updatedMarks },
        { merge: true }
      );
    }
  }

  async function callBingo() {
    if (!hasBingo || claimSubmitted || !cardId) return;

    await setDoc(doc(db, "games", gameId, "bingoClaims", cardId), {
      cardId,
      playerName,
      markedSongs,
      claimedAt: serverTimestamp(),
      status: "pending",
    });

    await setDoc(
      doc(db, "games", gameId, "cards", cardId),
      {
        claimed: true,
      },
      { merge: true }
    );

    setClaimSubmitted(true);
    setMessage("🎉 Bingo claim sent to host!");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading Game...
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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">
          <p className="font-bold uppercase tracking-widest text-fuchsia-400">
            Game Lobby
          </p>

          <h1 className="mt-4 text-5xl font-black">{game.gameName}</h1>
          <p className="mt-3 text-xl text-gray-400">{game.venue}</p>

          <p className="mt-8 text-3xl font-black text-fuchsia-400">
            Game Code: {game.gameCode}
          </p>

          {joined && (
            <p className="mt-3 text-sm font-bold text-orange-400">
              Card ID: {cardId}
            </p>
          )}

          {!joined ? (
            <form onSubmit={handleJoin} className="mx-auto mt-10 max-w-md space-y-4">
              <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
                placeholder="Enter your name"
                required
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-fuchsia-600 px-5 py-3 font-black text-white"
              >
                Join Game
              </button>
            </form>
          ) : game.status === "live" ? (
            <div className="mt-12 rounded-2xl bg-black p-8">
              <h2 className="text-4xl font-black text-green-400">
                🎵 Game Started!
              </h2>

              <p className="mt-4 text-xl text-gray-400">
                Mark five in a row to call Bingo.
              </p>

              <div className="mt-8 grid grid-cols-5 gap-2">
                {bingoSongs.map((song) => (
                  <button
                    key={song}
                    onClick={() => toggleSong(song)}
                    className={`aspect-square rounded-lg border border-zinc-700 p-2 text-xs font-bold transition-all ${
                      markedSongs.includes(song)
                        ? "bg-green-600 text-white"
                        : "bg-zinc-950 text-white hover:bg-fuchsia-700"
                    }`}
                  >
                    {song}
                  </button>
                ))}
              </div>

              {hasBingo && (
                <div className="mt-6 rounded-2xl bg-green-600 p-5">
                  <h3 className="text-3xl font-black">🎉 BINGO!</h3>
                  <p className="mt-2 text-white">Card ID: {cardId}</p>

                  <button
                    onClick={callBingo}
                    disabled={claimSubmitted}
                    className="mt-4 rounded-xl bg-black px-5 py-3 font-black text-white disabled:opacity-40"
                  >
                    {claimSubmitted ? "Bingo Claim Sent" : "Call Bingo"}
                  </button>
                </div>
              )}

              {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl bg-black p-8">
              <h2 className="text-4xl font-black">You’re in the Lobby!</h2>
              <p className="mt-4 text-xl text-gray-400">
                Waiting for the host to start the game...
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}