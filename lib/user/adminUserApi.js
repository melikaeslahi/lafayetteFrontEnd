import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  adminUserApi = createApi({
    reducerPath: 'adminUserApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/user/adminUser` , 
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
    tagTypes: ['Admin'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllAdmin: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Admin'],
    

        }),
        changeAdminStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Admin']
        }),
        changeActivation: builder.mutation({
            query: (id) => `showInMenu/${id}`,

            invalidatesTags: ['Admin']
        }),
        deleteAdmin: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Admin'],

        }),
       
        
        addNewAdmin: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Admin'],

        }),
        addNewRoles: builder.mutation({
            query: ({formData ,  params}) => {
                return {
                    url: `rolesStore/${params}`,
                    method: 'POST',
                    body:  formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Admin'],

        }),

        addNewPermissions: builder.mutation({
            query: ({ formData , params}) => {
                return {
                    url: `permissionsStore/${params}`,
                    method: 'POST',
                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Admin'],

        }),
        updateAdmin: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['Admin'],

        }),
   
        getAdmin: builder.query({
            query: (id) => {

                return {
                    url: `admin/${id}`,

                }
            },
            providesTags: ['Admin'],
          

        }),
      
        getRoles: builder.query({
            query: (params) => {

                return {
                    url: `roles/${params}`,

                }
            },
            providesTags: ['Admin'],
          

        }),
      
        getPermissions: builder.query({
            query: (id) => {

                return {
                    url: `permissions/${id}`,

                }
            },
            providesTags: ['Admin'],
          

        }),

    



    })
});
export const { 
        useGetAllAdminQuery,
        useChangeAdminStatusMutation,
        useDeleteAdminMutation,
        useAddNewAdminMutation,
        useAddNewRolesMutation,
        useAddNewPermissionsMutation,

        useUpdateAdminMutation,
       
        useGetAdminQuery,
        useGetRolesQuery,
        useGetPermissionsQuery,

        useChangeActivationMutation
    } =  adminUserApi;


        
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