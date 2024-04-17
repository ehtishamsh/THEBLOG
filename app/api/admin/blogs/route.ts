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
    return NextResponse.json({ blogs, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const existinblog = await db?.blog.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!existinblog) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
    const deleteDetails = await db?.blogDetail.deleteMany({
      where: {
        blogID: body.id,
      },
    });

    const deleteBlog = await db?.blog.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ deleteBlog, deleteDetails, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
