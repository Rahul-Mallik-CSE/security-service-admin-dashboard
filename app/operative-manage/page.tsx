/** @format */

"use client";
import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import OperativeManageInfoModal from "./OperativeManageInfoModal";
import { FaStar } from "react-icons/fa";
import FilterModal from "@/components/SharedComponents/FilterModal";
import DeleteModal from "@/components/SharedComponents/DeleteModal";
import {
  useGetOperativeManagementQuery,
  useDeleteOperativeMutation,
} from "@/redux/freatures/operativeManagementAPI";
import { toast } from "react-toastify";

const OperativeManage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data, isLoading } = useGetOperativeManagementQuery();
  const [deleteOperative, { isLoading: isDeleting }] =
    useDeleteOperativeMutation();

  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "operativeName", label: "Operative Name", width: "100px" },
    { key: "email", label: "Email", width: "100px" },
    { key: "subscription", label: "Subscription", width: "100px" },
    { key: "rating", label: "Rating", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteOperative(selectedUser.candidate.id).unwrap();
      toast.success("Operative deleted successfully!");
      setDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to delete operative. Please try again."
      );
    }
  };

  const handleApplyFilter = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Transform API data to table format
  const transformedData =
    data?.data.map((item) => ({
      id: item.candidate.id,
      trId: `#${item.candidate.id}`,
      operativeName: item.candidate.email.split("@")[0],
      email: item.candidate.email,
      subscription: item.candidate.is_subscribe ? "Active" : "Inactive",
      rating: parseFloat(item.avg_rating_main),
      status: item.candidate.is_admin_aproved ? "active" : "suspanded",
      fullData: item,
    })) || [];

  // Filter data based on search and date range
  const filteredData = transformedData.filter((item) => {
    const matchesSearch =
      searchText === "" ||
      item.trId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.operativeName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase());

    const itemDate = new Date(item.fullData.candidate.create_at);
    const matchesDateRange =
      (!startDate || itemDate >= new Date(startDate)) &&
      (!endDate || itemDate <= new Date(endDate));

    return matchesSearch && matchesDateRange;
  });

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "rating":
        return (
          <div className="flex gap-2">
            <FaStar className="text-amber-300" size={18} />
            {item.rating.toFixed(2)}
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
              onClick={() => {
                setSelectedUser(item.fullData);
                (
                  document.getElementById("my_modal_4") as HTMLDialogElement
                ).showModal();
              }}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button
              onClick={() => {
                setSelectedUser(item.fullData);
                setDeleteModalOpen(true);
              }}
              className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
            >
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String(item[columnKey]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

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
            onChange={(e) => setSearchText(e.currentTarget.value)}
            className="bg-gray-50 py-2 pl-10 pr-4 appearance-none outline-none border border-gray-300 rounded-xl w-[282px]"
          />
          <CiSearch
            className="absolute left-3 top-3 text-paragraph"
            size={20}
          />
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="text-title bg-orange-200 rounded-xl py-1.5 px-4 font-medium flex items-center gap-2 text-[20px]"
          >
            <span>Filter</span>
            <SlidersHorizontal />
          </button>
        </form>
      </div>
      <CustomTable
        columns={columns}
        data={filteredData}
        renderCell={renderCell}
        itemsPerPage={15}
      />
      <OperativeManageInfoModal user={selectedUser} />
      <FilterModal
        open={filterOpen}
        onOpenChange={setFilterOpen}
        onApplyFilter={handleApplyFilter}
      />
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        itemName={selectedUser?.candidate.email}
      />
    </div>
  );
};

export default OperativeManage;
