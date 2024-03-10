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
