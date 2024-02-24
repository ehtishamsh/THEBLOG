import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    //Check if tag already exists
    const deleteTag = await db?.tag.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      tagName: deleteTag,
      message: "Tag deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      tagName: null,
      message: "Something went wrong",
      status: 500,
    });
  }
}
