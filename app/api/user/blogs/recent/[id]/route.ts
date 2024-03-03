import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const take = params.id;
  try {
    const blogs = await db?.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(take),
      select: {
        title: true,
        description: true,
        image: true,
        slug: true,
        createdAt: true,
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
    });

    const formatedBlogs = blogs.map((blog) => {
      const date = blog?.createdAt as string | Date as string;
      const formateDate: string = new Date(date).toLocaleString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return {
        title: blog.title,
        description: blog.description,
        image: blog.image,
        slug: blog.slug,
        createdAt: formateDate,
        tags: blog.blogDetail.map((detail) => detail.tag.tagName),
      };
    });
    if (blogs.length === 0) {
      return NextResponse.json({ blogs: null, status: 200 });
    }
    return NextResponse.json({ blogs: formatedBlogs, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
