import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const user = await db?.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      const data = {
        ...user,
        password: undefined,
      };
      return NextResponse.json({ data, status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

const userSchema = z.object({
  username: z
    .string()
    .min(1, "User Name is required")
    .max(40, "User Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const body = await request.json();
    const { email, username } = userSchema.parse(body);
    const exitingEmail = await db?.user.findUnique({
      where: {
        email,
      },
    });
    if (exitingEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 500 }
      );
    }
    const user = await db?.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        username,
      },
    });
    return NextResponse.json({ user, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
