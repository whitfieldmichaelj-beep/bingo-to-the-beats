"use client";

import { useEffect, useState } from "react";

type Playlist = {
  id: string;
  name: string;
  tracks: {
    total: number;
  };
};

export default function SpotifyPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlaylists() {
      try {
        const response = await fetch("/api/spotify/playlists");
        const data = await response.json();
        console.log("Spotify API status:", response.status);
console.log("Spotify API data:", data);
alert("Spotify API finished loading. Check console.");

        if (!response.ok) {
          setError(data.error || "Unable to load playlists.");
        } else {
          setPlaylists(data.items || []);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong loading Spotify.");
      } finally {
        setLoading(false);
      }
    }

    loadPlaylists();
  }, []);

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <a href="/dashboard" className="font-bold text-orange-400">
        ← Back to Dashboard
      </a>

      <h1 className="mt-8 text-4xl font-black text-fuchsia-400">
        Spotify Playlists
      </h1>

      {loading && <p className="mt-6 text-gray-400">Loading...</p>}

      {error && (
        <div className="mt-6 rounded-xl bg-red-900 p-4">
          <p>{error}</p>
          <a href="/api/spotify/login" className="mt-4 block text-orange-400">
            Connect Spotify Again
          </a>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <h2 className="text-xl font-black">{playlist.name}</h2>
            <p className="text-gray-400">{playlist.tracks.total} songs</p>

            <button className="mt-3 rounded-lg bg-orange-500 px-4 py-2 font-black text-black">
              Use Playlist
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}