"use client";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

type TSettingLink = {
    path: string;
    label: string;
    icon: React.ComponentType;
}

const settigsLinks: TSettingLink[] = [
    {path: '/settings/personal-information', label: 'Personal Information', icon: FaRegUser},
    {path: '/settings/change-password', label: 'Change Password', icon: CiLock},
    {path: '/settings/subscription', label: 'Subscription', icon: HiOutlineClipboardDocumentList},
]

const Settings = () => {
    return (
        <div>
            <h2 className='text-2xl font-medium text-heading'>Settings</h2>
            <div className="mt-5 space-y-3">
                {
                    settigsLinks.map((link, index) => 
                        <Link href={link.path} className="p-4 bg-white w-full flex justify-between items-center rounded-2xl cursor-pointer" key={index}>
                            <div className="flex items-center gap-2 font-medium text-[16px]">
                                {link.icon && <link.icon />}
                                {link.label}
                            </div>
                            <IoIosArrowForward />
                        </Link>
                    )
                }
            </div>

        </div>
    )
}

export default Settings
