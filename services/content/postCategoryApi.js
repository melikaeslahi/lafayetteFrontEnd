import { baseApi } from "../baseApi";

const url = 'admin/content/category';

export const postCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({  
        getAllPostCategory: builder.query({
            query: ({ page = 1, perPage = 10, search  }) => ({
              url: `${url}/${perPage}/${search}`,
              params: { page },
            }),
            providesTags: ['PostCategory'],
          }),
        changePostCategoryStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,
            invalidatesTags: ['PostCategory']
        }),
        deletePostCategory: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['PostCategory'],
        }),
       
        addNewPostCategory: builder.mutation({
            query: (body) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body,          
                }
            },
            invalidatesTags: ['PostCategory'],
        }),

        updatePostCategory: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['PostCategory'],

        }),
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `${url}/parentId`,
                }
            },
            providesTags: ['PostCategory'],
        }),
        getCategory: builder.query({
            query: (id) => {
                return {
                    url: `${url}/category/${id}`,
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