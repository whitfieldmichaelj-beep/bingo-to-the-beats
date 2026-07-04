import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">
        <FeatureCard
          icon="🎵"
          title="Playlist Games"
          text="Create games from Spotify, Apple Music, TIDAL, Serato, or custom playlists."
        />
        <FeatureCard
          icon="📱"
          title="QR Code Join"
          text="Players scan, buy cards, and play instantly from their phones."
        />
        <FeatureCard
          icon="🏆"
          title="Live Winners"
          text="Verify one winner per game and calculate payout splits automatically."
        />
      </section>

      <Footer />
    </main>
  );
}