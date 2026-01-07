/** @format */

"use client";

import Image from "next/image";
import verifyOtpImage from "../../../public/auth/otp.png";
import logo from "../../../public/logo.svg";
import FormHandler from "@/components/FormComponents/FormHandler";
import BackButton from "@/components/SharedComponents/BackButton";
import { useRef, useState, ChangeEvent, KeyboardEvent } from "react";

const VerifyOtp = () => {
  // Correct typing for multiple refs
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  // -----------------------------------
  // Handle OTP input change
  // -----------------------------------
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value.slice(-1); // only last digit
      return newOtp;
    });

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // -----------------------------------
  // Handle backspace navigation
  // -----------------------------------
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // -----------------------------------
  // Submit OTP
  // -----------------------------------
  const onsubmit = () => {
    const originalOtp = otp.join("");
    console.log(originalOtp);
  };

  // -----------------------------------
  // Resend OTP
  // -----------------------------------
  const handleResendCode = () => {
    console.log("resend code");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full min-h-screen md:w-[70%] gap-10 md:gap-[120px]">
        <div className="bg-[#FF9C5E1A] w-full md:w-1/2 p-4 rounded-xl">
          <div className="w-full bg-white md:p-8 p-4 rounded-xl relative">
            <div className="absolute">
              <BackButton />
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center gap-5 mb-7">
              <Image
                className="size-24 rounded-xl"
                src={logo}
                alt="Login Image"
                width={500}
                height={500}
              />
              <h2 className="text-[34px] font-semibold text-heading">
                Verify Your OTP
              </h2>
              <p className="text-sm text-paragraph text-center">
                Please enter the 6-digit verification code we sent to your
                registered email.
              </p>
            </div>

            {/* OTP FORM */}
            <FormHandler onSubmit={onsubmit}>
              <div className="flex justify-center items-center gap-3 mb-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="size-12 text-center border-2 rounded-xl p-2.5 text-2xl border-gray-300 text-heading font-bold focus:outline-none focus:border-bg-primary"
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="text-white font-bold text-lg bg-bg-primary w-full py-3 rounded-xl"
              >
                Verification
              </button>
            </FormHandler>

            <p className="text-[15px] text-center mt-3">
              <span className="text-paragraph">Didnt receive code? </span>
              <button
                onClick={handleResendCode}
                className="text-title font-medium"
              >
                Resend Now
              </button>
            </p>
          </div>
        </div>

        {/* Right side image */}
        <div className="w-full md:w-1/2">
          <Image
            src={verifyOtpImage}
            alt="Verify OTP Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
