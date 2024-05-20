import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  amazingSaleApi = createApi({
    reducerPath: 'amazingSaleApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/discount/amazingSale` ,
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
    tagTypes: ['AmazingSale'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllAmazingSale: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['AmazingSale'],
    

        }),
     
      
        deleteAmazingSale: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['AmazingSale'],

        }),
       
        
        addNewAmazingSale: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['AmazingSale'],

        }),

        updateAmazingSale: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['AmazingSale'],

        }),
        getProducts: builder.query({
            query: () => {

                return {
                    url: `product`,

                }
            },
            providesTags: ['AmazingSale'],
      

        }),
        getAmazingSale: builder.query({
            query: (id) => {

                return {
                    url: `amazingSale/${id}`,

                }
            },
            providesTags: ['AmazingSale'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllAmazingSaleQuery,    
        useDeleteAmazingSaleMutation,
        useAddNewAmazingSaleMutation,
        useUpdateAmazingSaleMutation,
        useGetProductsQuery,
        useGetAmazingSaleQuery,
      
    } =  amazingSaleApi;


        
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