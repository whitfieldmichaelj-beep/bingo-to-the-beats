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

type Game = {
  id: string;
  gameName: string;
  venue: string;
  gameCode: string;
  status: string;
  cardsSold: number;
  revenue: number;
};

type Player = {
  id: string;
  name: string;
};

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

  const totalCards = games.reduce((sum, game) => sum + Number(game.cardsSold || 0), 0);
  const totalRevenue = games.reduce((sum, game) => sum + Number(game.revenue || 0), 0);

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

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-gray-500">Active Games</p>
            <p className="mt-3 text-4xl font-black">{games.length}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-gray-500">Players Today</p>
            <p className="mt-3 text-4xl font-black">{totalPlayers}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-gray-500">Cards Sold</p>
            <p className="mt-3 text-4xl font-black">{totalCards}</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-gray-500">Revenue</p>
            <p className="mt-3 text-4xl font-black">${totalRevenue}</p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="text-2xl font-black">My Games</h2>

          {loading && <p className="mt-4 text-gray-400">Loading games...</p>}

          <div className="mt-6 grid gap-4">
            {games.map((game) => {
              const players = playersByGame[game.id] || [];
              const claims = claimsByGame[game.id] || [];

              return (
                <div key={game.id} className="rounded-2xl border border-zinc-800 bg-black p-5">
                  <h3 className="text-xl font-black">{game.gameName}</h3>
                  <p className="text-gray-400">{game.venue}</p>

                  <p className="mt-2 text-sm font-bold text-fuchsia-400">
                    Game Code: {game.gameCode}
                  </p>

                  <p className="mt-2 text-orange-400">Status: {game.status}</p>

                  <p className="mt-2 text-green-400">
                    Players Joined: {players.length}
                  </p>

                  <div className="mt-4">
                    {players.map((player) => (
                      <p key={player.id} className="text-gray-300">
                        👤 {player.name}
                      </p>
                    ))}
                  </div>

                  {claims.length > 0 && (
                    <div className="mt-6 rounded-xl bg-yellow-900 p-4">
                      <h4 className="font-black text-yellow-300">🎉 Bingo Claims</h4>

                      {claims.map((claim: any) => (
                        <div key={claim.id} className="mt-3 rounded-lg bg-black p-3">
                          <p className="font-bold">{claim.playerName}</p>
                          <p className="text-sm text-orange-400">Card ID: {claim.cardId}</p>
                          <p className="text-sm text-gray-400">Status: {claim.status}</p>
                          <div className="mt-3 flex gap-3">
  <button
    onClick={() => updateClaimStatus(game.id, claim.id, "approved")}
    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-black text-white"
  >
    Approve
  </button>

  <button
    onClick={() => updateClaimStatus(game.id, claim.id, "rejected")}
    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white"
  >
    Reject
  </button>
</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => startGame(game.id)}
                    disabled={players.length === 0 || game.status === "live"}
                    className="mt-5 rounded-xl bg-fuchsia-600 px-5 py-3 font-black text-white disabled:opacity-40"
                  >
                    {game.status === "live" ? "Game Started" : "Start Game"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}