import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";
import { updateSpaceApiSchema, updateSpaceSchema } from "@/lib/schema";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    const payload = verifyJwt(token!);

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateSpaceApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: parsed.error.issues.map((errors) => errors.message),
        },
        { status: 400 }
      );
    }

    const updated = await prisma.space.update({
      where: { id: id },
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
        permission: parsed.data.permission,
        avatar: parsed.data.avatar ?? undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update space" },
      { status: 500 }
    );
  }
}
