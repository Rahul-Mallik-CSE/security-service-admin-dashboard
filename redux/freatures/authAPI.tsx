/** @format */

import { send } from "process";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // updatePassword: builder.mutation({
    //   query: (data) => ({
    //     url: `auth/change-password`,
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // forgetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/forgot-password`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // verifyEmail: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/verify-email`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // resetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/reset-password`,
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/auth/login/`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      any,
      { old_password: string; new_password: string }
    >({
      query: (data) => ({
        url: `/api/auth/changepassword/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetPassword: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: `/api/auth/forgetpassword/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyForgetPasswordOtp: builder.mutation<
      any,
      { email: string; otp: string }
    >({
      query: ({ email, otp }) => ({
        url: `/api/auth/vefiry_for_forget/${email}/`,
        method: "POST",
        body: { otp },
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<
      any,
      { new_password: string; token: string }
    >({
      query: ({ new_password, token }) => ({
        url: `/api/auth/reset_password/`,
        method: "POST",
        body: { new_password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  //   useUpdatePasswordMutation,
  //   useResetPasswordMutation,
  //   useVerifyEmailMutation,
  //   useForgetPasswordMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useVerifyForgetPasswordOtpMutation,
  useResetPasswordMutation,
} = authAPI;
