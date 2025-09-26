import { NextRequest } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const space = await prisma.invite.findUnique({
    where: { id: id },
    include: {
      Space: true,
    },
  });

  if (!space) {
    return Response.json({ error: "Space not found" }, { status: 404 });
  }

  return Response.json(space);
}
