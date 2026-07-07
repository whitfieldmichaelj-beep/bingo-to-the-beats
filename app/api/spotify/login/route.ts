import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  console.log("SPOTIFY CLIENT ID:", clientId);
  console.log("SPOTIFY REDIRECT URI:", redirectUri);

  const scope = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
  ].join(" ");

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Missing Spotify environment variables" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}