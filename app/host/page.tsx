import Image from "next/image";
import Link from "next/link";

export default function HostPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Bingo to the Beats"
            width={130}
            height={80}
            className="h-auto w-[130px]"
          />
        </Link>

        <div className="hidden md:flex gap-8 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/host">Host</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <Link
          href="/login"
          className="rounded-xl border border-white px-5 py-2"
        >
          Login
        </Link>
      </nav>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-black text-orange-500">
          Host a Game
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Create a music bingo game, import playlists, generate QR codes,
          and manage players in real time.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            "Create Game",
            "Import Playlist",
            "Generate QR Code",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-fuchsia-500 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold">{item}</h2>
              <p className="mt-3 text-gray-400">
                Coming in Sprint 1.
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-8 text-center text-gray-500">
        © 2026 Bingo to the Beats™
      </footer>
    </main>
  );
}