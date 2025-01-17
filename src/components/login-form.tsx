"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import styles from "@/components/Welcome.module.css";
import BgVectors from "./BgVectors";

export function LoginForm() {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const MlsaTexts = useMemo(
    () => ["Student", "Developer", "Leader", "Student"],
    []
  );
  const [currentText, setCurrentText] = useState(MlsaTexts[0]);
  const router = useRouter();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % MlsaTexts.length;
      setCurrentText(MlsaTexts[index]);
    }, 2000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [MlsaTexts]);

  const handleSendOTP = async () => {
    const res = await authClient.emailOtp.sendVerificationOtp({
      type: "sign-in",
      email: email,
    });

    if (res.error) {
      setError(res.error.message);
      return;
    }
    setShowOTP(true);
    setError(undefined);
  };

  const handleSubmitOTP = async () => {
    const res = await authClient.signIn.emailOtp({
      email: email,
      otp: otp,
    });
    if (res.error) {
      setError(res.error.message);
      return;
    }
    setError(undefined);
    router.push("/scanner");
  };

  return (
    <>
      <nav className="w-full bg-transparent p-4 flex justify-between items-center absolute top-0 left-0 z-10">
        <div className="flex items-center">
          <Image
            src="/assets/icons/MLSA.png"
            alt="MLSA Logo"
            width={400}
            height={400}
            loading="eager"
            className="h-[35px] w-[140px] md:h-[40px] md:w-[160px] lg:h-[50px] lg:w-[197px]"
          />
        </div>
        <span className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
          Members Login
        </span>
      </nav>
      {/* bg vectors  */}

      <BgVectors />
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6">
          {!showOTP ? (
            <>
              <div className="text-center">
                <h1
                  className={`text-4xl md:text-5xl font-thin text-indigo-300 ${styles.animatedText} ${styles.noWrapText}`}
                >
                  Welcome {currentText}
                </h1>
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
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
                className="text-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                className="w-full bg-gradient-to-r from-gray-400 to-purple-900"
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
                  Enter your OTP
                </h1>
                <p className="text-sm text-muted-foreground">
                  Please enter the verification code sent to your device
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="text-white"
                >
                  <InputOTPGroup className="text-white">
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                className="w-full bg-gradient-to-r from-gray-400 to-purple-900"
                onClick={handleSubmitOTP}
              >
                Verify
              </Button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
