import { baseApi } from '../baseApi';

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

     getAllPost: builder.query({
        query: (arg) => {
            const { page = 1, perPage = 0, search } = arg;
            return {
                url: `/content/posts/${perPage}/${search}`,
                params: { page },
            }
        },
        providesTags: ['Post'],
    
    }),
    changePostStatus: builder.mutation({
        query: (id) => `/content/posts/status/${id}`,

        invalidatesTags: ['Post']
    }),

    changePostCommentable: builder.mutation({
        query: (id) => `/content/posts/commentable/${id}`,

        invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation({
        query(id) {
            return {
                url: `/content/posts/delete/${id}`,
                method: 'DELETE',            
            }
        },
        invalidatesTags: ['Post'],
    }),
 
    addNewPost: builder.mutation({
        query: (formData) => {
            return {
                url: `/content/posts/store`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation({
        query: ({ id, formData }) => {

            return {
                url: `/content/posts/update/${id}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Post'],

    }),
    getAllCategory: builder.query({
        query: () => {
            return {
                url: `/content/posts/category`,
            }
        },
        providesTags: ['Post'],
    }),
    getPost: builder.query({
        query: (id) => {
            return {
                url: `/content/posts/post/${id}`,
            }
        },
        providesTags: ['Post'],
     }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllPostQuery,
        useChangePostStatusMutation,
        useChangePostCommentableMutation,
        useDeletePostMutation, 
        useAddNewPostMutation,
        useUpdatePostMutation,
        useGetAllCategoryQuery,
        useGetPostQuery    
    } =  postApi;