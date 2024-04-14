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
        emailTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    }); // create new user
    // send email verification

    const sendMail = await sendEmail({
      to: newUser.email,
      subject: "Verify your email",
      body: `Click here to verify your email: http://localhost:3000/verify/${emailVerifcationTokken}`,
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
