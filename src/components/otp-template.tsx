import * as React from "react";

interface OTPTemplateProps {
  otp: string;
}

export const OTPTemplate = ({ otp }: OTPTemplateProps) => (
  <div>
    <h1>Your OTP for login is {otp}. This code is valid for 5 minutes</h1>
  </div>
);
