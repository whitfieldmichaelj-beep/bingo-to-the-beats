type Player = {
  id: string;
  name: string;
};

export default function PlayerList({ players }: { players: Player[] }) {
  return (
    <div className="mt-4">
      <p className="mt-2 text-green-400">
        Players Joined: {players.length}
      </p>

      <div className="mt-4">
        {players.map((player) => (
          <p key={player.id} className="text-gray-300">
            👤 {player.name}
          </p>
        ))}
      </div>
    </div>
  );
}