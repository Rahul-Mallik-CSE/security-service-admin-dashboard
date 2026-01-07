/** @format */

import baseApi from "../api/baseAPI";
import { ISubscriptionAPIResponse } from "@/types/AllTypes";

const subscriptionsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<ISubscriptionAPIResponse, void>({
      query: () => "/api/admin/recent-subscribsion/",
      providesTags: ["Billing"],
    }),
    deleteSubscription: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/admin/recent-subscribsion/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Billing"],
    }),
  }),
});

export const { useGetSubscriptionsQuery, useDeleteSubscriptionMutation } =
  subscriptionsAPI;
