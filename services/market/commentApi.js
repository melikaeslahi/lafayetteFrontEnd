import { baseApi } from '../baseApi';

const url = "admin/market/comment"

export const  commentApi =  baseApi.injectEndpoints({
 
    endpoints: (builder) => ({
  
        getAllComment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Comment'],
        }),
        changeCommentStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Comment']
        }),
        changeApproved: builder.mutation({
            query: (id) => `${url}/approved/${id}`,

            invalidatesTags: ['Comment']
        }),
        
        addNewAnswer: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `${url}/answer/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Comment'],
        }),

        getComment: builder.query({
            query: ({id}) => {
                return {
                    url: `${url}/comment/${id}`,
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