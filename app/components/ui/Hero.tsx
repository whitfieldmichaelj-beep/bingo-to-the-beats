import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative px-6 py-16 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#a21caf55,transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        <Image
          src="/logo.png"
          alt="Bingo to the Beats"
          width={520}
          height={360}
          priority
          className="mx-auto h-auto w-full max-w-[520px]"
        />

        <h1 className="mt-6 text-4xl font-black md:text-6xl">
          Where <span className="text-orange-400">Bingo</span> Meets The{" "}
          <span className="text-fuchsia-500">Beats</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-xl text-gray-300">
          The ultimate live music bingo platform for DJs, venues, parties,
          fundraisers, and events.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Button href="/host">Host a Game</Button>
          <Button href="/join" variant="pink">
            Join a Game
          </Button>
        </div>
      </div>
    </section>
  );
}