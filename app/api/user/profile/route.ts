import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { img, email } = await req.json();
    const data = await db?.user?.update({
      where: {
        email: email,
      },
      data: {
        image: img,
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
