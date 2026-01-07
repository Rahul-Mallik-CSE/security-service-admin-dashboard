/** @format */
"use client";
import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  IoDocumentTextOutline,
  IoChatbubblesOutline,
  IoGridOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RiBriefcaseLine, RiMapPinLine } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiSupport, BiUserPlus } from "react-icons/bi";
import { FaShieldAlt, FaUserAlt } from "react-icons/fa";
import LogoutModal from "./LogOutModal";
import logo from "../../../public/logo.svg";
import { FaMoneyCheck, FaUsersRays } from "react-icons/fa6";
import { VscVerified } from "react-icons/vsc";
import { BsShieldLock } from "react-icons/bs";
import { CircleDollarSign, FilePenLine, MapPinHouse } from "lucide-react";
import { LiaUsersCogSolid } from "react-icons/lia";
// import { logout } from "@/service/authService";
export default function DashboardSidebar() {
  return <DashboardSidebarContent />;
}

function DashboardSidebarContent() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    // Perform logout actions here (clear tokens, etc.)
    // Redirect to login page
    // await logout();
    // localStorage.removeItem("accessToken");
    router.push("/sign-in");
    setIsLogoutModalOpen(false);
  };

  if (
    pathname === "/forgot-password" ||
    pathname === "/login" ||
    pathname === "/reset-password" ||
    pathname === "/verify-otp"
  ) {
    return null;
  }

  const isCollapsed = state === "collapsed";

  const navItems = [
    { href: "/", label: "Dashboard", icon: IoGridOutline },
    { href: "/subscriptions", label: "Subscriptions", icon: FaMoneyCheck },
    {
      href: "/verification-center",
      label: "Verification Center",
      icon: VscVerified,
    },
    {
      href: "/operative-manage",
      label: "Operative Manage",
      icon: BsShieldLock,
    },
    { href: "/company-manage", label: "Company Manage", icon: MapPinHouse },
    { href: "/jobs", label: "Jobs", icon: FaUsersRays },
    { href: "/contract-list", label: "Contract List", icon: FilePenLine },
    {
      href: "/payroll-reports",
      label: "Payroll Reports",
      icon: CircleDollarSign,
    },
    {
      href: "/referral-manage",
      label: "Referral Manage",
      icon: LiaUsersCogSolid,
    },
    { href: "/settings", label: "Settings", icon: IoSettingsOutline },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar className="border-r-0  " collapsible="icon">
        <SidebarContent className="bg-white">
          <div
            className={`flex items-center justify-center  px-0 md:px-4 py-4 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src={"/logo.svg"}
                  alt="Logo"
                  width={48}
                  height={48}
                  className="rounded-xl object-contain"
                />
              </Link>
            </div>

            {/* Collapse button for desktop */}
            {/* <div className={`absolute top-1 hidden md:block right-0`}>
                            <SidebarTrigger />
                        </div> */}
          </div>

          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-5 items-center" : "md:px-6 space-y-1"
            }
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                }
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// ...existing code...

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          active
            ? "bg-bg-primary text-white hover:text-white hover:bg-orange-500 focus:bg-orange-600 font-medium"
            : "bg-transparent text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
        )}
      >
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 py-3 transition-colors rounded-md"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
