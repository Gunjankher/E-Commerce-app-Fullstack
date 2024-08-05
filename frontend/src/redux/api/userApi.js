import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export const server = import.meta.env.VITE_SERVER;

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/users/` }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (users) => {
                console.log("Login request payload:", users); // Log the payload
                return {
                    url: "new",
                    method: "POST",
                    mode: 'cors', // Optional, handled automatically by fetch
                    body: users
                };
            }
        })
    })
});

export const getUser = async (id) => {
    try {
        const { data } = await axios.get(`${server}/api/v1/users/${id}`);
        return data;
    } catch (error) {
        console.error("Error while getting user:", error);
        return { error: 'An error occurred while fetching the user data. Please try again later.' };
    }
};

export const { useLoginMutation } = userAPI;
