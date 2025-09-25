import { verifyJwt } from "@/lib/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { makeId } from "@/lib/utils";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token")?.value;
  if (!tokenCookie)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJwt(tokenCookie);
  if (!payload)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  // const member = await prisma.spaceMember.findUnique({
  //   where: { spaceId_userId: { spaceId: params.id, userId: payload.id } },
  // });
  // if (!member || member.role !== "ADMIN") {
  //   return NextResponse.json(
  //     { error: "Only admins can generate invites" },
  //     { status: 403 }
  //   );
  // }

  const token = makeId(12);

  const invite = await prisma.invite.create({
    data: {
      spaceId: params.id,
      token,
      createdBy: payload.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  return NextResponse.json({
    inviteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${invite.token}`,
  });
}
