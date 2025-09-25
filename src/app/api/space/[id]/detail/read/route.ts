import { cookies } from "next/headers";
import prisma from "../../../../../../../lib/prisma";
import { verifyJwt } from "@/lib/token";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
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

  if (!tokenCookie) return null;

  const payload = verifyJwt(tokenCookie);
  if (!payload) return null;

  const myRole = space.SpaceMember.find((m) => m.userId === payload.id)?.role;

  return Response.json({...space, role: myRole});
}
