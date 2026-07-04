import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400">
              Host Dashboard
            </p>
            <h1 className="mt-2 text-5xl font-black">Welcome, DJ Mike Doelo</h1>
            <p className="mt-4 max-w-2xl text-gray-400">
              Create games, manage players, generate QR codes, and run live music bingo events.
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
          {[
            ["Active Games", "0"],
            ["Players Today", "0"],
            ["Cards Sold", "0"],
            ["Revenue", "$0"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-gray-500">{label}</p>
              <p className="mt-3 text-4xl font-black text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="text-2xl font-black">My Games</h2>
          <p className="mt-3 text-gray-400">No games created yet.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}