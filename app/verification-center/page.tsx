/** @format */

"use client";
import React, { useState } from "react";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { IVerificationCenter, TableColumn } from "../../types/AllTypes";
import { verifictionCenterData } from "../../data/VerificationCenter";
import VerificationInfoModal from "./VerificationInfoModal";

const VerificationCenter = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "userName", label: "User Name", width: "150px" },
    { key: "userRole", label: "User Role", width: "150px" },
    { key: "submittedDocs", label: "Submitted Docs", width: "120px" },
    { key: "uploadDate", label: "Upload Date", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  const renderCell = (item: IVerificationCenter, columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <div
            className={`px-4 py-1 w-20 flex justify-center rounded-lg text-xs font-medium capitalize ${
              item.status === "reject" ? "text-red-500 bg-red-100" : null
            } ${
              item.status === "approved" ? "text-green-500 bg-green-100" : null
            } ${
              item.status === "pending" ? "text-yellow-500 bg-yellow-100" : null
            }`}
          >
            {item?.status}
          </div>
        );
      case "action":
        return (
          <div className="flex items-center">
            <button
              onClick={() =>
                (
                  document.getElementById("my_modal_3") as HTMLDialogElement
                ).showModal()
              }
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <VerificationInfoModal></VerificationInfoModal>
          </div>
        );
      default:
        return String(item[columnKey as keyof IVerificationCenter]);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">
          Verification Center
        </h2>
        <form className="relative">
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
      </div>
      <CustomTable
        columns={columns}
        data={verifictionCenterData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default VerificationCenter;
