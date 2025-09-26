import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";
import { createMessageSchema, createNoteSchema } from "@/lib/schema";
import prisma from "../../../../../../../lib/prisma";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await context.params;

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJwt(token);

    if (!payload) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createNoteSchema.parse(body);

    if (parsed.title.trim() === "") {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    const message = await prisma.note.create({
      data: {
        spaceId: id,
        userId: payload.id,
        title: parsed.title,
        content: parsed.content ?? "kosong",
      },
    });
    return Response.json(message, { status: 201 });
  } catch (error) {
    console.log("Sign Up Error: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
