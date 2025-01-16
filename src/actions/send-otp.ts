"use server";

import { prisma } from "../../lib/prisma";

export async function sendOTP(email: string) {
  const data = await prisma.members.findUnique({
    where: {
      email,
    },
  });

  if (!data) {
    return {
      success: false,
      error: "email not authorized",
    };
  }

  return {
    success: true,
    error: null,
  };
}
