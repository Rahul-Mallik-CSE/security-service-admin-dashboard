/** @format */

"use client";
import BackButton from "@/components/SharedComponents/BackButton";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import PersonalInfomationEditModal from "./PersonalInfomationEditModal";
import { useGetUserProfileQuery } from "@/redux/freatures/settingAPI";
import { getFullImageFullUrl } from "@/lib/utils";

const PersonalInformation = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const userProfile = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <BackButton></BackButton>
          <h2 className="text-2xl font-medium text-heading">
            Personal Information
          </h2>
        </div>
        <button
          onClick={() =>
            (
              document.getElementById("my_modal_8") as HTMLDialogElement
            ).showModal()
          }
          className="text-[16px] font-medium flex items-center gap-2 cursor-pointer text-white bg-bg-primary rounded-2xl py-3 px-7"
        >
          <CiEdit />
          <span>Edit</span>
        </button>
        <PersonalInfomationEditModal userProfile={userProfile} />
      </div>
      <div className="flex items-start gap-5 mt-5">
        <div className="h-[300px] w-[250px] border border-title p-4 rounded-2xl flex flex-col gap-px justify-center items-center">
          <Image
            src={getFullImageFullUrl(userProfile?.image) || "/assets/user.png"}
            alt="admin image"
            width={90}
            height={90}
            className="rounded-full object-cover"
            unoptimized
          />
          <p className="text-sm font-medium text-paragraph">
            {userProfile?.user_type || "Admin"}
          </p>
          <h2 className="text-2xl font-medium text-heading">
            {userProfile?.first_name || "User"}
          </h2>
        </div>
        <div className="space-y-3.5">
          <div>
            <h3 className="text-[18px] font-medium text-heading mb-2">
              Full Name
            </h3>
            <p className="text-paragraph text-sm w-[557px] h-[52px] flex items-center px-5 border border-gray-300 bg-white rounded-[12px]">
              {userProfile?.first_name || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-heading mb-2">Email</h3>
            <p className="text-paragraph text-sm w-[557px] h-[52px] flex items-center px-5 border border-gray-300 bg-white rounded-[12px]">
              {userProfile?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
