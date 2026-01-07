/** @format */

"use client";
import FormHandler from "@/components/FormComponents/FormHandler";
import FormInput from "@/components/FormComponents/FormInput";
import BackButton from "@/components/SharedComponents/BackButton";
import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

type TChangePasswordData = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState<boolean>(false);

  const onsubmit = (data: TChangePasswordData) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex gap-5 items-center">
        <BackButton></BackButton>
        <h2 className="text-2xl font-medium text-heading">Change Password</h2>
      </div>
      <div className="mt-5 w-1/2">
        <FormHandler onSubmit={onsubmit}>
          <div className="relative">
            <FormInput
              label="Current Password"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your current password"
            ></FormInput>
            <div
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute top-[50px] text-xl right-5 text-heading"
            >
              {showOldPassword ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <div className="relative">
            <FormInput
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
            ></FormInput>
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute top-[50px] text-xl right-5 text-heading"
            >
              {showNewPassword ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <div className="relative">
            <FormInput
              label="Confirm New Password"
              name="confirmNewPassword"
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Re-Enter new password"
            ></FormInput>
            <div
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute top-[50px] text-xl right-5 text-heading"
            >
              {showConfirmNewPassword ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white font-medium text-[15px] bg-bg-primary py-3 px-10 rounded-xl cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </FormHandler>
      </div>
    </div>
  );
};

export default ChangePassword;
