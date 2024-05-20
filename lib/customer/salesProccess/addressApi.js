import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  addressApi = createApi({
    reducerPath: 'addressApi',
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
    tagTypes: ['Address'],

   
   

    endpoints: (builder) => ({
      //profile/profile

      
   
     getAddressAndDelivery: builder.query({
        query: () => {
           
            return {
                url: `/address-and-delivery`,
           
            }
        },
        providesTags: ['Address'],
    

    }),
   
    
    
    addAddress: builder.mutation({
        query: (payload) => {
            return {
                url: `add-address`,
                method: 'POST',

                body: payload,
                FormData: true,
            
            }
        },
        invalidatesTags: ['Address'],

    }),

    updateAddress: builder.mutation({
        query: ( {formData , id }) => {

            return {
                url: `/update-address/${id}`,
                method: 'POST',

                body: formData,


            }
        },
        invalidatesTags: ['Address'],

    }),

    getCities: builder.mutation({
        query: (id) => `get-cities/${id}`,

        invalidatesTags: ['Address']
    }),

 

     chooseAddressAndDelivery: builder.mutation({
        query: (  formData ) => {

            return {
                url: `/choose-address-and-delivery`,
                method: 'POST',

                body: formData,


            }
        },
        invalidatesTags: ['Address'],

    }),
 
  
 
 


    })
});
export const { 
        useUpdateAddressMutation,
        useGetAddressAndDeliveryQuery,
        useAddAddressMutation,
        useChooseAddressAndDeliveryMutation, 
        useGetCitiesMutation,         
       
    } = addressApi;


        
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