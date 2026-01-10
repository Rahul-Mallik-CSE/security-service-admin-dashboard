/** @format */

import baseAPI from "../api/baseAPI";
import { ISupportMessagesAPIResponse } from "@/types/AllTypes";

const supportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get all support messages
    getSupportMessages: builder.query<ISupportMessagesAPIResponse, void>({
      query: () => ({
        url: "/api/jobs/support-message/",
        method: "GET",
      }),
      providesTags: ["Support"],
    }),
  }),
});

export const { useGetSupportMessagesQuery } = supportAPI;
export default supportAPI;
