import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




export const productAPI = createApi({
    reducerPath :"productApi",
    baseQuery :fetchBaseQuery({baseUrl :`${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    endpoints :(builder)=>({
     latestProduct : builder.query({query :()=> "latest"})
  })
  })
  

  export const {useLatestProductQuery} = productAPI