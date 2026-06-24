import { NextResponse, type NextRequest } from "next/server";

// Path-based language: `/ar*` is Arabic, everything else is English. The value
// is forwarded as a header so the root layout can set <html lang/dir> during
// SSR (the layout renders <html>, so it can't read the route params directly).
const LANG_HEADER = "x-binaa-lang";

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.pathname.startsWith("/ar") ? "ar" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANG_HEADER, lang);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/ar"],
};
