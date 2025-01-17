import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { emailOTP } from "better-auth/plugins";
import { sendOtp } from "../email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  logger: console,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      roll: {
        type: "string",
        input: false,
        unique: false,
      },
      phone: {
        type: "string",
        input: false,
        unique: false,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/email-otp/send-verification-otp") return;

      const { email } = ctx.body;
      const exists = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (!exists) {
        throw new APIError("FORBIDDEN", {
          message:
            "This email is not in mlsa members list. Please contact admins to get yourself added",
        });
      }
    }),
  },

  plugins: [
    emailOTP({
      // NOTE: Don't allow anymore sign-ups. If you want to add new users
      // to the database, you can add it manually or just rerun the seed
      // script present in utils folder in the root directory of the project.
      disableSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type !== "sign-in") {
          throw new APIError("NOT_IMPLEMENTED", {
            message: "Who needs all these features anyway ?",
          });
        }
        console.log(`Sign-in OTP for ${email}: ${otp}`);
        const result = await sendOtp(email, otp);
        if (!result) {
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "Failed to send OTP",
          });
        }
      },
    }),
  ],
});
