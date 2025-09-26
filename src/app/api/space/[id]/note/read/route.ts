import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";
import prisma from "../../../../../../../lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const payload = verifyJwt(token!);
  if (!payload) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.note.findMany({
    where: {
      spaceId: id,
    },
    include: {
      User: true,
      Space: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return Response.json({ notes, currentUserId: payload.id });
}
