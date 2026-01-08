/** @format */

import baseAPI from "../api/baseAPI";

export interface IDashboardUser {
  id: number;
  email: string;
  status: boolean;
  phone: string | null;
  is_email_varified: boolean;
  is_phone_verified: boolean;
  image: string | null;
  last_activity: string | null;
  user_type: string;
  gender: string;
  is_admin_aproved: boolean;
  is_admin_rejected: boolean;
  is_subscribe: boolean;
  create_at: string;
  updated_at: string;
}

export interface IDashboardData {
  total_earnings: number;
  total_companies: number;
  total_guards: number;
  recent_users: IDashboardUser[];
}

export interface IDashboardResponse {
  success: boolean;
  message: string;
  data: IDashboardData;
}

const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboardSummary: build.query<IDashboardResponse, void>({
      query: () => ({
        url: "/api/admin/dashboard-summary/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardAPI;

export default dashboardAPI;
