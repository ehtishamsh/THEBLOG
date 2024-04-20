import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const findblogs = await db?.blog.findMany({
      select: {
        description: true,
        createdAt: true,
        id: true,
        slug: true,
        image: true,
        title: true,
        blogDetail: {
          select: {
            tag: {
              select: {
                tagName: true,
              },
            },
          },
        },
      },
      where: {
        OR: [{ title: { contains: id, mode: "insensitive" } }],
      },
    });
    if (!findblogs) {
      return NextResponse.json({
        message: "Something went wrong",
        status: 500,
      });
    }
    return NextResponse.json({ blogs: findblogs, status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
