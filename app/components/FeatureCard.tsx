type FeatureCardProps = {
  icon: string;
  title: string;
  text: string;
};

export default function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-fuchsia-500/30 bg-zinc-950 p-7 shadow-xl transition hover:-translate-y-1 hover:border-fuchsia-400">
      <div className="text-4xl">{icon}</div>
      <h2 className="mt-4 text-2xl font-black">{title}</h2>
      <p className="mt-3 text-gray-400">{text}</p>
    </div>
  );
}