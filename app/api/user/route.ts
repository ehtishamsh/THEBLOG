import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { sendEmail } from "@/lib/mail";

const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(8, "Password must be less than 8 characters"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = userSchema.parse(body);
    //Check if email already exists
    const existingEmail = await db?.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return NextResponse.json({ user: null, message: "Email already exists" });
    }
    //Check if username already exists
    const existingUsername = await db?.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUsername) {
      return NextResponse.json({
        user: null,
        message: "Username already exists",
      });
    }
    const hashedPassword = await hash(password, 10); // hash password
    const emailVerifcationTokken = crypto.randomUUID();
    const newUser = await db?.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "user",
        emailToken: emailVerifcationTokken,
        emailVerified: false,
        emailTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 25),
      },
    }); // create new user
    // send email verification
    await sendEmail({
      to: email,
      body: `<body style="background-color: #f3f4f6; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Verify Your Email Address</h2>
              <p style="margin-bottom: 20px;">Click the button below to verify your email address:</p>
              <a href="https://theblogs-ecru.vercel.app/verify/${emailVerifcationTokken}" style="background-color: #3b82f6; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; transition: background-color 0.3s ease;">Verify Email Address</a>
              <p style="margin-top: 20px;">If you didn't create an account with us, you can safely ignore this email.</p>
          </div>
      </div>
  </body>`,
    });

    const { password: _, ...user } = newUser; // remove password from user
    return NextResponse.json({
      user: user,
      message: "User created successfully",
      status: 200,
      redirect: "/sign-in",
    });
  } catch (error) {
    return NextResponse.json({
      user: null,
      message: "Something went wrong",
      status: 500,
    });
  }
}
