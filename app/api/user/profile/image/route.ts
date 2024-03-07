import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { image, email } = await req.json();
    const data = await db?.user?.update({
      where: {
        email: email,
      },
      data: {
        image: image,
      },
    });

    return NextResponse.json({
      user: data,
      status: 200,
      message: "image updated",
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
      message: "Something went wrong",
    });
  }
}
