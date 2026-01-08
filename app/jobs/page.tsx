/** @format */

"use client";
import React, { useState, useMemo } from "react";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { SlidersHorizontal } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { IJobs, TableColumn } from "../../types/AllTypes";
import FilterModal from "../../components/SharedComponents/FilterModal";
import DeleteModal from "../../components/SharedComponents/DeleteModal";
import {
  useGetJobsQuery,
  useDeleteJobMutation,
  IJobData,
} from "@/redux/freatures/jobsAPI";
import { format, isWithinInterval, parseISO } from "date-fns";
import { toast } from "react-toastify";

const Jobs = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data, isLoading, error } = useGetJobsQuery();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const columns: TableColumn[] = [
    { key: "jobId", label: "Job ID", width: "100px" },
    { key: "jobTitle", label: "Job Title", width: "100px" },
    { key: "assigned", label: "Assigned", width: "100px" },
    { key: "company", label: "Company", width: "100px" },
    { key: "dateTime", label: "Date/Time", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Transform API data to table format with search and filter
  const tableData: IJobs[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data
      .map((job: IJobData) => ({
        id: job.id.toString(),
        jobId: `${job.id}`,
        jobTitle: job.job_title,
        assigned: job.selected_list,
        company: job.job_provider.company.first_name,
        payRate: parseFloat(job.pay_rate),
        dateTime: format(new Date(job.created_at), "MM-dd-yyyy HH:mm"),
        status: (job.is_application_complete ? "send" : "pending") as
          | "send"
          | "pending",
        created_at: job.created_at,
      }))
      .filter((job) => {
        // Search filter
        if (searchText) {
          const searchLower = searchText.toLowerCase();
          const matchesSearch =
            job.jobTitle.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.jobId.toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        // Date filter
        if (startDate && endDate) {
          const jobDate = parseISO(job.created_at);
          const start = parseISO(startDate);
          const end = parseISO(endDate);
          return isWithinInterval(jobDate, { start, end });
        }

        return true;
      });
  }, [data, searchText, startDate, endDate]);

  const handleApplyFilter = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleDeleteClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedJobId) return;

    try {
      await deleteJob(parseInt(selectedJobId)).unwrap();
      toast.success("Job deleted successfully!");
      setSelectedJobId(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to delete job";
      toast.error(errorMessage);
    }
  };

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
            <Button
              onClick={() => handleDeleteClick(item.id)}
              disabled={isDeleting}
              className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
            >
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String(item[columnKey as keyof IJobs]);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading jobs data. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">Jobs Management</h2>
        <div className="flex justify-between items-center gap-5">
          <form className="relative">
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
          <button
            onClick={() => setIsFilterOpen(true)}
            className="text-title bg-orange-200 rounded-xl py-1.5 px-4 font-medium flex items-center gap-2 text-[20px] cursor-pointer"
          >
            <span>Filter</span>
            <SlidersHorizontal />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <CustomTable
          columns={columns}
          data={tableData}
          renderCell={renderCell}
        />
      )}

      <FilterModal
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApplyFilter={handleApplyFilter}
      />

      <DeleteModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Job"
        description="Are you sure you want to delete this job? This action cannot be undone."
      />
    </div>
  );
};

export default Jobs;
