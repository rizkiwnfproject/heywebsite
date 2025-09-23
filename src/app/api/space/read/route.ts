import { cookies } from "next/headers";
import prisma from "../../../../../lib/prisma";
import { verifyJwt } from "@/lib/token";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const payload = verifyJwt(token!);
  if (!payload) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const listSpace = await prisma.space.findMany({
    where: {
      OR: [
        { createdBy: payload.id },
        { SpaceMember: { some: { userId: payload.id } } },
      ],
    },
    include: {
      SpaceMember: true,
      creator: true,
    },
  });
  return Response.json(listSpace);
}
