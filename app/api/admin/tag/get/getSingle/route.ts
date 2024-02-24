import { db } from "@/lib/db";

export async function GET(params: string) {
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
