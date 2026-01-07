/** @format */

"use client";
import { useState } from "react";
import { IReferralManage, TableColumn } from "../../types/AllTypes";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { referralManageData } from "../../data/ReferralManage";
import EditRewardInfoModal from "./EditRewardInfoModal";
import CurrentUserEditRewardModal from "./CurrentUserEditRewardModal";

const RefferalManage = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "userId", label: "User ID", width: "100px" },
    { key: "userName", label: "User Name", width: "100px" },
    { key: "userEmail", label: "User Email", width: "100px" },
    { key: "totalReferrals", label: "Total Referrals", width: "100px" },
    { key: "subscribed", label: "Subscribed", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: IReferralManage, columnKey: string) => {
    switch (columnKey) {
      case "action":
        return (
          <div className="flex items-center">
            <button
              onClick={() =>
                (
                  document.getElementById("my_modal_7") as HTMLDialogElement
                ).showModal()
              }
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <CurrentUserEditRewardModal></CurrentUserEditRewardModal>
          </div>
        );
      default:
        return String(item[columnKey as keyof IReferralManage]);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">
          Operative Management
        </h2>
        <div className="flex justify-between items-center gap-5">
          <form className="relative ">
            <input
              type="search"
              placeholder="Search"
              name="search"
              onChange={(e) => setSeachText(e.currentTarget.value)}
              className="bg-gray-50 py-2 pl-10 pr-4 appearance-none outline-none border border-gray-300 rounded-xl w-[282px]"
            />
            <CiSearch
              className="absolute left-3 top-3 text-paragraph"
              size={20}
            />
          </form>
          <button
            onClick={() =>
              (
                document.getElementById("my_modal_6") as HTMLDialogElement
              ).showModal()
            }
            className="text-title bg-orange-200 rounded-xl py-1.5 px-4 font-medium flex items-center gap-2 text-[20px] cursor-pointer"
          >
            <span>Edit Reward</span>
          </button>
          <EditRewardInfoModal></EditRewardInfoModal>
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={referralManageData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default RefferalManage;
