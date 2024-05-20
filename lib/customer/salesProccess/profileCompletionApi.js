import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  profileCompletionApi = createApi({
    reducerPath: 'profileCompletionApi',
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
    tagTypes: ['ProfileCompletion'],

   
   

    endpoints: (builder) => ({
      //profile/profile

      
   
     getProfileCompletion: builder.query({
        query: () => {
           
            return {
                url: `/profile-completion`,
           
            }
        },
        providesTags: ['ProfileCompletion'],
    

    }),
   
    
    
 
    updateProfileCompletion: builder.mutation({
        query: (formData) => {

            return {
                url: `profile-completion/update`,
                method: 'POST',

                body: formData,


            }
        },
        invalidatesTags: ['ProfileCompletion'],

    }),

   

    
       

 
  
 
 


    })
});
export const { 
        useUpdateProfileCompletionMutation,
        useGetProfileCompletionQuery,
               
       
    } = profileCompletionApi;


        
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