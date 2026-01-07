/** @format */

"use client";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { useState } from "react";
import { IEarningList, TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { earningList } from "../../data/EarningList";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import EarningInfoModal from "./EarningInfoModal";

const Subscriptions = () => {
  const [searchText, setSeachText] = useState<string>("");
  // console.log(searchText);
  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "userName", label: "User Name", width: "150px" },
    { key: "name", label: "Name", width: "150px" },
    { key: "email", label: "Email", width: "120px" },
    { key: "date", label: "Date", width: "100px" },
    { key: "amount", label: "Amount", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: IEarningList, columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <div
            className={`px-2 py-1 w-16 flex justify-center rounded-lg text-xs font-medium ${
              item?.status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
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
                  document.getElementById("my_modal_2") as HTMLDialogElement
                ).showModal()
              }
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
            <EarningInfoModal></EarningInfoModal>
          </div>
        );
      default:
        return String(item[columnKey as keyof IEarningList]);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">Earnings List</h2>
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
        data={earningList}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default Subscriptions;
