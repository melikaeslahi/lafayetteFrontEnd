import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  brandApi = createApi({
    reducerPath: 'brandApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/brand` , 
    prepareHeaders: (headers, { extra }) => {
        headers.set('X-XSRF-TOKEN' , extra.cookie) // cookies is the name of the field added to the extraArgument
     
         return headers
       }, }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Brand'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllBrand: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                    
                }
            },
            providesTags: ['Brand'],
    

        }),
        changeBrandStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Brand']
        }),
   
        deleteBrand: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Brand'],

        }),
       
        
        addNewBrand: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Brand'],

        }),

        updateBrand: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Brand'],

        }),
 
        getBrand: builder.query({
            query: (id) => {

                return {
                    url: `brand/${id}`,
                }
            },
            providesTags: ['Brand'],
        }),

    })
});
export const { 
        useGetAllBrandQuery,
        useChangeBrandStatusMutation,
        useDeleteBrandMutation,
        useAddNewBrandMutation,
        useUpdateBrandMutation,
        useGetBrandQuery,     
    } =  brandApi;


        
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