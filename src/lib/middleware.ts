import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}
export const config = {
  //   matcher: ["/dashboard/:path*", "/api/protected/:path*"],
  matcher: ["/((?!sign-in|sign-up).*)"],
};
