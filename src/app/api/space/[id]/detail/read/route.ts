import { cookies } from "next/headers";
import prisma from "../../../../../../../lib/prisma";
import { verifyJwt } from "@/lib/token";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const space = await prisma.space.findUnique({
    where: { id: id },
    include: {
      Note: true,
      SpaceMember: {
        include: {
          User: true,
        },
        orderBy: { joinedAt: "asc" },
      },
      Invite: true,
      creator: true,
    },
  });

  if (!space) {
    return Response.json({ error: "Space not found" }, { status: 404 });
  }

  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token")?.value;

  if (!tokenCookie) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyJwt(tokenCookie);
  if (!payload) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
  const myRole = space.SpaceMember.find((m) => m.userId === payload.id)?.role;

  return Response.json({ ...space, role: myRole });
}
