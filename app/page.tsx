import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4">
        <Image src="/logo.png" alt="Bingo to the Beats" width={140} height={90} />
        <div className="hidden md:flex gap-8 text-sm font-bold">
          <a href="/">Home</a>
          <a href="/host">Host a Game</a>
          <a href="/join">Players</a>
          <a href="/pricing">Pricing</a>
          <a href="/contact">Contact</a>
        </div>
        <a className="rounded-xl border border-white px-5 py-2 font-bold" href="/login">
          Login
        </a>
      </nav>

      <section className="relative px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7c1fff55,transparent_55%)]" />

        <div className="relative mx-auto max-w-5xl">
          <Image
            src="/logo.png"
            alt="Bingo to the Beats"
            width={520}
            height={360}
            className="mx-auto"
            priority
          />

          <h1 className="mt-6 text-4xl font-black md:text-6xl">
            Where <span className="text-orange-400">Bingo</span> Meets The{" "}
            <span className="text-pink-500">Beats</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-xl text-gray-300">
            The ultimate live music bingo platform for DJs, venues, parties, fundraisers, and events.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <a href="/host" className="rounded-2xl bg-orange-500 px-8 py-4 text-lg font-black text-black">
              Host a Game
            </a>
            <a href="/join" className="rounded-2xl bg-fuchsia-600 px-8 py-4 text-lg font-black">
              Join a Game
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">
        {[
          ["🎵 Playlist Games", "Create bingo games from Spotify, Apple Music, TIDAL, Serato, or custom playlists."],
          ["📱 QR Code Join", "Players scan, buy cards, and play instantly from their phones."],
          ["🏆 Live Winners", "Verify one winner per game and calculate payout splits automatically."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl border border-fuchsia-500/30 bg-zinc-950 p-7 shadow-xl">
            <h2 className="text-2xl font-black">{title}</h2>
            <p className="mt-3 text-gray-400">{text}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-zinc-800 py-8 text-center text-gray-500">
        © 2026 Bingo to the Beats™
      </footer>
    </main>
  );
}