/** @format */

"use client";
import Image from "next/image";
import loginImage from "../../../public/auth/login.png";
import FormHandler from "@/components/FormComponents/FormHandler";
import FormInput from "@/components/FormComponents/FormInput";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/freatures/authAPI";
import { saveTokens } from "@/services/authService";
import { toast } from "react-toastify";
import { useGetUserProfileQuery } from "@/redux/freatures/settingAPI";

type TLoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  // This will help trigger the user profile query after login
  const { refetch: refetchUserProfile } = useGetUserProfileQuery();

  const onsubmit = async (data: TLoginData) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response.success) {
        // Save the access token to both cookies and localStorage
        await saveTokens(response.access);
        localStorage.setItem("accessToken", response.access);

        // Trigger user profile refetch
        refetchUserProfile();

        // Show success toast
        toast.success(response.message || "Login successful!");

        console.log("Login successful:", response);

        // Small delay to ensure token is saved before redirect
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (error: any) {
      // Handle error response
      const errorMessage =
        error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full min-h-screen md:w-[70%] gap-10 md:gap-[120px]">
        <div className="bg-[#FF9C5E1A] w-full md:w-1/2 p-4 rounded-xl">
          <div className="w-full bg-white md:p-8 p-4 rounded-xl">
            {/* form heading */}
            <div className="flex flex-col items-center gap-5 mb-7">
              <Image
                className="size-24 rounded-xl"
                src={logo}
                alt="Login Image"
                width={500}
                height={500}
              ></Image>
              <h2 className="text-[34px] font-semibold text-heading">Login</h2>
              <p className="text-sm text-paragraph text-center">
                Welcome back! Enter your details to securely <br /> access your
                account.
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
              <Link
                href="/forgot-password"
                className="text-title font-medium text-sm flex justify-end mb-3"
              >
                Forgot Password
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="text-white font-bold text-lg bg-bg-primary w-full py-3 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </FormHandler>
          </div>
        </div>
        {/* login form image */}
        <div className="w-full md:w-1/2">
          <Image
            src={loginImage}
            alt="Login Image"
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Login;
