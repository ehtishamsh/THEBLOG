import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;
  try {
    const user = await db?.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    if (
      user?.emailTokenExpiry &&
      new Date(user?.emailTokenExpiry).getTime() > new Date().getTime()
    ) {
      return NextResponse.json({ message: "Token already sent" });
    }
    sendEmail({
      body: `<body style="background-color: #f3f4f6; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Verify Your Email Address</h2>
              <p style="margin-bottom: 20px;">Click the button below to verify your email address:</p>
              <a href="https://theblogs-ecru.vercel.app/verify/${user?.emailToken}" style="background-color: #3b82f6; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; transition: background-color 0.3s ease;">Verify Email Address</a>
              <p style="margin-top: 20px;">If you didn't create an account with us, you can safely ignore this email.</p>
          </div>
      </div>
  </body>`,
      to: user?.email,
    });
    return NextResponse.json({ message: "mail sent", user, status: 200 });
  } catch (error) {}
  return NextResponse.json({ message: "ok" });
}
