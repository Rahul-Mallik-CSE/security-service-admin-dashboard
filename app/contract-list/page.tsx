/** @format */

"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { IContractList, TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { contractListData } from "../../data/ContractList";
import Link from "next/link";

const ContractList = () => {
  const [searchText, setSeachText] = useState<string>("");
  const columns: TableColumn[] = [
    { key: "contractId", label: "Contract ID", width: "100px" },
    { key: "job", label: "Job", width: "100px" },
    { key: "companyName", label: "Company Name", width: "100px" },
    { key: "operativesName", label: "Operatives Name", width: "100px" },
    { key: "issueDate", label: "Issue Date", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: IContractList, columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <div
            className={`px-4 py-1 w-20 flex justify-center rounded-lg text-xs font-medium capitalize ${
              item.status === "cancel" ? "text-red-500 bg-red-100" : null
            } ${
              item.status === "signed" ? "text-green-500 bg-green-100" : null
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
            <Link
              href={`/contract-list/${34343}`}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </Link>
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String(item[columnKey as keyof IContractList]);
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
        data={contractListData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default ContractList;
