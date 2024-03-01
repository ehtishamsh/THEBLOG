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
        blogDetail: {
          select: {
            tag: true,
          },
        },
      },
    });

    const formatedBlog = {
      title: blog?.title,
      content: blog?.content,
      image: blog?.image,
      tags: blog?.blogDetail.map((detail) => detail.tag.tagName),
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
