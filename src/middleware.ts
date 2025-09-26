import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const payload = token ? verifyJwt(token) : null;

  // console.log("Middleware check:", { pathname, token, payload });

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  if (!payload && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (payload && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
    // "/((?!sign-in|sign-up|api/sign-in|api/sign-up|_next/static|_next/image|favicon.ico|assets).*)",
  ],
  runtime: "nodejs",
};
