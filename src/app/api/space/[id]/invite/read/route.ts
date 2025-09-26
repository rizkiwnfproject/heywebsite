import { NextRequest } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
const { id } = params;
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
