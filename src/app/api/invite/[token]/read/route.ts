import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";
import prisma from "../../../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token")?.value;
  if (!tokenCookie)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJwt(tokenCookie);
  if (!payload)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const invite = await prisma.invite.findUnique({
    where: { token: params.token },
    include: { Space: true },
  });

  if (!invite || !invite.isActive) {
    return NextResponse.json({ error: "Invalid invite" }, { status: 400 });
  }

  if (invite.expiresAt && invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite expired" }, { status: 400 });
  }

  // cek apakah user sudah member
  const existingMember = await prisma.spaceMember.findUnique({
    where: { spaceId_userId: { spaceId: invite.spaceId, userId: payload.id } },
  });

  if (existingMember) {
    return NextResponse.json({ redirect: `/${invite.spaceId}/message` });
  }

  // tentukan status berdasarkan permission
  const status = invite.Space.permission ? "PENDING" : "ACCEPTED";

  await prisma.spaceMember.create({
    data: {
      spaceId: invite.spaceId,
      userId: payload.id,
      status,
    },
  });

  return NextResponse.json({
    message:
      status === "PENDING"
        ? "Request bergabung terkirim, menunggu persetujuan admin."
        : "Berhasil bergabung ke space.",
    redirect: status === "PENDING" ? "/" : `/${invite.spaceId}/message`,
  });
}
