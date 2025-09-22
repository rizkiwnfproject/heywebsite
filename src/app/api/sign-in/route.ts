import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { signJwt } from "@/lib/token";

export async function POST(req: Request) {
  const { username, phone } = await req.json();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || user.number_phone !== phone) {
    return NextResponse.json({ error: "Username/nomor telepon tidak ditemukan" }, { status: 401 });
  }

  const token = signJwt({ id: user.id, username: user.username });

  const res = NextResponse.json({ message: "Login Success" });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
