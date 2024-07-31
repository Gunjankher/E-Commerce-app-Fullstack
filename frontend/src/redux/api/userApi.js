import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'






export const server = import.meta.env.VITE_SERVER



export const userAPI = createApi({
    reducerPath :"userApi",
    baseQuery :fetchBaseQuery({baseUrl :`${server}/api/v1/users/`}),
    endpoints :(builder)=>({
       login : builder.mutation({query :(users)=>({
            url :"new",
            method :"POST",
            body :users
        })})
})
})


export const {useLoginMutation} = userAPI