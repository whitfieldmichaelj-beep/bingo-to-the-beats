import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!code) {
    return NextResponse.json(
      { error: "Missing Spotify authorization code" },
      { status: 400 }
    );
  }

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Missing Spotify environment variables" },
      { status: 500 }
    );
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
  return NextResponse.json(data, { status: response.status });
}

const redirect = NextResponse.redirect(
  "http://127.0.0.1:3000/spotify"
);

redirect.cookies.set("spotify_access_token", data.access_token, {
  httpOnly: true,
  secure: false,
  path: "/",
  maxAge: data.expires_in,
});

redirect.cookies.set("spotify_refresh_token", data.refresh_token, {
  httpOnly: true,
  secure: false,
  path: "/",
});

return redirect;
}