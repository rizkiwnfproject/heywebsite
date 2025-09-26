import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.number_phone || !body.username || !body.name || !body.password) {
      return NextResponse.json(
        { message: "Incomplete data" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "Email/Username is already in use" },
        { status: 400 }
      );
    }

        const hashedPassword = await bcrypt.hash(body.password, 10);


    const result = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword
      },
    });

    return NextResponse.json(result, {status: 201})
  } catch (error) {
    console.log("Sign Up Error: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
