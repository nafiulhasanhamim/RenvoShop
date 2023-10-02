import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { react, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Define a service using a base URL and expected endpoints
export const productsQuery = createApi({
  reducerPath: "productsQuery",
  tagTypes: ["products", "orders"],
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
    getAllProducts: builder.query({
      query: () => ({
        url: "product/get-all-products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    getAllProduct: builder.query({
      query: (params) => ({
        url: "product/get-all-product",
        params,
        method: "GET",
      }),
      transformResponse: (response) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, 1000); // Set the delay in milliseconds (e.g., 2000ms = 2 seconds)
        });
      },
    }),

    //when user place an order this will call
    receivedOrder: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "received-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    soldAllProducts: builder.query({
      query: () => ({
        url: "admin/product/sold-all-products",
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: (params) => ({
        url: "admin/orders/get-all-orders",
        method: "GET",
        params,
      }),
      providesTags: ["products"],
    }),
    changeOrderStatus: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "admin/orders/change-order-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    getAllUserOrders: builder.query({
      query: (params) => ({
        url: "orders/get-all-user-orders",
        params,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useReceivedOrderMutation,
  useSoldAllProductsQuery,
  useGetAllProductQuery,
  useChangeOrderStatusMutation,
  useGetAllOrdersQuery,
  useGetAllUserOrdersQuery,
} = productsQuery;
