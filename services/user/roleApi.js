import { baseApi } from '../baseApi';

const url = '/admin/user/role';

export const  roleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRole: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Role'],
        }),
          
        deleteRole: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',          
                }
            },
            invalidatesTags: ['Role'],
        }),
       
        addNewRole: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['Role'],
        }),

        updateRole: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Role'],

        }),
       
        getRole: builder.query({
            query: (id) => {
                return {
                    url: `${url}/role/${id}`,
                }
            },
            providesTags: ['Role'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllRoleQuery,
        useDeleteRoleMutation,
        useAddNewRoleMutation,
        useUpdateRoleMutation, 
        useGetRoleQuery,
    } =  roleApi;