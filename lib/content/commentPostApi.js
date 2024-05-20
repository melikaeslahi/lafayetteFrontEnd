import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  commentPostApi = createApi({
    reducerPath: 'commentPostApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/content/comment`,
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
    tagTypes: ['CommentPost'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllCommentPost: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['CommentPost'],
    

        }),
        changeCommentPostStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['CommentPost']
        }),
        changeApprovedPost: builder.mutation({
            query: (id) => `approved/${id}`,

            invalidatesTags: ['CommentPost']
        }),
       
       
        
        addNewAnswerPost: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `answer/${id}`,
                    method: 'POST',

                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['CommentPost'],

        }),

     
  
        getCommentPost: builder.query({
            query: ({id}) => {

                return {
                    url: `comment/${id}`,

                }
            },
            providesTags: ['CommentPost'],
          

        }),


    })
});
export const { 
        useGetAllCommentPostQuery,
        useChangeCommentPostStatusMutation,
 
        useAddNewAnswerPostMutation,
       
       
        useGetCommentPostQuery,
        useChangeApprovedPostMutation
    } =  commentPostApi;


        
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