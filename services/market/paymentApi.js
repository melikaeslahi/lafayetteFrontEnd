import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/payment` ,
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
    tagTypes: ['Payment'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllPayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
    

        }),

        getOfflinePayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/offline/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
    

        }),
       
        getOnlinePayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/online/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
    

        }),
        getCashPayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/cash/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
    

        }),
        canceledPayment: builder.mutation({
            query: (id) => `canceled/${id}`,

            invalidatesTags: ['Payment']
        }),
        returnedPayment: builder.mutation({
            query: (id) => `returned/${id}`,

            invalidatesTags: ['Payment']
        }),
       
      
        
        

        
       
        getPayment: builder.query({
            query: (id) => {

                return {
                    url: `show/${id}`,

                }
            },
            providesTags: ['Payment'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllPaymentQuery,
        useGetOfflinePaymentQuery,
        useGetOnlinePaymentQuery,
        useGetCashPaymentQuery,
        useGetPaymentQuery,
        useReturnedPaymentMutation,
        useCanceledPaymentMutation,

    } =  paymentApi;


        
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