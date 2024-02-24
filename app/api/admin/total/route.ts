import { db } from "@/lib/db";
import { json } from "stream/consumers";

export async function GETUSER() {
  try {
    const total = await db?.user.count();
    return {
      total: JSON.parse(JSON.stringify(total)),
    };
  } catch (error) {
    console.log(error);
  }
}
export async function GETBLOGS() {
  try {
    const total = await db?.blog.count();
    return {
      total: JSON.parse(JSON.stringify(total)),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function GETTAGS() {
  try {
    const total = await db?.tag.count();
    return {
      total: JSON.parse(JSON.stringify(total)),
    };
  } catch (error) {
    console.log(error);
  }
}
