import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const blogs = await db?.blog.findMany({
      select: {
        description: true,
        createdAt: true,
        id: true,
        slug: true,
        image: true,
        title: true,
        blogDetail: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
            tag: {
              select: {
                tagName: true,
              },
            },
          },
        },
      },
    });

    if (!blogs) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
    console.log(blogs[0].blogDetail);
    return NextResponse.json({ blogs, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {}
