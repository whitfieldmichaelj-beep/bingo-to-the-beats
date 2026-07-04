import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-4xl font-black text-orange-500">Host Login</h1>
        <p className="mt-3 text-gray-400">
          Sign in to manage your Bingo to the Beats games.
        </p>

        <form className="mt-8 space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3" placeholder="Email address" type="email" />
          <input className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3" placeholder="Password" type="password" />

          <button className="w-full rounded-xl bg-orange-500 px-5 py-3 font-black text-black">
            Sign In
          </button>

          <p className="text-center text-sm text-gray-400">
            New host? <a className="text-fuchsia-400" href="/register">Create account</a>
          </p>
        </form>
      </section>

      <Footer />
    </main>
  );
}