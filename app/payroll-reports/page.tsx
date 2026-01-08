/** @format */

"use client";
import React, { useState } from "react";
import { IPayrollReports, TableColumn } from "../../types/AllTypes";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { SlidersHorizontal } from "lucide-react";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { payrollReportsData } from "../../data/PayrollReports";

const PayrollReports = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "companyName", label: "Company Name", width: "100px" },
    { key: "totalJobs", label: "Total Jobs", width: "100px" },
    { key: "totalOperatives", label: "Total Operatives", width: "100px" },
    { key: "totalHours", label: "Total Hours", width: "100px" },
    { key: "totalPay", label: "Total Pay ($)", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
  ];
  const renderCell = (item: IPayrollReports, columnKey: string) => {
    switch (columnKey) {
      case "totalPay":
        return <div>${item.totalPay}</div>;
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

      default:
        return String(item[columnKey as keyof IPayrollReports]);
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
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={payrollReportsData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default PayrollReports;
