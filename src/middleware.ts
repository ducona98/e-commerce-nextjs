import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isValidToken } from "@/lib";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"];

export function middleware(request: NextRequest) {
  const token = request.cookies?.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = PUBLIC_ROUTES.includes(pathname);
  const isValid = isValidToken(token);

  if (isValid && isAuthRoute)
    return NextResponse.redirect(new URL("/", request.url));

  if (!isValid && !isAuthRoute)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
