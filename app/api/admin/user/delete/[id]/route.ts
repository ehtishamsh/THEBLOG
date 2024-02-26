import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const deleteUser = await db?.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      deleteUser,
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
