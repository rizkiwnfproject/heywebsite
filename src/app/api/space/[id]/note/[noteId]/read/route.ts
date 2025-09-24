import { NextResponse } from "next/server";
import prisma from "../../../../../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  const { noteId } = await params;
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: { Space: true, User: true },
  });

  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}
