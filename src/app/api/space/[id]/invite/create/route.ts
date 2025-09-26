import { verifyJwt } from "@/lib/token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { makeId } from "@/lib/utils";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token")?.value;
  if (!tokenCookie)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJwt(tokenCookie);
  if (!payload)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const token = makeId(12);

  const invite = await prisma.invite.create({
    data: {
      spaceId: id,
      token,
      createdBy: payload.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  return NextResponse.json({
    inviteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${invite.token}`,
  });
}
