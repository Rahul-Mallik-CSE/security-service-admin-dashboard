/** @format */

"use client";
import CustomTable from "../SharedComponents/CustomTable";
import { IRecentUserData, TableColumn } from "@/types/AllTypes";
import { CiCircleInfo } from "react-icons/ci";
import InfoModal from "./UserInfoModal";
import { IDashboardUser } from "@/redux/freatures/dashboardAPI";
import { useState } from "react";
import { format } from "date-fns";

interface RecentUserProps {
  users: IDashboardUser[];
  isLoading: boolean;
}

const RecentUser = ({ users, isLoading }: RecentUserProps) => {
  const [selectedUser, setSelectedUser] = useState<IDashboardUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "userName", label: "User Name", width: "150px" },
    { key: "email", label: "Email", width: "120px" },
    { key: "joinDate", label: "Join Date", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Transform API data to match table format
  const tableData: IRecentUserData[] = users.map((user) => ({
    id: user.id.toString(),
    trId: `#${user.id}`,
    userName: user.email.split("@")[0], // Using email prefix as username
    email: user.email,
    joinDate: format(new Date(user.create_at), "MM-dd-yyyy"),
  }));

  const renderCell = (item: IRecentUserData, columnKey: string) => {
    switch (columnKey) {
      case "action":
        return (
          <div className="flex items-center">
            <button
              onClick={() => {
                const user = users.find((u) => u.id.toString() === item.id);
                if (user) {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }
              }}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
          </div>
        );
      default:
        return String(item[columnKey as keyof IRecentUserData]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium text-heading mb-3">Recent Users</h2>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <CustomTable
          columns={columns}
          data={tableData}
          renderCell={renderCell}
        />
      )}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default RecentUser;
