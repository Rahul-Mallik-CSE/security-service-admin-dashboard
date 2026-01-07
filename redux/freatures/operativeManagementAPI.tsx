/** @format */

import baseAPI from "../api/baseAPI";
import { IOperativeManagementAPIResponse } from "@/types/AllTypes";

const operativeManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOperativeManagement: builder.query<
      IOperativeManagementAPIResponse,
      void
    >({
      query: () => "/api/admin/operative-management/",
      providesTags: ["OperativeTrackers"],
    }),
    deleteOperative: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/admin/recent-user/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["OperativeTrackers"],
    }),
  }),
});

export const { useGetOperativeManagementQuery, useDeleteOperativeMutation } =
  operativeManagementAPI;
export default operativeManagementAPI;
