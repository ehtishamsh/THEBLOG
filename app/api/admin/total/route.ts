import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(req: NextRequest) {
  try {
    const totalusers: number | undefined = await db?.user.count();
    const totaltags: number | undefined = await db?.tag.count();
    const totalblogs: number | undefined = await db?.blog.count();
    return NextResponse.json({
      totalusers,
      totaltags,
      totalblogs,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
