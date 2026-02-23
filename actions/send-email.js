import nodemailer from "nodemailer";
import { render } from "@react-email/render";

export async function sendEmail({ to, subject, react }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your normal password)
    },
  });

  try {
    const html = await render(react);

    const info = await transporter.sendMail({
      from: `"Fintrack AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return { success: true, data: info };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}