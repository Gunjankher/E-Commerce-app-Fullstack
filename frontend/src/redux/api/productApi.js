import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




export const productAPI = createApi({
    reducerPath :"productApi",
    baseQuery :fetchBaseQuery({baseUrl :`${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    tagTypes :["product"],
    endpoints :(builder)=>({
     latestProduct : builder.query({query :()=> "latest",
      providesTags : ["product"]
     }),
     allProducts : builder.query({query :(id)=> `admin-products?=${id}`,
     providesTags : ["product"]}),
     categories : builder.query({query :()=> `categories`,
      providesTags : ["product"]
     }),
     SearchProducts : builder.query({query :({price,search,sort,category,page})=> {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
     },
     providesTags : ["product"]
   }),

   productDetails: builder.query({query :(id)=> id,
      providesTags : ["product"]
     }),

     newProduct : builder.mutation({query :({formData,id})=> ({
        url:`new?id=${id}`,
        method : "Post",
        'Content-Type': 'application/json',
        body :formData,
     }),
   invalidatesTags : ['product']
   }),
  })

  })
  

  export const {useLatestProductQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useProductDetailsQuery} = productAPI



  