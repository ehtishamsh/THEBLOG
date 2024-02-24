import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ITag {
  id: string;
  tagName: string;
}
export async function GETPOST() {
  try {
    const tags = await db?.tag.findMany();
    const data: ITag[] = tags;
    return {
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    console.log(error);
  }
}
