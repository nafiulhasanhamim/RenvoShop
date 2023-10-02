import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { react, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Define a service using a base URL and expected endpoints
export const categorieQuery = createApi({
  reducerPath: "categorieQuery",
  tagTypes: ["user"],
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
    getAllCategories: builder.query({
      query: () => ({
        url: "categorie/get-all-categories",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});
export const { useGetAllCategoriesQuery } = categorieQuery;
