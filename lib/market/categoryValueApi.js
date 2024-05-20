import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  categoryValueApi = createApi({
    reducerPath: 'categoryValueApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/property/value`,
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
    tagTypes: ['Value'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllValue: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0 , params } = arg;
                return {
                    url: `${perPage}/${params}`,
                    params: { page },
                }
            },
            providesTags: ['Value'],
    

        }),
        
        deleteValue: builder.mutation({
            query( id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Value'],

        }),
       
        
        addNewValue: builder.mutation({
            query: ({ params , formData}) => {
                return {
                    url: `store/${params}`,
                    method: 'POST',

                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Value'],

        }),

        updateValue: builder.mutation({
            query: ({ attribute , id, formData }) => {

                return {
                    url: `update/${attribute}/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['Value'],

        }),
      
  
        getValue: builder.query({
            query: ({id}) => {

                return {
                    url: `value/${id}`,

                }
            },
            providesTags: ['Value'],
          

        }),
      
     
        productsAndAttributes: builder.query({
            query: () => {

                return {
                    url: `productsAndAttributes/`,

                }
            },
            providesTags: ['Value'],
          

        }),
    



    })
});
export const { 
        useGetAllValueQuery,
        useDeleteValueMutation,
        useAddNewValueMutation,
        useUpdateValueMutation,
        useProductsAndAttributesQuery,
        useGetValueQuery,

    } =  categoryValueApi;


        
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