import { baseApi } from "../baseApi";

export const postCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({  
        getAllPostCategory: builder.query({
            query: ({ page = 1, perPage = 10, search  }) => ({
              url: `/content/category/${perPage}/${search}`,
              params: { page },
            }),
            providesTags: ['PostCategory'],
          }),
        changePostCategoryStatus: builder.mutation({
            query: (id) => `content/category/status/${id}`,
            invalidatesTags: ['PostCategory']
        }),
        deletePostCategory: builder.mutation({
            query(id) {
                return {
                    url: `content/category/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['PostCategory'],
        }),
       
        addNewPostCategory: builder.mutation({
            query: (body) => {
                return {
                    url: `content/category/store`,
                    method: 'POST',
                    body,          
                }
            },
            invalidatesTags: ['PostCategory'],
        }),

        updatePostCategory: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `content/category/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['PostCategory'],

        }),
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `content/category/parentId`,
                }
            },
            providesTags: ['PostCategory'],
        }),
        getCategory: builder.query({
            query: (id) => {
                return {
                    url: `content/category/category/${id}`,
                }
            },
            providesTags: ['PostCategory'],
        }),
    }),
     overrideExisting: false,
});

 

export const { 
    useGetAllPostCategoryQuery,
    useChangePostCategoryStatusMutation,
    useDeletePostCategoryMutation,   
    useAddNewPostCategoryMutation,
    useUpdatePostCategoryMutation,
    useGetAllParentIdQuery,
    useGetCategoryQuery,    
    } = postCategoryApi;