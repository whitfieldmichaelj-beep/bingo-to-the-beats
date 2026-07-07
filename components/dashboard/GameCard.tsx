import PlayerList from "./PlayerList";
import BingoClaims from "./BingoClaims";
import SongController from "./SongController";

type Game = {
  id: string;
  gameName: string;
  venue: string;
  gameCode: string;
  status: string;
  currentSong?: string;
  calledSongs?: string[];
};

type Player = {
  id: string;
  name: string;
};

type GameCardProps = {
  game: Game;
  players: Player[];
  claims: any[];
  onStartGame: (gameId: string) => void;
  onPlayNextSong: (game: Game) => void;
  onUpdateClaim: (
    gameId: string,
    claimId: string,
    status: "approved" | "rejected"
  ) => void;
};

export default function GameCard({
  game,
  players,
  claims,
  onStartGame,
  onPlayNextSong,
  onUpdateClaim,
}: GameCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-5">
      <h3 className="text-xl font-black">{game.gameName}</h3>
      <p className="text-gray-400">{game.venue}</p>

      <p className="mt-2 text-sm font-bold text-fuchsia-400">
        Game Code: {game.gameCode}
      </p>

      <p className="mt-2 text-orange-400">Status: {game.status}</p>

      <SongController game={game} onPlayNextSong={onPlayNextSong} />

      <PlayerList players={players} />

      <BingoClaims
        claims={claims}
        gameId={game.id}
        onUpdateClaim={onUpdateClaim}
      />

      <button
        onClick={() => onStartGame(game.id)}
        disabled={players.length === 0 || game.status === "live"}
        className="mt-5 rounded-xl bg-fuchsia-600 px-5 py-3 font-black text-white disabled:opacity-40"
      >
        {game.status === "live" ? "Game Started" : "Start Game"}
      </button>
    </div>
  );
}