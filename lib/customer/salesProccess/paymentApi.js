import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  salesPaymentApi = createApi({
    reducerPath: 'salesPaymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/salesProccess` , 
    prepareHeaders: (headers, { extra }) => {
        headers.set('X-XSRF-TOKEN' , extra.cookie) // cookies is the name of the field added to the extraArgument
     
         return headers
       },
       credentials:  'include',

}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Payment'],

   
   

    endpoints: (builder) => ({
      //profile/profile

      
   
     getPaymentData: builder.query({
        query: () => {
           
            return {
                url: `/payment`,
           
            }
        },
        providesTags: ['Payment'],
    

    }),
   
    
    
     addCopanDiscount: builder.mutation({
        query: (payload) => {
            return {
                url: `copan-discount`,
                method: 'POST',

                body: payload,
                FormData: true,
            
            }
        },
        invalidatesTags: ['Payment'],

    }),

     paymentSubmit: builder.mutation({
        query: (payload) => {
            return {
                url: `payment-submit`,
                method: 'POST',

                body: payload,
                FormData: true,
            
            }
        },
        invalidatesTags: ['Payment'],

    }),



    })
});
export const { 
        
        useGetPaymentDataQuery,
        useAddCopanDiscountMutation,
        usePaymentSubmitMutation,

      
       
    } = salesPaymentApi;


        
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