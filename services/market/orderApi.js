import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/order` ,
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
    tagTypes: ['Order'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),

        getNewOrders: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/newOrders/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
       
        getSendingOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/sending/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
        getUnpaindOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/unpaind/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
        getCanceledOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/canceled/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
        getReturnOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/returned/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
        changeSendStatus: builder.mutation({
            query: (id) => `changeSendStatus/${id}`,

            invalidatesTags: ['Order']
        }),
        changeOrderStatus: builder.mutation({
            query: (id) => `changeOrderStatus/${id}`,

            invalidatesTags: ['Order']
        }),
       
        cancelOrder: builder.mutation({
            query: (id) => `cancelOrder/${id}`,

            invalidatesTags: ['Order']
        }),
        
         
       
        getDetailOrder: builder.query({
            query: (id) => {

                return {
                    url: `detailOrder/${id}`,

                }
            },
            providesTags: ['Order'],
          

        }),
          
       
        show: builder.query({
            query: (id) => {

                return {
                    url: `show/${id}`,

                }
            },
            providesTags: ['Order'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllOrderQuery,
        useGetNewOrdersQuery,
        useGetSendingOrderQuery,
        useGetUnpaindOrderQuery,
        useGetCanceledOrderQuery,
        useGetReturnOrderQuery,
        useChangeSendStatusMutation,
        useChangeOrderStatusMutation,
        useCancelOrderMutation,
        useGetDetailOrderQuery,
        useShowQuery,

    } =  orderApi;


        
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