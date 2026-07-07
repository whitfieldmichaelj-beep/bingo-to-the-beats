type Game = {
  id: string;
  status: string;
  currentSong?: string;
  calledSongs?: string[];
};

type SongControllerProps = {
  game: Game;
  onPlayNextSong: (game: Game) => void;
};

export default function SongController({
  game,
  onPlayNextSong,
}: SongControllerProps) {
  if (game.status !== "live") return null;

  return (
    <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-sm font-bold text-gray-400">Current Song</p>

      <h4 className="mt-2 text-2xl font-black text-fuchsia-400">
        {game.currentSong || "No song playing yet"}
      </h4>

      <button
        onClick={() => onPlayNextSong(game)}
        className="mt-4 rounded-xl bg-orange-500 px-5 py-3 font-black text-black"
      >
        ▶ Play Next Song
      </button>

      <div className="mt-5">
        <p className="text-sm font-bold text-gray-400">Called Songs</p>

        <div className="mt-2 space-y-1">
          {(game.calledSongs || []).map((song, index) => (
            <p key={`${song}-${index}`} className="text-sm text-gray-300">
              {index + 1}. {song}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}