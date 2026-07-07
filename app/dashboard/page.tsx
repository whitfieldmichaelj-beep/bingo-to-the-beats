"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth, db } from "@/lib/firebase";
import {
  subscribeToHostGames,
  subscribeToPlayers,
  subscribeToBingoClaims,
} from "@/lib/gameService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardStats from "../../components/dashboard/DashboardStats";
import GameCard from "../../components/dashboard/GameCard";

type Game = {
  id: string;
  gameName: string;
  venue: string;
  gameCode: string;
  status: string;
  cardsSold: number;
  revenue: number;
  currentSong?: string;
  calledSongs?: string[];
  songIndex?: number;
};

type Player = {
  id: string;
  name: string;
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

export default function DashboardPage() {
  const router = useRouter();

  const [games, setGames] = useState<Game[]>([]);
  const [playersByGame, setPlayersByGame] = useState<Record<string, Player[]>>({});
  const [claimsByGame, setClaimsByGame] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const unsubscribeGames = subscribeToHostGames(user.uid, (userGames) => {
        setGames(userGames as Game[]);
        setLoading(false);

        userGames.forEach((game: any) => {
          subscribeToPlayers(game.id, (players) => {
            setPlayersByGame((prev) => ({
              ...prev,
              [game.id]: players as Player[],
            }));
          });

          subscribeToBingoClaims(game.id, (claims) => {
            setClaimsByGame((prev) => ({
              ...prev,
              [game.id]: claims,
            }));
          });
        });
      });

      return () => unsubscribeGames();
    });

    return () => unsubscribeAuth();
  }, [router]);

  async function startGame(gameId: string) {
    await updateDoc(doc(db, "games", gameId), {
      status: "live",
      currentSong: "",
      calledSongs: [],
      songIndex: 0,
    });
  }

  async function playNextSong(game: Game) {
    const currentIndex = game.songIndex || 0;

    if (currentIndex >= tempSongs.length) {
      alert("All songs have been played.");
      return;
    }

    const nextSong = tempSongs[currentIndex];

    await updateDoc(doc(db, "games", game.id), {
      currentSong: nextSong,
      songIndex: currentIndex + 1,
      calledSongs: [...(game.calledSongs || []), nextSong],
    });
  }

  async function updateClaimStatus(
    gameId: string,
    claimId: string,
    status: "approved" | "rejected"
  ) {
    try {
      await updateDoc(doc(db, "games", gameId, "bingoClaims", claimId), {
        status,
      });

      alert(`Claim ${status}`);
    } catch (error) {
      console.error(error);
      alert("Could not update claim status.");
    }
  }

  const totalPlayers = Object.values(playersByGame).reduce(
    (sum, players) => sum + players.length,
    0
  );

  const totalCards = games.reduce(
    (sum, game) => sum + Number(game.cardsSold || 0),
    0
  );

  const totalRevenue = games.reduce(
    (sum, game) => sum + Number(game.revenue || 0),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
              Host Dashboard
            </p>
            <h1 className="mt-2 text-5xl font-black">Welcome Back</h1>
            <p className="mt-4 text-gray-400">
              Create games, manage players, generate QR codes, and run live Bingo to the Beats events.
            </p>
          </div>

          <a
            href="/dashboard/create-game"
            className="rounded-2xl bg-orange-500 px-6 py-4 font-black text-black"
          >
            + Create Game
          </a>
        </div>

        <DashboardStats
          activeGames={games.length}
          totalPlayers={totalPlayers}
          totalCards={totalCards}
          totalRevenue={totalRevenue}
        />

        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="text-2xl font-black">My Games</h2>

          {loading && <p className="mt-4 text-gray-400">Loading games...</p>}

          {!loading && games.length === 0 && (
            <p className="mt-4 text-gray-400">No games created yet.</p>
          )}

          <div className="mt-6 grid gap-4">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                players={playersByGame[game.id] || []}
                claims={claimsByGame[game.id] || []}
                onStartGame={startGame}
                onPlayNextSong={playNextSong}
                onUpdateClaim={updateClaimStatus}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}