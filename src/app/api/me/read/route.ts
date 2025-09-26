import { verifyJwt } from "@/lib/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyJwt(token);
    if (!payload)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    const totalSpaces = await prisma.spaceMember.count({
      where: { userId: payload.id },
    });

    return NextResponse.json({...user, totalSpaces});
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
