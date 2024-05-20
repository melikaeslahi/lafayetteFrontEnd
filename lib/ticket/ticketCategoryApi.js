import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  ticketCategoryApi = createApi({
    reducerPath: 'ticketCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/ticket/category` ,
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
    tagTypes: ['TicketCategory'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllTicketCategory: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['TicketCategory'],
    

        }),
        changeTicketCategoryStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['TicketCategory']
        }),
       
        deleteTicketCategory: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['TicketCategory'],

        }),
       
        
        addNewTicketCategory: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['TicketCategory'],

        }),

        updateTicketCategory: builder.mutation({
            query: ({ params, formData }) => {

                return {
                    url: `update/${params}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['TicketCategory'],

        }),
      
        getTicketCategory: builder.query({
            query: (id) => {

                return {
                    url: `ticketCategory/${id}`,

                }
            },
            providesTags: ['TicketCategory'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllTicketCategoryQuery,
        useChangeTicketCategoryStatusMutation,
        useDeleteTicketCategoryMutation,
        useAddNewTicketCategoryMutation,
        useUpdateTicketCategoryMutation,
        useGetTicketCategoryQuery,
    } =  ticketCategoryApi;


        
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