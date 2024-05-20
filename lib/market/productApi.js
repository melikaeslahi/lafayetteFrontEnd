import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/product` ,
    prepareHeaders: (headers, { extra }) => {
        headers.set('X-XSRF-TOKEN' , extra.cookie) // cookies is the name of the field added to the extraArgument
     
         return headers
       },
}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Product'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllProduct: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Product'],
    

        }),
        changeProductStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Product']
        }),
        changeMarketable: builder.mutation({
            query: (id) => `marketable/${id}`,

            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Product'],

        }),
       
        
        addNewProduct: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Product'],

        }),

        updateProduct: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['Product'],

        }),
      
        getProduct: builder.query({
            query: (id) => {

                return {
                    url: `product/${id}`,

                }
            },
            providesTags: ['Product'],
          

        }),
      
     
         getCategoriesAndBrands: builder.query({
            query: () => {

                return {
                    url: `categoryAndBrand/`,

                }
            },
            providesTags: ['Product'],
          

        }),

    



    })
});
export const { 
        useGetAllProductQuery,
        useChangeProductStatusMutation,
        useDeleteProductMutation,
        useAddNewProductMutation,
        useUpdateProductMutation,
        useGetCategoriesAndBrandsQuery,
        useGetProductQuery,
        useChangeMarketableMutation
    } =  productApi;


        
// export const {
//     useGetAllPostCategoryQuery,
//     useChangePostCategoryStatusMutation,
//     useDeletePostCategoryMutation,
   
//     useAddNewPostCategoryMutation,
//     useUpdatePostCategoryMutation,
//     useGetAllParentIdQuery,
//     useGetCategoryQuery,
//     util: { getRunningQueriesThunk },
// } = apiSlice;

// export const { getAllPostCategory,changePostCategoryStatus,getCategory ,getAllParentId,updatePostCategory,addNewPostCategory, deletePostCategory } = apiSlice.endpoints;