/** @format */

"use client";
import React, { useState } from "react";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { SlidersHorizontal } from "lucide-react";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { IJobs, TableColumn } from "../../types/AllTypes";
import { jobsData } from "../../data/Jobs";

const Jobs = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "jobId", label: "Job ID", width: "100px" },
    { key: "jobTitle", label: "Job Title", width: "100px" },
    { key: "assigned", label: "Assigned", width: "100px" },
    { key: "company", label: "Company", width: "100px" },
    { key: "dateTime", label: "Date/Time", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: IJobs, columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <div
            className={`px-4 py-1 w-20 flex justify-center rounded-lg text-xs font-medium capitalize ${
              item.status === "send" ? "text-blue-500 bg-blue-100" : null
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
            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String(item[columnKey as keyof IJobs]);
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
          <button className="text-title bg-orange-200 rounded-xl py-1.5 px-4 font-medium flex items-center gap-2 text-[20px] cursor-pointer">
            <span className="text-">Filter</span>
            <SlidersHorizontal />
          </button>
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={jobsData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default Jobs;
