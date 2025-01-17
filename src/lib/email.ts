import "server-only";

import { Resend } from "resend";
import { OTPTemplate } from "@/components/otp-template";
import nodemailer from "nodemailer";

async function sendWithResend(email: string, otp: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "MLSA <contact@mlsakiit.com>",
    to: [email],
    subject: "Login OTP for Scanner App",
    react: OTPTemplate({ otp }),
  });
}

async function sendWithNodemailer(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Login OTP for Scanner App",
    html: `<div><h1>Your OTP for login is ${otp}. This code is valid for 5 minutes</h1></div>`,
  });
}

async function sendWithDiscord(email: string, otp: string) {
  const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `OTP for ${email} is ${otp}` }),
  });
  if (!response.ok) throw new Error("Discord webhook failed");
}

export async function sendOtp(email: string, otp: string) {
  try {
    await sendWithResend(email, otp);
    return true;
  } catch (error) {
    console.error("Resend failed:", error);
  }

  try {
    await sendWithNodemailer(email, otp);
    return true;
  } catch (error) {
    console.error("Nodemailer failed:", error);
  }

  try {
    await sendWithDiscord(email, otp);
    return true;
  } catch (error) {
    console.error("Discord webhook failed:", error);
  }

  console.log("All delivery methods failed. OTP:", otp, "Email:", email);
  return false;
}
