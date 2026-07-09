import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "orange" | "pink" | "outline";
};

export default function Button({ href, children, variant = "orange" }: ButtonProps) {
  const styles = {
    orange: "bg-orange-500 text-black hover:bg-orange-400",
    pink: "bg-fuchsia-600 text-white hover:bg-fuchsia-500",
    outline: "border border-white/40 text-white hover:border-fuchsia-500",
  };

  return (
    <Link
      href={href}
      className={`rounded-2xl px-8 py-4 text-lg font-black transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}