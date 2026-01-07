/** @format */

import baseApi from "../api/baseAPI";
import { IVerificationAPIResponse } from "@/types/AllTypes";

const verificationCenterAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerifications: builder.query<IVerificationAPIResponse, void>({
      query: () => "/api/admin/recent-user/",
      providesTags: ["Verification"],
    }),
    approveUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/admin/user-details/${id}/`,
        method: "PUT",
        body: { is_admin_aproved: true },
      }),
      invalidatesTags: ["Verification"],
    }),
    rejectUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/admin/user-details/${id}/`,
        method: "PATCH",
        body: { is_admin_rejected: true },
      }),
      invalidatesTags: ["Verification"],
    }),
  }),
});

export const {
  useGetVerificationsQuery,
  useApproveUserMutation,
  useRejectUserMutation,
} = verificationCenterAPI;
