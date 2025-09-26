import { NextResponse } from "next/server";
import prisma from "../../../../../../../../lib/prisma";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";

export async function GET(
  req: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  const { noteId } = await params;

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const payload = verifyJwt(token!);
  if (!payload) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: {
      Space: true,
      User: true,
    },
  });

  const spaceMember = await prisma.spaceMember.findFirst({
    where: {
      // spaceId: note.spaceId,
      userId: payload.id,
    },
  });

  if (!spaceMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // return note + role user
  return NextResponse.json({
    ...note,
    role: spaceMember.role,
  });
}
