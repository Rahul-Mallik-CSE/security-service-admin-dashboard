/** @format */

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const AdminHeader = () => {
  const pathname = usePathname();
  if (
    pathname === "/forgot-password" ||
    pathname === "/login" ||
    pathname === "/reset-password" ||
    pathname === "/verify-otp"
  ) {
    return null;
  }
  return (
    <div className="border border-heading rounded-xl p-5 flex justify-between items-center w-full">
      <div>
        <h2 className="font-medium text-2xl text-heading">Welcome, Sidney</h2>
        <p className="text-[16px] font-normal">Have a nice day</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          alt="user image"
          src={"/assets/user.png"}
          width={53}
          height={53}
          className="rounded-full"
        ></Image>
        <p className="text-[16px] font-normal">Sindey</p>
      </div>
    </div>
  );
};

export default AdminHeader;
