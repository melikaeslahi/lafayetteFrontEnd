import { baseApi } from '../baseApi';

const url = 'admin/content/posts'

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

     getAllPost: builder.query({
        query: (arg) => {
            const { page = 1, perPage = 0, search } = arg;
            return {
                url: `${url}/${perPage}/${search}`,
                params: { page },
            }
        },
        providesTags: ['Post'],
    
    }),
    changePostStatus: builder.mutation({
        query: (id) => `${url}/status/${id}`,

        invalidatesTags: ['Post']
    }),

    changePostCommentable: builder.mutation({
        query: (id) => `${url}/commentable/${id}`,

        invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation({
        query(id) {
            return {
                url: `${url}/delete/${id}`,
                method: 'DELETE',            
            }
        },
        invalidatesTags: ['Post'],
    }),
 
    addNewPost: builder.mutation({
        query: (formData) => {
            return {
                url: `${url}/store`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation({
        query: ({ id, formData }) => {

            return {
                url: `${url}/update/${id}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Post'],

    }),
    getAllCategory: builder.query({
        query: () => {
            return {
                url: `${url}/category`,
            }
        },
        providesTags: ['Post'],
    }),
    getPost: builder.query({
        query: (id) => {
            return {
                url: `${url}/post/${id}`,
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