import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/content/menus`,
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
    tagTypes: ['Menu'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
    
        getAllMenus: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Menu'],
      

        }),
        changeMenuStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Menu']
        }),
        deleteMenu: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Menu'],

        }),
       
        
        addNewMenu: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    // credentials: 'include',
                }
            },
            invalidatesTags: ['Menu'],

        }),

        updateMenu: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['Menu'],

        }),
        getAllParentId: builder.query({
            query: () => {

                return {
                    url: `parentId`,

                }
            },
            providesTags: ['Menu'],
       

        }),
        getMenu: builder.query({
            query: (id) => {

                return {
                    url: `menu/${id}`,

                }
            },
            providesTags: ['Menu'],
         

        }),
      
 

    



    })
});
export const { 
   //postcategory
    useGetAllMenusQuery,
      useChangeMenuStatusMutation,
       useDeleteMenuMutation,
       
        useAddNewMenuMutation,
        useUpdateMenuMutation,
        useGetAllParentIdQuery,
        useGetMenuQuery,
 
    
    
    } =  menuApi;


        
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