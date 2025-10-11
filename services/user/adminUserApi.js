import { baseApi } from '../baseApi';

const url = '/admin/user/adminUser'

export const  adminUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmin: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Admin'],
        }),

        changeAdminStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,
            invalidatesTags: ['Admin']
        }),

        changeActivation: builder.mutation({
            query: (id) => `${url}/showInMenu/${id}`,
            invalidatesTags: ['Admin']
        }),

        deleteAdmin: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',            
                }
            },
            invalidatesTags: ['Admin'],
        }),
 
        addNewAdmin: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,       
                }
            },
            invalidatesTags: ['Admin'],
        }),

        addNewRoles: builder.mutation({
            query: ({formData ,  params}) => {
                return {
                    url: `${url}/rolesStore/${params}`,
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
                    url: `${url}/permissionsStore/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Admin'],

        }),
        updateAdmin: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Admin'],
        }),
   
        getAdmin: builder.query({
            query: (id) => {
                return {
                  url: `${url}/admin/${id}`,
                }
            },
            providesTags: ['Admin'],
        }),
      
        getRoles: builder.query({
            query: (params) => {
                return {
                    url: `${url}/roles/${params}`,
                }
            },
            providesTags: ['Admin'],
        }),
      
        getPermissions: builder.query({
            query: (id) => {
                return {
                    url: `${url}/permissions/${id}`,
                }
            },
            providesTags: ['Admin'],
        }),
    }),
    overrideExisting: false,
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