import { NextRequest } from "next/server";
import prisma from "../../../../../../../../lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string; noteId: string }> }
) {
  const { id, noteId } = await context.params;

  const body = await req.json();

  const note = await prisma.note.update({
    where: { id: noteId },
    data: {
      title: body.title ?? "",
      content: body.content ?? [], 
    },
  });

  return Response.json(note);
}
