import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({


    newOrder: builder.mutation({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),


    updateOrder: builder.mutation({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`, // Fix: Use destructured object
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),

    // Delete an order (userId and orderId should be destructured)
    deleteOrder: builder.mutation({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`, // Fix: Use destructured object
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),


    myOrders: builder.query({
      query: (id) => `my?id=${id}`,
      providesTags: ["orders"],
    }),


    allOrders: builder.query({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),


    OrderDetails: builder.query({
      query: (id) => id,
      providesTags: ["orders"],
    }),
  }),
});

export const { 
    useNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useMyOrdersQuery,
    useAllOrdersQuery,
    useOrderDetailsQuery
 } = orderAPI;
