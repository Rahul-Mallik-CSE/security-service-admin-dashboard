/** @format */

"use client";
import FormHandler from "@/components/FormComponents/FormHandler";
import FormInput from "@/components/FormComponents/FormInput";
import BackButton from "@/components/SharedComponents/BackButton";
import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useChangePasswordMutation } from "@/redux/freatures/authAPI";
import { toast } from "react-toastify";

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

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onsubmit = async (data: TChangePasswordData) => {
    // Validate passwords match
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    // Validate password length
    if (data.newPassword.length < 4) {
      toast.error("New password must be at least 4 characters!");
      return;
    }

    try {
      const response = await changePassword({
        old_password: data.oldPassword,
        new_password: data.newPassword,
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Password changed successfully!");
        // Reset form
        (document.querySelector("form") as HTMLFormElement)?.reset();
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error: any) {
      console.error("Failed to change password:", error);
      toast.error(
        error?.data?.message ||
          error?.data?.error ||
          "Failed to change password. Please try again."
      );
    }
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
              className="absolute top-[50px] text-xl right-5 text-heading cursor-pointer"
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
              className="absolute top-[50px] text-xl right-5 text-heading cursor-pointer"
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
              className="absolute top-[50px] text-xl right-5 text-heading cursor-pointer"
            >
              {showConfirmNewPassword ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="text-white font-medium text-[15px] bg-bg-primary py-3 px-10 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Changing..." : "Reset Password"}
            </button>
          </div>
        </FormHandler>
      </div>
    </div>
  );
};

export default ChangePassword;
