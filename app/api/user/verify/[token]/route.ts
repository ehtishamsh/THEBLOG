import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  try {
    const checkUser = await db?.user.findFirst({
      where: {
        emailToken: token,
      },
    });
    console.log(checkUser);
    if (!checkUser) {
      return NextResponse.json({
        message: "Invalid token",
        type: "invalid",
        redirect: "/sign-in",
      });
    }
    if (!token) {
      return NextResponse.json({
        message: "Invalid token",
        type: "invalid",
        redirect: "/sign-in",
      });
    }
    if (
      checkUser.emailTokenExpiry &&
      new Date(checkUser.emailTokenExpiry).getTime() < new Date().getTime()
    ) {
      return NextResponse.json({
        message: "Token expired",
        type: "expired",
        redirect: "/sign-in",
      });
    }
    const user = await db?.user.update({
      where: {
        email: checkUser.email,
      },
      data: {
        emailVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Something went wrong",
        type: "error",
        redirect: "/sign-in",
      });
    }
    return NextResponse.json({
      message: "Token verified",
      user,
      type: "valid",
      redirect: "/sign-in",
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
