import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { react, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Define a service using a base URL and expected endpoints
export const userhandlingQuery = createApi({
  reducerPath: "userhandlingQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const userinfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userinfo?.token;
      headers.set("authorization", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "admin/users/get-all-users",
        method: "GET",
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "admin/users/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetAllUsersQuery, useResetPasswordMutation } =
  userhandlingQuery;
