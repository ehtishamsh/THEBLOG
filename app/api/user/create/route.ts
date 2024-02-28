import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const {
      email,
      cover,
      title,
      content,
      tags,
      description,
      slug,
    }: {
      email: string;
      cover: string;
      title: string;
      content: string;
      tags: [{ id: string; tagName: string }];
      description: string;
      slug: string;
    } = body;
    if (
      !cover ||
      !title ||
      !content ||
      !tags ||
      !description ||
      !slug ||
      !email
    ) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }
    const findExistingUser = await db?.user?.findFirst({
      where: {
        email: email as string,
      },
    });
    const blogs = await db?.blog.create({
      data: {
        title,
        description,
        content,
        image: cover,
        slug,
      },
    });
    const blogDetails = await Promise.all(
      tags.map(async (tagId) => {
        const tag = await db?.tag.findUnique({
          where: { id: tagId.id },
        });

        if (!tag) {
          // Handle case where the tag is not found
          throw new Error(`Tag with ID ${tagId} not found`);
        }

        // Create BlogDetail with user, tag, and blog associations
        return db?.blogDetail.create({
          data: {
            userID: findExistingUser?.id as string,
            tagID: tag.id,
            blogID: blogs?.id as string,
          },
        });
      })
    );

    return NextResponse.json({
      message: "Blog created",
      status: 200,
      data: blogs,
      blogDetails: blogDetails,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
