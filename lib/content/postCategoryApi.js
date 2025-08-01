import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  postCategoryApi = createApi({
    reducerPath: 'postCategoryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/content/category`,
        credentials: 'include',
    //     prepareHeaders: (headers, { extra }) => {
    //     headers.set('Accept' , ' appliction/json');
    //      return headers
    //    },
}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['PostCategory'],

    
    credentials: true,

    endpoints: (builder) => ({
        // getCsrf:builder.query({
        //  query:()=> '/sanctum/csrf-cookie'
        // }),
    
        getAllPostCategory: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['PostCategory'],
      

        }),
        changePostCategoryStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['PostCategory']
        }),
        deletePostCategory: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['PostCategory'],

        }),
       
        
        addNewPostCategory: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['PostCategory'],

        }),

        updatePostCategory: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['PostCategory'],

        }),
        getAllParentId: builder.query({
            query: () => {

                return {
                    url: `parentId`,

                }
            },
            providesTags: ['PostCategory'],
       

        }),
        getCategory: builder.query({
            query: (id) => {

                return {
                    url: `category/${id}`,

                }
            },
            providesTags: ['PostCategory'],
         

        }),
      
 

    



    })
});
export const { 
   //postcategory
    useGetCsrfQuery,
    useGetAllPostCategoryQuery,
    useChangePostCategoryStatusMutation,
    useDeletePostCategoryMutation,   
    useAddNewPostCategoryMutation,
    useUpdatePostCategoryMutation,
    useGetAllParentIdQuery,
    useGetCategoryQuery,    
    } =  postCategoryApi;

