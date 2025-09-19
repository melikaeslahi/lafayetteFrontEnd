import { baseApi } from '../baseApi';

const url = 'admin/content/comment';

export const  commentPostApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllCommentPost: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['CommentPost'],
        }),
        changeCommentPostStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['CommentPost']
        }),
        changeApprovedPost: builder.mutation({
            query: (id) => `${url}/approved/${id}`,

            invalidatesTags: ['CommentPost']
        }),
       
        addNewAnswerPost: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `${url}/answer/${id}`,
                    method: 'POST',
                    body: formData,
                    
                }
            },
            invalidatesTags: ['CommentPost'],

        }),

        getCommentPost: builder.query({
            query: ({id}) => {
                return {
                    url: `${url}/comment/${id}`,
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


