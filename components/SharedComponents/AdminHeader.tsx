/** @format */

"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { useGetUserProfileQuery } from "@/redux/freatures/settingAPI";
import { getFullImageFullUrl } from "@/lib/utils";

const AdminHeader = () => {
  const pathname = usePathname();
  const { data, isLoading, refetch } = useGetUserProfileQuery();

  // Refetch user profile if we have a token but no data
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !data && !isLoading) {
      refetch();
    }
  }, [data, isLoading, refetch]);

  if (
    pathname === "/forgot-password" ||
    pathname === "/login" ||
    pathname === "/reset-password" ||
    pathname === "/verify-otp"
  ) {
    return null;
  }

  const userProfile = data?.data;
  const userName = userProfile?.first_name || "User";

  return (
    <div className="border border-heading rounded-xl p-5 flex justify-between items-center w-full">
      <div>
        <h2 className="font-medium text-2xl text-heading">
          Welcome, {userName}
        </h2>
        <p className="text-[16px] font-normal">Have a nice day</p>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <div className="w-[53px] h-[53px] rounded-full bg-gray-200 animate-pulse"></div>
        ) : (
          <Image
            alt="user image"
            src={getFullImageFullUrl(userProfile?.image) || "/assets/user.png"}
            width={53}
            height={53}
            className="rounded-full object-cover"
            unoptimized
          />
        )}
        <p className="text-[16px] font-normal">{userName}</p>
      </div>
    </div>
  );
};

export default AdminHeader;
