import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/comment` ,
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
    tagTypes: ['Comment'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllComment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Comment'],
    

        }),
        changeCommentStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Comment']
        }),
        changeApproved: builder.mutation({
            query: (id) => `approved/${id}`,

            invalidatesTags: ['Comment']
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
            invalidatesTags: ['Comment'],

        }),

     
  
        getComment: builder.query({
            query: ({id}) => {

                return {
                    url: `comment/${id}`,

                }
            },
            providesTags: ['Comment'],
          

        }),
      
     


    



    })
});
export const { 
        useGetAllCommentQuery,
        useChangeCommentStatusMutation,
 
        useAddNewAnswerMutation,
       
       
        useGetCommentQuery,
        useChangeApprovedMutation
    } =  commentApi;


        
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