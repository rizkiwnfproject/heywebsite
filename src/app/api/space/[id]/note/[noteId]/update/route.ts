import prisma from "../../../../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  const { noteId } = await params;
  const body = await req.json();

  console.log("noteId:", noteId);
  console.log("body:", body);

  const note = await prisma.note.update({
    where: { id: noteId },
    data: {
      title: body.title ?? "",
      content: body.content ?? [], // langsung JSON
    },
  });

  return Response.json(note);
}
