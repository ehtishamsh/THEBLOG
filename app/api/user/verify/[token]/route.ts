import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const checkUser = await db?.user.findFirst({
    where: {
      emailToken: token,
    },
  });
  if (!checkUser) {
    return NextResponse.json({ message: "Invalid token" });
  }
  if (!token) {
    return NextResponse.json({ message: "Invalid token" });
  }
  return NextResponse.json({ message: "Token verified" });
}
