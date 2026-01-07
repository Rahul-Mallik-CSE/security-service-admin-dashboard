/** @format */

"use client";
import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { IOperativeManagement, TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { operativeManagementData } from "../../data/OperativeManagement";
import OperativeManageInfoModal from "./OperativeManageInfoModal";
import { FaStar } from "react-icons/fa";

const OperativeManage = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "operativeName", label: "Operative Name ", width: "100px" },
    { key: "email", label: "Email", width: "100px" },
    { key: "subscription", label: "Subscription", width: "100px" },
    { key: "rating", label: "Rating", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: IOperativeManagement, columnKey: string) => {
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
                  document.getElementById("my_modal_4") as HTMLDialogElement
                ).showModal()
              }
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
            <OperativeManageInfoModal></OperativeManageInfoModal>
          </div>
        );
      default:
        return String(item[columnKey as keyof IOperativeManagement]);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">
          Operative Management
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
          <button className="text-title bg-orange-200 rounded-xl py-1.5 px-4 font-medium flex items-center gap-2 text-[20px]">
            <span className="text-">Filter</span>
            <SlidersHorizontal />
          </button>
        </form>
      </div>
      <CustomTable
        columns={columns}
        data={operativeManagementData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default OperativeManage;
