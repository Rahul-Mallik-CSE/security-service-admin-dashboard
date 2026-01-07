/** @format */

"use client";
import BackButton from "@/components/SharedComponents/BackButton";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import logo from "../../../public/logo.svg";
import PersonalInfomationEditModal from "./PersonalInfomationEditModal";

const PersonalInformation = () => {
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
        <PersonalInfomationEditModal></PersonalInfomationEditModal>
      </div>
      <div className="flex items-start gap-5 mt-5">
        <div className="h-[300px] w-[250px] border border-title rounded-2xl flex flex-col gap-px justify-center items-center">
          <Image
            src={logo}
            alt="admin image"
            width={90}
            height={90}
            className="rounded-full"
          ></Image>
          <p className="text-sm font-medium text-paragraph">Admin</p>
          <h2 className="text-2xl font-medium text-heading">Murad</h2>
        </div>
        <div className="space-y-3.5">
          <div>
            <h3 className="text-[18px] font-medium text-heading mb-2">
              Full Name
            </h3>
            <p className="text-paragraph text-sm w-[557px] h-[52px] flex items-center px-5 border border-gray-300 bg-white rounded-[12px]">
              Md Murad
            </p>
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-heading mb-2">Email</h3>
            <p className="text-paragraph text-sm w-[557px] h-[52px] flex items-center px-5 border border-gray-300 bg-white rounded-[12px]">
              mdmurad.dev2004@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
