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
export async function GETTAG({ params }: { params: string }) {
  try {
    const tag = await db?.tag.findFirst({
      where: {
        id: params,
      },
    });
    return {
      data: JSON.parse(JSON.stringify(tag)),
    };
  } catch (error) {
    console.log(error);
  }
}
