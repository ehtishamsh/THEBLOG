import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await db?.user?.findMany({
      where: {
        role: "user",
      },
    });

    const users = data.map((user) => ({
      ...user,
      password: undefined,
    }));
    return NextResponse.json({ users, status: 200 });
  } catch (error) {
    NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
