"use client";
import { sendOTP } from "@/actions/send-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSendOTP = async () => {
    const res = await sendOTP(email);

    if (!res.success) {
      alert(res.error);
      return;
    }
    setShowOTP(true);
  };

  const handleSubmitOTP = async () => {
    router.push("/scanner");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {!showOTP ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Enter your email
              </h1>
              <p className="text-sm text-muted-foreground">
                We&apos;ll send you a verification code
              </p>
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" onClick={handleSendOTP}>
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Enter your OTP
              </h1>
              <p className="text-sm text-muted-foreground">
                Please enter the verification code sent to your device
              </p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button className="w-full" onClick={handleSubmitOTP}>
              Verify
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
