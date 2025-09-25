// src/app/api/user/update/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/token";
import { updateProfileSchema } from "@/lib/schema";
import prisma from "../../../../../lib/prisma";

export async function PUT(req: Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyJwt(token);
    if (!payload)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
        NOT: { id: payload.id },
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "Email/Username sudah digunakan" },
        { status: 400 }
      );
    }

    const parsed = updateProfileSchema.parse(body);

    const updated = await prisma.user.update({
      where: { id: payload.id },
      data: {
        username: parsed.username,
        name: parsed.name,
        email: parsed.email,
        lastUsernameChange: new Date(Date.now()),
        // nomor HP tidak bisa diubah
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        number_phone: true,
        photo: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Profile UPDATE error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
