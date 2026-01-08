/** @format */

import baseAPI from "../api/baseAPI";

export interface IPayrollData {
  company_name: string | null;
  total_jobs: number;
  total_operatives: number;
  total_hours: number;
  total_pay: number;
  status: string;
}

export interface IPayrollReportsAPIResponse {
  success: boolean;
  message: string;
  data: IPayrollData[];
}

const payrollReportsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPayrollReports: build.query<IPayrollReportsAPIResponse, void>({
      query: () => ({
        url: "/api/admin/payroll-management/",
        method: "GET",
      }),
      providesTags: ["Payroll"],
    }),
  }),
});

export const { useGetPayrollReportsQuery } = payrollReportsAPI;

export default payrollReportsAPI;
