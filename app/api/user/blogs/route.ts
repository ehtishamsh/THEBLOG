import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const blogs = await db?.blog.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        title: true,
        description: true,
        image: true,
        slug: true,
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
      return {
        title: blog.title,
        description: blog.description,
        image: blog.image,
        slug: blog.slug,
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
