import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const data = await db?.blog.findMany({
      select: {
        id: true,
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
      where: {
        blogDetail: {
          every: {
            user: {
              email: session?.user?.email as string,
            },
          },
        },
      },
    });
    return NextResponse.json({ blogs: data, status: 200, message: "Success" });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
interface FormData {
  id: string;
  email: string;
  title: string;
  description: string;
  content: string;
  tags: [{ id: string; tagName: string }];
  cover: string;
  slug: string;
}
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, title, description, content, tags, cover, slug }: FormData = body;

  try {
    // Find the existing blog and its tags
    const existingBlog = await db.blog.findUnique({
      where: { id },
      include: { blogDetail: { include: { tag: true } } },
    });

    const userIDsAndBlogIDs = existingBlog?.blogDetail?.map((detail) => ({
      userID: detail.userID,
      blogID: detail.blogID,
    }));

    const userID = userIDsAndBlogIDs ? userIDsAndBlogIDs[0]?.userID : "";
    const blogId = userIDsAndBlogIDs ? userIDsAndBlogIDs[0]?.blogID : "";
    // Extract existing tag ids
    const existingTagIds =
      existingBlog?.blogDetail.map((detail) => detail.tag.id) || [];

    // Extract new tag ids
    const newTagIds = tags.map((tag) => tag.id);

    // Check for duplicate tag IDs
    if (newTagIds.some((id) => existingTagIds.includes(id))) {
      return NextResponse.json({
        message: "Duplicate tag IDs are not allowed",
        status: 400,
      });
    }

    // Identify common tag ids
    const commonTagIds = existingTagIds.filter((id) => newTagIds.includes(id));

    // Update existing tags with new ones
    await Promise.all(
      existingBlog?.blogDetail.map(async (detail) => {
        if (commonTagIds.includes(detail.tag.id)) {
          await db.blogDetail.update({
            where: { id: detail.id },
            data: {
              tagID:
                tags.find((tag) => tag.tagName === detail.tag.tagName)?.id ||
                detail.tagID,
            },
          });
        }
      }) || []
    );

    // Add new tags
    const newTags = tags.filter((tag) => !commonTagIds.includes(tag.id));
    await Promise.all(
      newTags.map(async (tag) => {
        await db.blogDetail.create({
          data: {
            userID: userID as string, // Assuming userID is the id of the user associated with the blog
            tagID: tag.id,
            blogID: blogId as string,
          },
        });
      })
    );

    // Update the blog details
    const updatedBlog = await db.blog.update({
      where: { id },
      data: { content, image: cover, slug, title, description },
      include: { blogDetail: { include: { tag: true } } },
    });

    return NextResponse.json({
      message: "Blog updated",
      status: 200,
      data: updatedBlog,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  } finally {
    await db.$disconnect(); // Disconnect the Prisma client
  }
}
