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
    const existingTag = await db?.tag.findUnique({
      where: {
        id: body.id,
      },
    });
    if (existingTag) {
      const updatedTag = await db?.tag.update({
        where: {
          id: body.id,
        },
        data: {
          tagName,
        },
      });
      return NextResponse.json({
        tagName: updatedTag,
        message: "Tag updated successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Tag not found",
      status: 404,
    });
  }
}
