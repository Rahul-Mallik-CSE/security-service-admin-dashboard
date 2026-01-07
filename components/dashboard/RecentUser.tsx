/** @format */

"use client";
import CustomTable from "../SharedComponents/CustomTable";
import { IRecentUserData, TableColumn } from "@/types/AllTypes";
import { RecentUserData } from "@/data/RecentUserData";
import { CiCircleInfo } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import InfoModal from "./UserInfoModal";

const RecentUser = () => {
  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "userName", label: "User Name", width: "150px" },
    { key: "email", label: "Email", width: "120px" },
    { key: "joinDate", label: "Join Date ", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];
  const renderCell = (item: IRecentUserData, columnKey: string) => {
    switch (columnKey) {
      case "action":
        return (
          <div className="flex items-center">
            <button
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal()
              }
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
            <InfoModal></InfoModal>
          </div>
        );
      default:
        return String(item[columnKey as keyof IRecentUserData]);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-medium text-heading mb-3">Recent Users</h2>
      <CustomTable
        columns={columns}
        data={RecentUserData}
        renderCell={renderCell}
      ></CustomTable>
    </div>
  );
};

export default RecentUser;
