/** @format */

import baseAPI from "../api/baseAPI";
import {
  IUserProfileAPIResponse,
  ISubscriptionPlansAPIResponse,
} from "@/types/AllTypes";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query<IUserProfileAPIResponse, void>({
      query: () => ({
        url: "/api/accounts/user-profile/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<IUserProfileAPIResponse, FormData>({
      query: (formData) => ({
        url: "/api/accounts/profile-update/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get subscription plans
    getSubscriptionPlans: builder.query<ISubscriptionPlansAPIResponse, void>({
      query: () => ({
        url: "/api/admin/subs-plans/",
        method: "GET",
      }),
      providesTags: ["Billing"],
    }),

    // Update subscription plan
    updateSubscriptionPlan: builder.mutation<
      any,
      { id: number; data: { duraton_day: number; price: number } }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/subs-plans/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Billing"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} = settingAPI;
export default settingAPI;
