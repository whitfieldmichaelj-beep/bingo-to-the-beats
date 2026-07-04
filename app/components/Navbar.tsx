import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Bingo to the Beats"
          width={130}
          height={80}
          priority
          className="h-auto w-[130px]"
        />
      </Link>

      <div className="hidden gap-8 text-sm font-bold md:flex">
        <Link href="/">Home</Link>
        <Link href="/host">Host</Link>
        <Link href="/join">Join</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <Link
        href="/login"
        className="rounded-xl border border-white/40 px-5 py-2 font-bold hover:border-fuchsia-500"
      >
        Login
      </Link>
    </nav>
  );
}