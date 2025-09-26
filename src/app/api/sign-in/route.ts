import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { signJwt } from "@/lib/token";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || user.email !== email) {
    return NextResponse.json(
      { error: "Username/Email tidak ditemukan" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
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
