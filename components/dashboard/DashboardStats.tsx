type DashboardStatsProps = {
  activeGames: number;
  totalPlayers: number;
  totalCards: number;
  totalRevenue: number;
};

export default function DashboardStats({
  activeGames,
  totalPlayers,
  totalCards,
  totalRevenue,
}: DashboardStatsProps) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-4">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-gray-500">Active Games</p>
        <p className="mt-3 text-4xl font-black">{activeGames}</p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-gray-500">Players Today</p>
        <p className="mt-3 text-4xl font-black">{totalPlayers}</p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-gray-500">Cards Sold</p>
        <p className="mt-3 text-4xl font-black">{totalCards}</p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-gray-500">Revenue</p>
        <p className="mt-3 text-4xl font-black">${totalRevenue}</p>
      </div>
    </div>
  );
}