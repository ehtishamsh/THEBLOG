import nodemailer from "nodemailer";
export async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASS } = process.env;
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });
  try {
    const testResult = await transporter.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }
  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      subject,
      to,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}
