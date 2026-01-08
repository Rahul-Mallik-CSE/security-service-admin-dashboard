/** @format */

import baseAPI from "../api/baseAPI";

export interface IJobCompany {
  id: number;
  first_name: string;
}

export interface IJobProvider {
  company: IJobCompany;
  average_rating_main: string;
}

export interface IJobData {
  job_title: string;
  selected_list: number;
  job_provider: IJobProvider;
  pay_rate: string;
  job_duration: string;
  is_application_complete: boolean;
  created_at: string;
}

export interface IJobsAPIResponse {
  success: boolean;
  message: string;
  data: IJobData[];
}

export interface IDeleteJobResponse {
  success: boolean;
  message: string;
}

const jobsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query<IJobsAPIResponse, void>({
      query: () => ({
        url: "/api/admin/job-management/",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
    deleteJob: build.mutation<IDeleteJobResponse, number>({
      query: (id) => ({
        url: `/api/admin/job-management/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const { useGetJobsQuery, useDeleteJobMutation } = jobsAPI;

export default jobsAPI;
