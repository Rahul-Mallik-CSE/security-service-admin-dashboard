/** @format */

"use client";
import { useState, useMemo } from "react";
import { IReferralManage, TableColumn } from "../../types/AllTypes";
import { CiSearch } from "react-icons/ci";
import CustomTable from "../../components/SharedComponents/CustomTable";
import EditRewardInfoModal from "./EditRewardInfoModal";
import {
  useGetReferralManageQuery,
  IReferralData,
} from "@/redux/freatures/referralManageAPI";

const RefferalManage = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, error } = useGetReferralManageQuery();

  const columns: TableColumn[] = [
    { key: "userId", label: "User ID", width: "100px" },
    { key: "userName", label: "User Name", width: "100px" },
    { key: "userEmail", label: "User Email", width: "100px" },
    { key: "totalReferrals", label: "Total Referrals", width: "100px" },
    { key: "subscribed", label: "Subscribed", width: "100px" },
  ];

  // Transform API data to table format with search
  const tableData: IReferralManage[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data
      .map((referral: IReferralData, index: number) => ({
        id: index.toString(),
        userId: `#${index + 1}`,
        userName: referral.name,
        userEmail: referral.email_address,
        totalReferrals: referral.total_raffaral,
        subscribed: referral.total_subscribtion,
      }))
      .filter((referral) => {
        if (!searchText) return true;
        const searchLower = searchText.toLowerCase();
        return (
          referral.userName.toLowerCase().includes(searchLower) ||
          referral.userEmail.toLowerCase().includes(searchLower) ||
          referral.userId.toLowerCase().includes(searchLower)
        );
      });
  }, [data, searchText]);

  const renderCell = (item: IReferralManage, columnKey: string) => {
    switch (columnKey) {
      default:
        return String(item[columnKey as keyof IReferralManage]);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading referral data. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">
          Referral Management
        </h2>
        <div className="flex justify-between items-center gap-5">
          <form className="relative ">
            <input
              type="search"
              placeholder="Search"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
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
          <button
            onClick={() =>
              (
                document.getElementById("my_modal_6") as HTMLDialogElement
              ).showModal()
            }
            className="text-blue-800 bg-blue-300 rounded-xl py-1.5 px-4 font-medium flex items-center gap-2 text-[20px] cursor-pointer"
          >
            <span>View Reward</span>
          </button>
          <EditRewardInfoModal></EditRewardInfoModal>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <CustomTable
          columns={columns}
          data={tableData}
          renderCell={renderCell}
        />
      )}
    </div>
  );
};

export default RefferalManage;
