import { baseApi } from '../baseApi';


export const  commentPostApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllCommentPost: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/content/comment/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['CommentPost'],
        }),
        changeCommentPostStatus: builder.mutation({
            query: (id) => `/content/comment/status/${id}`,

            invalidatesTags: ['CommentPost']
        }),
        changeApprovedPost: builder.mutation({
            query: (id) => `/content/comment/approved/${id}`,

            invalidatesTags: ['CommentPost']
        }),
       
        addNewAnswerPost: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `/content/comment/answer/${id}`,
                    method: 'POST',
                    body: formData,
                    
                }
            },
            invalidatesTags: ['CommentPost'],

        }),
        getCommentPost: builder.query({
            query: ({id}) => {
                return {
                    url: `/content/comment/comment/${id}`,
                }
            },
            providesTags: ['CommentPost'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllCommentPostQuery,
        useChangeCommentPostStatusMutation,
        useAddNewAnswerPostMutation,
        useGetCommentPostQuery,
        useChangeApprovedPostMutation
    } =  commentPostApi;


