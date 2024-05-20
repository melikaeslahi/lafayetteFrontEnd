import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  cartApi = createApi({
    reducerPath: 'cartApi',
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
    tagTypes: ['CartItem'],

   
   

    endpoints: (builder) => ({
      //profile/profile

      
   
     getCart: builder.query({
        query: () => {
           
            return {
                url: `cart`,
                
            }
        },
        providesTags: ['CartItem'],
    

    }),
   
    
    
    addToCart: builder.mutation({
        query: ({formData , slug}) => {
            return {
                url: `/add-to-cart/${slug}`,
                method: 'POST',

                body: formData,
                FormData: true,
            
            }
        },
        invalidatesTags: ['CartItem'],

    }),

    updateCart: builder.mutation({
        query: (formData) => {

            return {
                url: `/update-cart`,
                method: 'POST',

                body: formData,


            }
        },
        invalidatesTags: ['CartItem'],

    }),

  
 

     deleteCart: builder.mutation({
        query: ( id ) => {

            return {
                url: `remove-from-cart/${id}`,
                method: 'DELETE',

             


            }
        },
        invalidatesTags: ['CartItem'],

    }),
 
  
 
 


    })
});
export const { 
        useUpdateCartMutation,
        useGetCartQuery,
        useAddToCartMutation,
        useDeleteCartMutation, 
            
       
    } = cartApi;


        
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