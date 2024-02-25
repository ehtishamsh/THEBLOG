import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const user = await db?.user.findUnique({
      where: {
        id: id,
      },
    });
    const data = {
      ...user,
      password: undefined,
    };
    return NextResponse.json({ users: data, status: 200 });
  } catch (error) {
    NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
