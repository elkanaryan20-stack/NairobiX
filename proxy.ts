import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "nairobix.com";

/**
 * Redirects www.nairobix.com to the canonical apex domain so search engines
 * and social crawlers only ever see one host for a given URL. API routes are
 * excluded so the existing Zoho OAuth redirect URIs (registered against the
 * www host in Zoho's app console) keep working unchanged.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === `www.${CANONICAL_HOST}`) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image).*)"],
};
