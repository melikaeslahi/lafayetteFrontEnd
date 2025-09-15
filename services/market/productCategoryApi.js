import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  productCategoryApi = createApi({
    reducerPath: 'productCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/category` ,
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
    tagTypes: ['ProductCategory'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllProductCategory: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['ProductCategory'],
    

        }),
        changeProductCategoryStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['ProductCategory']
        }),
        changeShowInMenu: builder.mutation({
            query: (id) => `showInMenu/${id}`,

            invalidatesTags: ['ProductCategory']
        }),
        deleteProductCategory: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['ProductCategory'],

        }),
       
        
        addNewProductCategory: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['ProductCategory'],

        }),

        updateProductCategory: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['ProductCategory'],

        }),
        getAllParentId: builder.query({
            query: () => {

                return {
                    url: `parentId`,

                }
            },
            providesTags: ['ProductCategory'],
      

        }),
        getProductCategory: builder.query({
            query: (id) => {

                return {
                    url: `category/${id}`,

                }
            },
            providesTags: ['ProductCategory'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllProductCategoryQuery,
        useChangeProductCategoryStatusMutation,
        useDeleteProductCategoryMutation,
        useAddNewProductCategoryMutation,
        useUpdateProductCategoryMutation,
        useGetAllParentIdQuery,
        useGetProductCategoryQuery,
        useChangeShowInMenuMutation
    } =  productCategoryApi;


        
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