import { cookies } from "next/headers";
import { verifyJwt } from "./token";
import prisma from "../../lib/prisma";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token")?.value;

  if (!tokenCookie) return null;

  const payload = verifyJwt(tokenCookie);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: {
      SpaceMember: {
        where: {
          userId: payload.id,
        },
      },
    },
  });

  return user;
}
