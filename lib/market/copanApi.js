import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const   copanApi = createApi({
    reducerPath: 'copanApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/discount/copan` ,
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
    tagTypes: ['Copan'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllCopan: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Copan'],
    

        }),
         
        deleteCopan: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Copan'],

        }),
       
        
        addNewCopan: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Copan'],

        }),

        updateCopan: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['Copan'],

        }),
        getUsers: builder.query({
            query: () => {

                return {
                    url: `users`,

                }
            },
            providesTags: ['Copan'],
      

        }),
        getCopan: builder.query({
            query: (id) => {

                return {
                    url: `copan/${id}`,

                }
            },
            providesTags: ['Copan'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllCopanQuery,
      
        useDeleteCopanMutation,
        useAddNewCopanMutation,
        useUpdateCopanMutation,
        useGetUsersQuery,
        useGetCopanQuery,
       
    } =  copanApi;


        
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