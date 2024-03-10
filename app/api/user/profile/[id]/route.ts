import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const data = await db?.blog?.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        description: true,
        image: true,
        slug: true,
        createdAt: true,
        blogDetail: {
          select: {
            tag: {
              select: {
                id: true,
                tagName: true,
              },
            },
          },
        },
      },
    });
    const formatedData = {
      id: data?.id,
      title: data?.title,
      content: data?.content,
      description: data?.description,
      image: data?.image,
      slug: data?.slug,
      createdAt: data?.createdAt,
      blogDetail: data?.blogDetail.map((detail) => {
        return {
          tag: detail?.tag,
        };
      }),
    };
    return NextResponse.json({
      data: formatedData,
      status: 200,
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
