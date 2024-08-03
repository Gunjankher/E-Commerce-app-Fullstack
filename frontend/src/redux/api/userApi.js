import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import axios from 'axios'






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


export const getUSer = async(id)=>{
    try {
        const {data} = await axios.get(`${server}/api/v1/users/${id}`)
        return data
    } catch (error) {
        console.error(`error while getting user`, error);
      
    }
}


export const {useLoginMutation} = userAPI