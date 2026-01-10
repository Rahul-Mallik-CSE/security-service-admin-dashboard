/** @format */

"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useMemo } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { IContractEngagement, TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import DeleteModal from "../../components/SharedComponents/DeleteModal";
import Link from "next/link";
import {
  useGetAllContractsQuery,
  useDeleteContractMutation,
} from "../../redux/freatures/contactListAPI";

interface IContractTableData {
  id: string;
  contractId: string;
  job: string;
  companyName: string;
  operativesName: string;
  issueDate: string;
  status: "pending" | "is_signed" | "completed" | "not_pay" | "shift_completed";
}

const ContractList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<number | null>(
    null
  );

  // Fetch contracts data
  const { data, isLoading, error } = useGetAllContractsQuery();
  const [deleteContract, { isLoading: isDeleting }] =
    useDeleteContractMutation();

  const columns: TableColumn[] = [
    { key: "contractId", label: "Contract ID", width: "100px" },
    { key: "job", label: "Job", width: "150px" },
    { key: "companyName", label: "Company Name", width: "150px" },
    { key: "operativesName", label: "Operatives Name", width: "150px" },
    { key: "issueDate", label: "Issue Date", width: "120px" },
    { key: "status", label: "Status", width: "120px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Transform API data to table format
  const contractsTableData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((engagement: IContractEngagement) => ({
      id: engagement.id.toString(),
      contractId: `#${engagement.id.toString().padStart(5, "0")}`,
      job: engagement.job_details.job_title,
      companyName: engagement.job_details.job_provider.company_name,
      operativesName: engagement.application.candidate.first_name,
      issueDate: new Date(engagement.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: engagement.contacts_trackers,
    }));
  }, [data]);

  // Filter contracts based on search
  const filteredContracts = useMemo(() => {
    if (!searchText) return contractsTableData;

    const searchLower = searchText.toLowerCase();
    return contractsTableData.filter(
      (contract) =>
        contract.contractId.toLowerCase().includes(searchLower) ||
        contract.job.toLowerCase().includes(searchLower) ||
        contract.companyName.toLowerCase().includes(searchLower) ||
        contract.operativesName.toLowerCase().includes(searchLower)
    );
  }, [contractsTableData, searchText]);

  const handleDeleteClick = (contractId: string) => {
    setSelectedContractId(Number(contractId));
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedContractId) {
      try {
        await deleteContract(selectedContractId).unwrap();
        setDeleteModalOpen(false);
        setSelectedContractId(null);
      } catch (error) {
        console.error("Failed to delete contract:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "is_signed":
        return "text-green-500 bg-green-100";
      case "completed":
        return "text-blue-500 bg-blue-100";
      case "pending":
        return "text-yellow-500 bg-yellow-100";
      case "not_pay":
        return "text-red-500 bg-red-100";
      case "shift_completed":
        return "text-purple-500 bg-purple-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "is_signed":
        return "Signed";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "not_pay":
        return "Not Paid";
      case "shift_completed":
        return "Shift Completed";
      default:
        return status;
    }
  };

  const renderCell = (item: IContractTableData, columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <div
            className={`px-4 py-1 w-28 flex justify-center rounded-lg text-xs font-medium capitalize ${getStatusColor(
              item.status
            )}`}
          >
            {getStatusLabel(item.status)}
          </div>
        );
      case "action":
        return (
          <div className="flex items-center gap-1">
            <Link
              href={`/contract-list/${item.id}`}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </Link>
            <Button
              onClick={() => handleDeleteClick(item.id)}
              className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
              disabled={isDeleting}
            >
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String(item[columnKey as keyof IContractTableData]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading contracts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-500">
          Error loading contracts. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">Contract List</h2>
        <form className="relative flex justify-between items-center gap-5">
          <input
            type="search"
            placeholder="Search"
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
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
        data={filteredContracts}
        renderCell={renderCell}
      />

      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Contract"
        description="Are you sure you want to delete this contract? This action cannot be undone."
      />
    </div>
  );
};

export default ContractList;
