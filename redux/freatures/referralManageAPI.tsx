/** @format */

import baseAPI from "../api/baseAPI";

export interface IReferralData {
  name: string;
  email_address: string;
  total_raffaral: number;
  total_subscribtion: number;
}

export interface IReferralManageAPIResponse {
  success: boolean;
  message: string;
  data: IReferralData[];
}

const referralManageAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getReferralManage: build.query<IReferralManageAPIResponse, void>({
      query: () => ({
        url: "/api/admin/raffaral-report/",
        method: "GET",
      }),
      providesTags: ["Referral"],
    }),
  }),
});

export const { useGetReferralManageQuery } = referralManageAPI;

export default referralManageAPI;
