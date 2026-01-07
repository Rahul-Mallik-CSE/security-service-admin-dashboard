/** @format */

"use client";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import resetPasswordImage from "../../../public/auth/reset.png";
import logo from "../../../public/logo.svg";
import BackButton from "@/components/SharedComponents/BackButton";
import Image from "next/image";
import FormHandler from "@/components/FormComponents/FormHandler";
import FormInput from "@/components/FormComponents/FormInput";

type TResetPasswordData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onsubmit = (data: TResetPasswordData) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full min-h-screen md:w-[70%] gap-10 md:gap-[120px]">
        <div className="bg-[#FF9C5E1A] w-full md:w-1/2 p-4 rounded-xl">
          <div className="w-full bg-white md:p-8 p-4 rounded-xl relative">
            {/* back button */}
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
                Create New Password
              </h2>
              <p className="text-sm text-paragraph text-center">
                Set a new password to protect <br /> your account.
              </p>
            </div>
            {/* login form */}
            <FormHandler onSubmit={onsubmit}>
              <div className="relative">
                <FormInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                ></FormInput>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50px] text-xl right-5 text-heading"
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}
                </div>
              </div>
              <div className="relative">
                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-type your password"
                ></FormInput>
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-[50px] text-xl right-5 text-heading"
                >
                  {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
                </div>
              </div>
              <button
                type="submit"
                className="text-white font-bold text-lg bg-bg-primary w-full py-3 rounded-xl cursor-pointer"
              >
                Reset Password
              </button>
            </FormHandler>
          </div>
        </div>
        {/* login form image */}
        <div className="w-full md:w-1/2">
          <Image
            src={resetPasswordImage}
            alt="Reset password Image"
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
