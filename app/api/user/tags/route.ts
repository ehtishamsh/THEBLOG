import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const getTags = await db?.tag.findMany();
    if (getTags.length === 0) {
      return NextResponse.json({ tags: null, status: 200 });
    }
    return NextResponse.json({ tags: getTags, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
