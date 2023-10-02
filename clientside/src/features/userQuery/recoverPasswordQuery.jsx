import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { react, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Define a service using a base URL and expected endpoints
export const recoverPasswordQuery = createApi({
  reducerPath: "recoverPasswordQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    recoverPasswordEmail: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/send-mail-to-recover-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/verify-OTP",
        method: "POST",
        body: data,
      }),
    }),
    updatedPassword: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/updated-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useRecoverPasswordEmailMutation,
  useVerifyOTPMutation,
  useUpdatedPasswordMutation,
} = recoverPasswordQuery;
