/** @format */

"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ICompanyManagement, TableColumn } from "../../types/AllTypes";
import { SlidersHorizontal } from "lucide-react";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { CompanyManagementData } from "../../data/CompanyManagement";
import CompanyManagementInfoModal from "./CompanyManagementInfoModal";

const CompanyManage = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "companyName", label: "Company Name", width: "100px" },
    { key: "email", label: "Email", width: "100px" },
    { key: "subscription", label: "Subscription", width: "100px" },
    { key: "rating", label: "Rating", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: ICompanyManagement, columnKey: string) => {
    switch (columnKey) {
      case "rating":
        return (
          <div className="flex gap-2">
            <FaStar className="text-amber-300" size={18} />
            {item.rating}
          </div>
        );
      case "status":
        return (
          <div
            className={`px-4 py-1 w-20 flex justify-center rounded-lg text-xs font-medium capitalize ${
              item.status === "suspanded" ? "text-red-500 bg-red-100" : null
            } ${
              item.status === "active" ? "text-green-500 bg-green-100" : null
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
                  document.getElementById("my_modal_5") as HTMLDialogElement
                ).showModal()
              }
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
            <CompanyManagementInfoModal></CompanyManagementInfoModal>
          </div>
        );
      default:
        return String(item[columnKey as keyof ICompanyManagement]);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">
          Company Management
        </h2>
        <form className="relative flex justify-between items-center gap-5">
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
        data={CompanyManagementData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default CompanyManage;
