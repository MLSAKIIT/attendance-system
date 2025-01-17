import "server-only";

import { Resend } from "resend";
import { OTPTemplate } from "@/components/otp-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtp(email: string, code: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "MLSA <contact@mlsakiit.com>",
      to: [email],
      subject: "Login OTP for Scanner App",
      react: OTPTemplate({ otp: code }),
    });

    if (error) {
      console.error(error);
      sendOtpThroughNodeMailerServer(email, code);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function sendOtpThroughNodeMailerServer(email: string, code: string) {
  throw new Error("NOT IMPLEMENTED YET");
  const res = await fetch(process.env.NODEMAILER_SERVER_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }
}
