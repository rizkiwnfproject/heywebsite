import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/token";
import { createSpaceSchema } from "@/lib/schema";
import { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJwt(token)

    if (!payload) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createSpaceSchema.parse(body);

    const space = await prisma.space.create({
      data: {
        name: parsed.name,
        description: parsed.description,
        permission: parsed.permission ?? true,
        avatar: parsed.avatar,
        createdBy: payload.id,
      },
    });
    return Response.json(space, { status: 201 });
  } catch (error) {
    console.log("Sign Up Error: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
