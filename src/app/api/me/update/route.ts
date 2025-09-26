// src/app/api/user/update/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/token";
import { updateProfileApiSchema } from "@/lib/schema";
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

    console.log("updateProfileApiSchema", updateProfileApiSchema);

    const parsed = updateProfileApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: parsed.error.issues.map((errors) => errors.message),
        },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: payload.id },
      data: {
        username: parsed.data.username,
        name: parsed.data.name,
        email: parsed.data.email,
        lastUsernameChange: new Date(Date.now()),
        photo: parsed.data.photo ?? undefined,
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
