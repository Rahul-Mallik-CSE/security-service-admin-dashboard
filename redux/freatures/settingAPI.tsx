/** @format */

import baseAPI from "../api/baseAPI";
import { IUserProfileAPIResponse } from "@/types/AllTypes";

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
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  settingAPI;
export default settingAPI;
