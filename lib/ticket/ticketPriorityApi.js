import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  ticketPriorityApi = createApi({
    reducerPath: 'ticketPriorityApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/ticket/priority` ,
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
    tagTypes: ['TicketPriority'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllTicketPriority: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['TicketPriority'],
    

        }),
        changeTicketPriorityStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['TicketPriority']
        }),
    
        deleteTicketPriority: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['TicketPriority'],

        }),
       
        
        addNewTicketPriority: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['TicketPriority'],

        }),

        updateTicketPriority: builder.mutation({
            query: ({ formData , params }) => {

                return {
                    url: `update/${params}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['TicketPriority'],

        }),
     
        getTicketPriority: builder.query({
            query: (id) => {

                return {
                    url: `ticketPriority/${id}`,

                }
            },
            providesTags: ['TicketPriority'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllTicketPriorityQuery,
        useChangeTicketPriorityStatusMutation,
        useDeleteTicketPriorityMutation,
        useAddNewTicketPriorityMutation,
        useUpdateTicketPriorityMutation,
        useGetTicketPriorityQuery,
   
    } =  ticketPriorityApi;


        
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