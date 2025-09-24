import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const payload = token ? verifyJwt(token) : null;
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // 🚫 Belum login → boleh ke sign-in / sign-up saja
  if (!payload && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ✅ Sudah login → jangan boleh ke sign-in / sign-up
  if (payload && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url)); // bisa diganti "/message"
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!_next/static|_next/image|favicon.ico).*)",
    "/((?!sign-in|sign-up|api/sign-in|api/sign-up|_next/static|_next/image|favicon.ico).*)",
  ],
  runtime: "nodejs",
};
