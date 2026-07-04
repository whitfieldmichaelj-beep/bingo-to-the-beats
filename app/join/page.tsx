import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-black text-fuchsia-500">Join a Game</h1>

        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Enter a game code or scan a QR code to play Bingo to the Beats from your phone.
        </p>

        <div className="mt-10 max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <input
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
            placeholder="Enter game code"
          />

          <button className="mt-4 w-full rounded-xl bg-fuchsia-600 px-5 py-3 font-black text-white">
            Join Game
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}