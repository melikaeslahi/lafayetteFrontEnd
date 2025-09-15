import { baseApi } from '../baseApi';

export const  commentApi =  baseApi.injectEndpoints({
 
    endpoints: (builder) => ({
  
        getAllComment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/comment/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Comment'],

        }),
        changeCommentStatus: builder.mutation({
            query: (id) => `/market/comment/status/${id}`,

            invalidatesTags: ['Comment']
        }),
        changeApproved: builder.mutation({
            query: (id) => `/market/comment/approved/${id}`,

            invalidatesTags: ['Comment']
        }),
        
        addNewAnswer: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `/market/comment/answer/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Comment'],
        }),

        getComment: builder.query({
            query: ({id}) => {
                return {
                    url: `/market/comment/comment/${id}`,
                }
            },
            providesTags: ['Comment'],
        }), 
    }),
    overrideExisting: false,
});
export const { 
        useGetAllCommentQuery,
        useChangeCommentStatusMutation,
        useAddNewAnswerMutation,
        useGetCommentQuery,
        useChangeApprovedMutation
    } =  commentApi;