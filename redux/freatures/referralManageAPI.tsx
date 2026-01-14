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

export interface IRewardData {
  id: number;
  is_percentage_guard: boolean;
  is_percentage_company: boolean;
  percentage_company: number;
  percentage_guard: number;
  min_referral_user_of_company: number;
  min_referral_user_of_guard: number;
  total_free_days_company: number;
  total_free_days_guard: number;
}

export interface IRewardAPIResponse {
  success: boolean;
  message: string;
  data: IRewardData;
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
    getRewardSettings: build.query<IRewardAPIResponse, void>({
      query: () => ({
        url: "/api/admin/payment-controller/",
        method: "GET",
      }),
      providesTags: ["Referral"],
    }),
    editReward: build.mutation<any, any>({
      query: (body) => ({
        url: "/api/admin/payment-controller/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Referral"],
    }),
  }),
});

export const {
  useGetReferralManageQuery,
  useGetRewardSettingsQuery,
  useEditRewardMutation,
} = referralManageAPI;

export default referralManageAPI;
