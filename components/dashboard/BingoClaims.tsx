type BingoClaim = {
  id: string;
  playerName: string;
  cardId?: string;
  status: string;
};

type BingoClaimsProps = {
  claims: BingoClaim[];
  gameId: string;
  onUpdateClaim: (
    gameId: string,
    claimId: string,
    status: "approved" | "rejected"
  ) => void;
};

export default function BingoClaims({
  claims,
  gameId,
  onUpdateClaim,
}: BingoClaimsProps) {
  if (claims.length === 0) return null;

  return (
    <div className="mt-6 rounded-xl bg-yellow-900 p-4">
      <h4 className="font-black text-yellow-300">🎉 Bingo Claims</h4>

      {claims.map((claim) => (
        <div key={claim.id} className="mt-3 rounded-lg bg-black p-3">
          <p className="font-bold">{claim.playerName}</p>
          <p className="text-sm text-orange-400">Card ID: {claim.cardId}</p>
          <p className="text-sm text-gray-400">Status: {claim.status}</p>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => onUpdateClaim(gameId, claim.id, "approved")}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-black text-white"
            >
              Approve
            </button>

            <button
              onClick={() => onUpdateClaim(gameId, claim.id, "rejected")}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}