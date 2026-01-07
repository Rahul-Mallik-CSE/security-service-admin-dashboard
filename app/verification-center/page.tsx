/** @format */

"use client";
import React, { useState } from "react";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { IVerificationCenter, TableColumn } from "../../types/AllTypes";
import VerificationInfoModal from "./VerificationInfoModal";
import { useGetVerificationsQuery } from "@/redux/freatures/verificationCenterAPI";

const VerificationCenter = () => {
  const [searchText, setSeachText] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<IVerificationCenter | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: verificationData, isLoading } = useGetVerificationsQuery();

  const columns: TableColumn[] = [
    { key: "email", label: "User Name", width: "150px" },
    { key: "user_type", label: "User Role", width: "150px" },
    { key: "submittedDocs", label: "Submitted Docs", width: "120px" },
    { key: "create_at", label: "Upload Date", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  const handleOpenModal = (user: IVerificationCenter) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getStatus = (item: IVerificationCenter) => {
    if (item.is_admin_rejected) return "reject";
    if (item.is_admin_aproved) return "approved";
    return "pending";
  };

  const renderCell = (item: IVerificationCenter, columnKey: string) => {
    switch (columnKey) {
      case "email":
        return item.email;
      case "user_type":
        return item.user_type;
      case "submittedDocs":
        const totalDocs = item.licences.length + item.accreditations.length;
        return totalDocs > 0 ? `${totalDocs} documents` : "No documents";
      case "create_at":
        return new Date(item.create_at).toLocaleDateString();
      case "status":
        const status = getStatus(item);
        return (
          <div
            className={`px-4 py-1 w-20 flex justify-center rounded-lg text-xs font-medium capitalize ${
              status === "reject" ? "text-red-500 bg-red-100" : ""
            } ${status === "approved" ? "text-green-500 bg-green-100" : ""} ${
              status === "pending" ? "text-yellow-500 bg-yellow-100" : ""
            }`}
          >
            {status}
          </div>
        );
      case "action":
        return (
          <div className="flex items-center">
            <button
              onClick={() => handleOpenModal(item)}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
          </div>
        );
      default:
        return String((item as any)[columnKey]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading verifications...</p>
      </div>
    );
  }

  const verifications = verificationData?.results || [];

  // Filter verifications based on search text
  const filteredVerifications = verifications.filter((verification) => {
    if (!searchText) return true;

    const searchLower = searchText.toLowerCase();
    const totalDocs =
      verification.licences.length + verification.accreditations.length;
    const status = getStatus(verification);

    return (
      verification.email.toLowerCase().includes(searchLower) ||
      verification.user_type.toLowerCase().includes(searchLower) ||
      status.toLowerCase().includes(searchLower) ||
      totalDocs.toString().includes(searchLower) ||
      new Date(verification.create_at)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchLower)
    );
  });
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
        data={filteredVerifications}
        renderCell={renderCell}
        itemsPerPage={15}
      />
      <VerificationInfoModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default VerificationCenter;
