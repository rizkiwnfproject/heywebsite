import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { status } = await req.json();

  if (!["ACCEPTED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    if (status === "REJECTED") {
      await prisma.spaceMember.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: "Member rejected & removed" });
    }

    const updated = await prisma.spaceMember.update({
      where: { id: id },
      data: { status: "ACCEPTED" },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }
}
