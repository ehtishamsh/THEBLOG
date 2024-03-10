import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const body : { id: string } = await req.json();
  const { id }  = body;

  try {
    if(!id) {
      return NextResponse.json({
        message: "Invalid request",
        status: 400,
      });
    }
    // Check if the blog exists before deleting
    const existingBlog = await db?.blog.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBlog) {
      return NextResponse.json({
        message: "Blog not found",
        status: 404,
      });
    }

    // Find and delete the related blog details first
    const deleteBlogDetail = await db?.blogDetail.deleteMany({
      where: {
        blogID: id,
      },
    });

    // Now that the details are deleted, delete the main blog record
    const deleteBlog = await db?.blog.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      data: {
        blog: deleteBlog,
        blogDetail: deleteBlogDetail,
      },
      status: 200,
      message: "Deleted",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
