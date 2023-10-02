import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { react,useEffect,useState } from "react";
import { useDispatch } from "react-redux";
// Define a service using a base URL and expected endpoints
export const signinupQuery = createApi({
  reducerPath: "signinupQuery",
  tagTypes: ['user'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  prepareHeaders: (headers) => {

      const userinfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userinfo?.token;
      //console.log(token);
      headers.set("authorization",token);
      return headers;
    },

  }),
  endpoints: (builder) => ({
    // getAllUser: builder.query({
    //     query: () => ({
    //       url : '',
    //       method : "GET"
  
    //     }),
    //     providesTags:['user'],
    //   }),
    getTokenVerification: builder.query({
      query: (token) => ({
        url : 'verifytoken',
        method : "GET",
        //headers: { "authorization": token},

      }),
      
    }),
    getSignup: builder.mutation({
        query: (data) => ({
          headers : {
            'Content-type' : 'application/json',
          },
          url : 'register',
          method : "POST",
          body : data
  
        }),
        
      }),

    getLogin: builder.mutation({
        query: (data) => ({
          headers : {
            'Content-type' : 'application/json',
          },
          url : 'login',
          method : "POST",
          body : data
  
        }),
        //invalidatesTags: ['user'],
      }),

    //   deleteUser: builder.mutation({
    //     query: (id) => ({
    //       url : '',
    //       method : "DELETE"
  
    //     }),
    //    invalidatesTags: ['user'],
    //   }),
    

    
    //   updateUser: builder.mutation({
    //     query: ({id,...patch}) => ({
    //       url : '',
    //       method : "PATCH",
    //       body : patch 
  
    //     }),
    //    invalidatesTags: ['user'],
    //   }),
    
  }),
});
export const { useGetLoginMutation,useGetSignupMutation,useGetTokenVerificationQuery } = signinupQuery;