import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




export const productAPI = createApi({
    reducerPath :"productApi",
    baseQuery :fetchBaseQuery({baseUrl :`${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    endpoints :(builder)=>({
     latestProduct : builder.query({query :()=> "latest"}),
     allProducts : builder.query({query :(id)=> `admin-products?=${id}`}),
     categories : builder.query({query :()=> `categories`}),
     SearchProducts : builder.query({query :({price,search,sort,category,page})=> {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
     }}),
     newProduct : builder.mutation({query :({formData,id})=> ({
        url:`new?id=${id}`,
        method : "Post",
        'Content-Type': 'application/json',
        body :formData,
     })}),
  })

  })
  

  export const {useLatestProductQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useNewProductMutation} = productAPI



  