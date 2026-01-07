/** @format */

"use client";
import React, { ReactNode } from "react";
import DashboardSidebar from "../SharedComponents/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "../SharedComponents/AdminHeader";
import { usePathname } from "next/navigation";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const isShowSidebar = pathName?.includes("/auth");
  // console.log(isShowSidebar);
  return (
    <SidebarProvider>
      {isShowSidebar ? null : <DashboardSidebar></DashboardSidebar>}

      <div className="p-5 w-full space-y-5">
        {isShowSidebar ? null : <AdminHeader></AdminHeader>}
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Wrapper;
