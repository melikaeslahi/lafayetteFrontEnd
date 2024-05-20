import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/ticket` ,
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
    tagTypes: ['Ticket'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
    

        }),

        getNewTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/newTickets/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
    

        }),
       
        getOpenTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/openTickets/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
    

        }),
        getCloseTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/closeTickets/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
    

        }),
        addNewAnswer: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `answer/${id}`,
                    method: 'POST',

                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Ticket'],

        }),
        
        change: builder.mutation({
            query: (id) => `change/${id}`,

            invalidatesTags: ['Ticket']
        }),
        
        
         
       
        getTicket: builder.query({
            query: (id) => {

                return {
                    url: `show/${id}`,

                }
            },
            providesTags: ['Ticket'],
          

        }),
          
       
        
      
     


    



    })
});
export const { 
        useGetAllTicketsQuery,
        useGetNewTicketsQuery,
        useAddNewAnswerMutation,
        useGetOpenTicketsQuery,
        useGetCloseTicketsQuery,
        useChangeMutation,
        useGetTicketQuery,

    } =  ticketApi;


        
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