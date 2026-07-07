import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToHostGames(
  uid: string,
  callback: (games: any[]) => void
) {
  const q = query(
    collection(db, "games"),
    where("hostUid", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {
    const games = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(games);
  });
}

export function subscribeToPlayers(
  gameId: string,
  callback: (players: any[]) => void
) {
  return onSnapshot(
    collection(db, "games", gameId, "players"),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }
  );
}
export function subscribeToBingoClaims(
  gameId: string,
  callback: (claims: any[]) => void
) {
  return onSnapshot(
    collection(db, "games", gameId, "bingoClaims"),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}))
      );
    }
  );
}
