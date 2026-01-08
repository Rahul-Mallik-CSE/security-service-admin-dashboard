/** @format */

"use client";
import React, { useState, useMemo } from "react";
import { IPayrollReports, TableColumn } from "../../types/AllTypes";
import { CiSearch } from "react-icons/ci";
import CustomTable from "../../components/SharedComponents/CustomTable";
import {
  useGetPayrollReportsQuery,
  IPayrollData,
} from "@/redux/freatures/payrollReportsAPI";

const PayrollReports = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, error } = useGetPayrollReportsQuery();

  const columns: TableColumn[] = [
    { key: "companyName", label: "Company Name", width: "100px" },
    { key: "totalJobs", label: "Total Jobs", width: "100px" },
    { key: "totalOperatives", label: "Total Operatives", width: "100px" },
    { key: "totalHours", label: "Total Hours", width: "100px" },
    { key: "totalPay", label: "Total Pay ($)", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
  ];

  // Transform API data to table format with search
  const tableData: IPayrollReports[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data
      .map((payroll: IPayrollData, index: number) => ({
        id: index.toString(),
        companyName: payroll.company_name || "N/A",
        totalJobs: payroll.total_jobs,
        totalOperatives: payroll.total_operatives,
        totalHours: payroll.total_hours,
        totalPay: payroll.total_pay,
        status: (payroll.status === "is_signed" ? "send" : "pending") as
          | "pending"
          | "send",
      }))
      .filter((payroll) => {
        if (!searchText) return true;
        const searchLower = searchText.toLowerCase();
        return (
          payroll.companyName.toLowerCase().includes(searchLower) ||
          payroll.totalJobs.toString().includes(searchLower) ||
          payroll.totalOperatives.toString().includes(searchLower)
        );
      });
  }, [data, searchText]);

  const renderCell = (item: IPayrollReports, columnKey: string) => {
    switch (columnKey) {
      case "totalPay":
        return <div>${item.totalPay.toFixed(2)}</div>;
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

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading payroll reports data. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">Payroll Reports</h2>
        <div className="flex justify-between items-center gap-5">
          <form className="relative ">
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
    </div>
  );
};

export default PayrollReports;
