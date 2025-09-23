import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}
export const config = {
  // matcher: ["/dashboard/:path*", "/api/protected/:path*"],
  matcher: [
    "/((?!sign-in|sign-up|api/sign-in|api/sign-up|_next/static|_next/image|favicon.ico).*)",
  ],
  runtime: "nodejs",
};
