import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface DATA {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt: Date;
  blogDetail: {
    tag: {
      tagName: string;
    };
  }[];
}
[];

export async function GET(req: NextRequest) {
  try {
    const data: DATA[] = await db?.blog?.findMany({
      select: {
        description: true,
        createdAt: true,
        id: true,
        slug: true,
        image: true,
        title: true,
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

    return NextResponse.json({
      data,
      status: 200,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed",
    });
  }
}
