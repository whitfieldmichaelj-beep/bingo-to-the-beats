import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-black text-orange-500">Pricing</h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Flexible plans for DJs, venues, and private events.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["Starter", "$29/mo", "For small private games and testing."],
            ["Pro DJ", "$59/mo", "For DJs hosting recurring events."],
            ["Venue", "$99/mo", "For bars, restaurants, and venues."],
          ].map(([name, price, text]) => (
            <div key={name} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h2 className="text-2xl font-black">{name}</h2>
              <p className="mt-4 text-4xl font-black text-fuchsia-500">{price}</p>
              <p className="mt-4 text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}