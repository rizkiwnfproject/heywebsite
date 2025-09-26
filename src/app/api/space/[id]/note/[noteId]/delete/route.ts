import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";
import prisma from "../../../../../../../../lib/prisma";

export async function DELETE(
req: NextRequest,
  context: { params: Promise<{ id: string, noteId:string }> }
) {
    const { id, noteId } = await context.params;

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const payload = verifyJwt(token!);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: { Space: true },
  });

  if (!note || note.spaceId !== id) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  const spaceMember = await prisma.spaceMember.findFirst({
    where: {
      spaceId: id,
      userId: payload.id,
    },
  });

  if (!spaceMember || (spaceMember.role !== "ADMIN" && note.userId !== payload.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  return NextResponse.json({ message: "Note deleted successfully" });
}
