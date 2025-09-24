import prisma from "../../../../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const {id} = await params
  const space = await prisma.space.findUnique({
    where: { id: id },
    include: {
      Note: true,
      SpaceMember: true,
      Invite: true,
    },
  });

  if (!space) {
    return Response.json({ error: "Space not found" }, { status: 404 });
  }

  return Response.json(space);
}
