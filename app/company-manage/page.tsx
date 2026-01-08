/** @format */

"use client";
import React, { useState, useMemo } from "react";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ICompanyManagement, TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import CompanyManagementInfoModal from "./CompanyManagementInfoModal";
import {
  useGetCompanyManagementQuery,
  ICompanyData,
} from "@/redux/freatures/companyManageAPI";

const CompanyManage = () => {
  const [searchText, setSeachText] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<ICompanyData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetCompanyManagementQuery();

  const columns: TableColumn[] = [
    { key: "trId", label: "#TR.ID", width: "100px" },
    { key: "companyName", label: "Company Name", width: "100px" },
    { key: "email", label: "Email", width: "100px" },
    { key: "subscription", label: "Subscription", width: "100px" },
    { key: "rating", label: "Rating", width: "100px" },
    { key: "status", label: "Status", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Transform API data to table format
  const tableData: ICompanyManagement[] = useMemo(() => {
    if (!data?.companies) return [];

    return data.companies
      .map((companyData) => {
        const latestInvoice =
          companyData.invoices.length > 0 ? companyData.invoices[0] : null;
        const subscriptionPlanName = latestInvoice
          ? `Plan ${latestInvoice.plan}`
          : "No Subscription";

        return {
          id: companyData.company.id.toString(),
          trId: `#${companyData.company.id}`,
          companyName:
            companyData.company_name || companyData.company.email.split("@")[0],
          email: companyData.company.email,
          subscription: subscriptionPlanName,
          rating: parseFloat(companyData.average_rating_main),
          status: companyData.company.is_subscribe ? "active" : "suspanded",
        } as ICompanyManagement;
      })
      .filter((company) => {
        if (!searchText) return true;
        const searchLower = searchText.toLowerCase();
        return (
          company.companyName.toLowerCase().includes(searchLower) ||
          company.email.toLowerCase().includes(searchLower) ||
          company.trId.toLowerCase().includes(searchLower)
        );
      });
  }, [data, searchText]);

  const renderCell = (item: ICompanyManagement, columnKey: string) => {
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
                const company = data?.companies.find(
                  (c) => c.company.id.toString() === item.id
                );
                if (company) {
                  setSelectedCompany(company);
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
        return String(item[columnKey as keyof ICompanyManagement]);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading company management data. Please try again.
      </div>
    );
  }

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
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <CustomTable
          columns={columns}
          data={tableData}
          renderCell={renderCell}
        />
      )}
      <CompanyManagementInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={selectedCompany}
      />
    </div>
  );
};

export default CompanyManage;
