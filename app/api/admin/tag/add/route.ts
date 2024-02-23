import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";

const userSchema = z.object({
  tagName: z
    .string()
    .min(1, "Tag Name is required")
    .max(40, "Tag Name is too long"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tagName } = userSchema.parse(body);
    //Check if tag already exists
    const existingTag = await db?.tag.findUnique({
      where: {
        tagName: tagName,
      },
    });
    if (existingTag) {
      return NextResponse.json({
        tagName: null,
        message: "Tag already exists",
      });
    }
    const newTag = await db?.tag.create({
      data: {
        tagName,
      },
    }); // create new user
    return NextResponse.json({
      tagName: newTag,
      message: "Tag created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      user: null,
      message: "Something went wrong",
      status: 500,
    });
  }
}
