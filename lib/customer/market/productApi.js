import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper'



export const  marketProductApi = createApi({
    reducerPath: 'marketProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/market` , 
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
    tagTypes: ['MarketProduct'],

   
   

    endpoints: (builder) => ({
      //profile/profile


      getProduct: builder.mutation({
        query: (slug) => {

            return {
                url: `product/${slug}`,

            }
        },
        providesTags: ['MarketProduct'],
 

    }),

    addComment: builder.mutation({
        query: ({formData , slug}) => {
            return {
                url: `add-comment/product/${slug}`,
                method: 'POST',

                body: formData,
                FormData: true,
                credentials: 'include',
            }
        },
        invalidatesTags: ['MarketProduct'],

    }),

    
    addToFavorite: builder.mutation({
        query: (slug) => {
            return {
                url: `add-to-favorite/product/${slug}`,
            }
        },
        invalidatesTags: ['MarketProduct'],

    }),
 


    })
});
export const { 
        useGetProductMutation,
        useAddCommentMutation,
        useAddToFavoriteMutation,

    } = marketProductApi;


        
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