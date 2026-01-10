/** @format */

import baseAPI from "../api/baseAPI";
import {
  IContractListAPIResponse,
  IContractDetailsAPIResponse,
} from "../../types/AllTypes";

const contactListAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get all contracts
    getAllContracts: builder.query<IContractListAPIResponse, void>({
      query: () => ({
        url: "/api/admin/contact-management/",
        method: "GET",
      }),
      providesTags: ["Contract"],
    }),

    // Get contract details by ID
    getContractDetails: builder.query<IContractDetailsAPIResponse, number>({
      query: (id) => ({
        url: `/api/jobs/company-engagements-details/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Contract", id }],
    }),

    // Delete contract
    deleteContract: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/api/admin/contact-management/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contract"],
    }),
  }),
});

export const {
  useGetAllContractsQuery,
  useGetContractDetailsQuery,
  useDeleteContractMutation,
} = contactListAPI;

export default contactListAPI;
