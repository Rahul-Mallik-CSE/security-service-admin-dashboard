/** @format */

"use client";
import FormHandler from "@/components/FormComponents/FormHandler";
import FormInput from "@/components/FormComponents/FormInput";
import Image from "next/image";
import forgotPasswordImage from "../../../public/auth/forgot.png";
import logo from "../../../public/logo.svg";
import BackButton from "@/components/SharedComponents/BackButton";
import { useForgetPasswordMutation } from "@/redux/freatures/authAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onsubmit = async (data: { email: string }) => {
    try {
      setEmail(data.email);
      await forgetPassword(data).unwrap();
      // Navigate to OTP verification page and pass email via localStorage or query
      localStorage.setItem("resetEmail", data.email);
      router.push("/verify-otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full min-h-screen md:w-[70%] gap-10 md:gap-[120px]">
        <div className="bg-[#FF9C5E1A] w-full md:w-1/2 p-4 rounded-xl">
          <div className="w-full bg-white md:p-8 p-4 rounded-xl relative">
            <div className="absolute">
              <BackButton></BackButton>
            </div>
            {/* form heading */}
            <div className="flex flex-col items-center gap-5 mb-7">
              <Image
                className="size-24 rounded-xl"
                src={logo}
                alt="Login Image"
                width={500}
                height={500}
              ></Image>
              <h2 className="text-[34px] font-semibold text-heading">
                Forgot Password
              </h2>
              <p className="text-sm text-paragraph text-center">
                No worries! Reset your password and <br /> get back in quickly.
              </p>
            </div>
            {/* login form */}
            <FormHandler onSubmit={onsubmit}>
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
              ></FormInput>
              <button
                type="submit"
                disabled={isLoading}
                className="text-white font-bold text-lg bg-bg-primary w-full py-3 rounded-xl cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </FormHandler>
          </div>
        </div>
        {/* login form image */}
        <div className="w-full md:w-1/2">
          <Image
            src={forgotPasswordImage}
            alt="Login Image"
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
