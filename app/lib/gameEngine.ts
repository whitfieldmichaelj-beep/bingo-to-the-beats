import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export type GameState = {
  currentSong: string;
  calledSongs: string[];
  songIndex: number;
};

export async function playSong(
  gameId: string,
  state: GameState,
  playlist: string[]
) {
  if (state.songIndex >= playlist.length) {
    throw new Error("Playlist complete.");
  }

  const nextSong = playlist[state.songIndex];

  await updateDoc(doc(db, "games", gameId), {
    currentSong: nextSong,
    songIndex: state.songIndex + 1,
    calledSongs: [...state.calledSongs, nextSong],
  });

  return nextSong;
}

export async function endGame(gameId: string) {
  await updateDoc(doc(db, "games", gameId), {
    status: "complete",
  });
}