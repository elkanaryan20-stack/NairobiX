import { NextResponse } from "next/server";

const ZOHO_ACCOUNTS_URL =
  process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return new NextResponse(
        `Zoho authorization failed: ${error}`,
        { status: 400 }
      );
    }

    if (!code) {
      return new NextResponse(
        "No Zoho authorization code was provided.",
        { status: 400 }
      );
    }

    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return new NextResponse(
        "Zoho OAuth credentials are not configured.",
        { status: 500 }
      );
    }

    const tokenResponse = await fetch(
      `${ZOHO_ACCOUNTS_URL}/oauth/v2/token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          redirect_uri:
            "https://www.nairobix.com/api/auth/zoho/callback",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Zoho token exchange failed", tokenData);

      return new NextResponse(
        "Zoho token exchange failed. Check the Vercel logs.",
        { status: 500 }
      );
    }

    if (!tokenData.refresh_token) {
      console.error(
        "Zoho refresh token missing",
        tokenData
      );

      return new NextResponse(
        "Zoho did not return a refresh token. Check the Vercel logs.",
        { status: 500 }
      );
    }

    console.log(
      "ZOHO_REFRESH_TOKEN:",
      tokenData.refresh_token
    );

    return new NextResponse(
      "Zoho authorization successful. The refresh token has been generated. Check your Vercel function logs for the refresh token.",
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Zoho OAuth callback error",
      error
    );

    return new NextResponse(
      "Zoho OAuth callback failed.",
      { status: 500 }
    );
  }
}