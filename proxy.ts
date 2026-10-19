import { NextResponse, type NextRequest } from "next/server";

/**
 * The old menu linked to /FAQ/ (upper case) while the sitemap uses /faq/.
 * next.config redirects are case-insensitive, so the exact-case check lives here.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/FAQ/" || pathname === "/FAQ") {
    return NextResponse.redirect(new URL("/faq/", request.url), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/FAQ", "/FAQ/"],
};
