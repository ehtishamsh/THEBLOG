import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const blog = await db?.blog.findFirst({
      where: { slug: slug },
      select: {
        title: true,
        content: true,
        image: true,
        createdAt: true,
        blogDetail: {
          select: {
            tag: true,
            user: {
              select: {
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({
        blog: null,
        status: 404,
        message: "Not found",
        type: "error",
      });
    }
    const date = blog?.createdAt as string | Date as string;

    const formateDate: string = new Date(date).toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formatedBlog = {
      title: blog?.title,
      content: blog?.content,
      image: blog?.image,
      createdAt: formateDate,
      tags: blog?.blogDetail.map((detail) => detail.tag.tagName),
      user: blog?.blogDetail[0].user,
    };
    if (!blog) {
      return NextResponse.json({ blog: null });
    }
    return NextResponse.json({ formatedBlog, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
