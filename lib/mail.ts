import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function sendEmail({ to, body }: { to: string; body: string }) {
  const { SMTP_EMAIL, SMTP_PASS } = process.env;
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });
  try {
    const mail = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: to,
      subject: `Verify your email`,
      html: body,
    });

    return NextResponse.json({ message: "EMAIL SENT" });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" });
  }
}
